const express = require("express");
const serverless = require("serverless-http");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/", async (req, res) => {
  try {
    const { videoId, url } = req.body;
    if (!videoId && !url) return res.status(400).json({ error: "Falta videoId o url" });

    const videoUrl = url || `https://www.tiktok.com/@user/video/${videoId}`;
    const api = `https://www.tikwm.com/api/?url=${encodeURIComponent(videoUrl)}`;

    const r = await axios.get(api, { headers: { "User-Agent": "Mozilla/5.0" }, timeout: 10000 });
    const download_url = r.data?.data?.play || r.data?.data?.play_addr || r.data?.data?.wmplay;

    if (!download_url) return res.status(404).json({ error: "No se encontró la URL del video." });

    res.json({ download_url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;
module.exports.handler = serverless(app);
