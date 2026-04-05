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

// Path to the webpack config in the project
const webpackOverride = (config) => {
  return config;
};

// Bundle the project once on startup
let bundledUrl = null;
bundle({
  entryPoint: path.resolve('./src/index.js'),
  webpackOverride,
}).then((url) => {
  bundledUrl = url;
  console.log('Project bundled successfully at:', bundledUrl);
}).catch((err) => {
  console.error('Failed to bundle project:', err);
});

app.post('/render', async (req, res) => {
  try {
    const props = req.body; // Expects JSON props
    const compositionId = 'DynamicComposition'; // Target our dynamic composition

    if (!props.scenes || !Array.isArray(props.scenes)) {
        return res.status(400).json({ error: "Invalid props. 'scenes' array is required." });
    }

    if (!bundledUrl) {
      return res.status(503).json({ error: "Server is still starting up and bundling the project. Please try again in a few seconds." });
    }

    // Calculate total duration based on scenes
    const fps = 30;
    const totalDurationInSeconds = props.scenes.reduce((acc, scene) => acc + (scene.durationInSeconds || 0), 0);
    const durationInFrames = Math.round(totalDurationInSeconds * fps);

    if (durationInFrames <= 0) {
        return res.status(400).json({ error: "Total duration must be greater than 0." });
    }

    console.log(`Starting render process for composition: ${compositionId}`);

    // 2. Select the composition (extract metadata)
    const composition = await selectComposition({
      serveUrl: bundledUrl,
      id: compositionId,
      inputProps: props,
    });

    // We can override duration here based on the dynamic props
    composition.durationInFrames = durationInFrames;

    // 3. Render to a temporary file
    const outputLocation = path.join(os.tmpdir(), `render-${Date.now()}.mp4`);

    console.log(`Rendering to ${outputLocation} with ${durationInFrames} frames...`);

    await renderMedia({
      composition,
      serveUrl: bundledUrl,
      codec: 'h264',
      outputLocation,
      inputProps: props,
      chromiumOptions: {
        // Essential for running in Docker/Cloud Run
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      }
    });

    console.log(`Render complete! Sending file...`);

    // 4. Send the file back to the client
    res.download(outputLocation, 'video.mp4', (err) => {
      if (err) {
        console.error("Error sending file:", err);
      }
      // Clean up the temp file
      fs.unlink(outputLocation, (unlinkErr) => {
        if (unlinkErr) console.error("Error deleting temp file:", unlinkErr);
      });
    });

  } catch (error) {
    console.error("Render failed:", error);
    res.status(500).json({ error: "Video rendering failed", details: error.message });
  }
});

app.get('/health', (req, res) => {
    res.status(200).send("OK");
});

app.listen(port, () => {
  console.log(`Remotion render service listening on port ${port}`);
});
