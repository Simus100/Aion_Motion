const fs = require('fs');
const https = require('https');

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (response) => {
      // Follow redirects
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
         return download(response.headers.location, dest).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
};

(async () => {
  await download("https://cdn.freesound.org/previews/204/204092_3244838-lq.mp3", "public/scene1.mp3");
  await download("https://cdn.freesound.org/previews/369/369252_6687200-lq.mp3", "public/scene2.mp3");
  await download("https://cdn.freesound.org/previews/155/155235_100155-lq.mp3", "public/explosion.mp3");
  await download("https://cdn.freesound.org/previews/450/450893_9159316-lq.mp3", "public/scene3.mp3");
  console.log("Downloaded audio files");
})();
