const express = require('express');
const { bundle } = require('@remotion/bundler');
const { renderMedia, selectComposition } = require('@remotion/renderer');
const path = require('path');
const os = require('os');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

// Percorso della configurazione webpack nel progetto
const webpackOverride = (config) => {
  return config;
};

// Compiliamo il progetto una volta all'avvio
let bundledUrl = null;
bundle({
  entryPoint: path.resolve('./src/index.js'),
  webpackOverride,
}).then((url) => {
  bundledUrl = url;
  console.log('Progetto compilato (bundled) con successo su:', bundledUrl);
}).catch((err) => {
  console.error('Compilazione del progetto fallita:', err);
});

app.post('/render', async (req, res) => {
  try {
    const props = req.body; // Ci aspettiamo props JSON
    const compositionId = 'DynamicComposition'; // Puntiamo alla nostra composizione dinamica

    if (!props.scenes || !Array.isArray(props.scenes)) {
        return res.status(400).json({ error: "Proprietà non valide. L'array 'scenes' è richiesto." });
    }

    if (!bundledUrl) {
      return res.status(503).json({ error: "Il server si sta ancora avviando e sta compilando il progetto. Riprova tra qualche secondo." });
    }

    // Calcoliamo la durata totale in base alle scene
    const fps = 30;
    const totalDurationInSeconds = props.scenes.reduce((acc, scene) => acc + (scene.durationInSeconds || 0), 0);
    const durationInFrames = Math.round(totalDurationInSeconds * fps);

    if (durationInFrames <= 0) {
        return res.status(400).json({ error: "La durata totale deve essere maggiore di 0." });
    }

    console.log(`Inizio processo di render per la composizione: ${compositionId}`);

    // 2. Selezioniamo la composizione (estraiamo i metadati)
    const composition = await selectComposition({
      serveUrl: bundledUrl,
      id: compositionId,
      inputProps: props,
    });

    // Possiamo sovrascrivere la durata qui in base alle props dinamiche
    composition.durationInFrames = durationInFrames;

    // 3. Render in un file temporaneo
    const outputLocation = path.join(os.tmpdir(), `render-${Date.now()}.mp4`);

    console.log(`Sto renderizzando su ${outputLocation} con ${durationInFrames} frames...`);

    await renderMedia({
      composition,
      serveUrl: bundledUrl,
      codec: 'h264',
      outputLocation,
      inputProps: props,
      chromiumOptions: {
        // Essenziale per farlo funzionare dentro Docker/Cloud Run
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      }
    });

    console.log(`Render completato! Invio file in corso...`);

    // 4. Inviamo il file di ritorno al client
    res.download(outputLocation, 'video.mp4', (err) => {
      if (err) {
        console.error("Errore nell'invio del file:", err);
      }
      // Puliamo il file temporaneo
      fs.unlink(outputLocation, (unlinkErr) => {
        if (unlinkErr) console.error("Errore nella rimozione del file temporaneo:", unlinkErr);
      });
    });

  } catch (error) {
    console.error("Render fallito:", error);
    res.status(500).json({ error: "Render del video fallito", details: error.message });
  }
});

app.get('/health', (req, res) => {
    res.status(200).send("OK");
});

app.listen(port, () => {
  console.log(`Servizio di render Remotion in ascolto sulla porta ${port}`);
});
