const express = require("express");
const serverless = require("serverless-http");
const axios = require("axios");

const app = express();
app.use(express.json());

// Endpoint /api/download
app.post("/", async (req, res) => {
  try {
    const { videoId, url } = req.body;
    if (!videoId && !url) return res.status(400).json({ error: "Falta videoId o url" });

    const videoUrl = url ? url : `https://www.tiktok.com/@user/video/${videoId}`;
    const api = `https://www.tikwm.com/api/?url=${encodeURIComponent(videoUrl)}`;

    const r = await axios.get(api, {
      headers: { "User-Agent": "Mozilla/5.0" },
      timeout: 10000,
    });

    const data = r.data;
    const download_url = data?.data?.play || data?.data?.play_addr || data?.data?.wmplay;

    if (!download_url) {
      return res.status(404).json({ error: "No se encontró la URL del video.", raw: data });
    }

    res.json({ download_url });
  } catch (err) {
    console.error("download error:", err.message);
    res.status(500).json({ error: "Error al obtener la URL de descarga: " + err.message });
  }
});

module.exports = app;
module.exports.handler = serverless(app);
