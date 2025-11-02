const express = require("express");
const serverless = require("serverless-http");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "Falta el campo url" });

    // Lógica de getFinalUrl y extractVideoId
    const { html, finalUrl } = await getFinalUrl(url);
    const videoId = extractVideoId(finalUrl, html);

    if (!videoId) {
      return res.status(404).json({
        error: "No se pudo obtener el videoId",
        finalUrl,
      });
    }

    res.json({ finalUrl, videoId, message: "OK" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports.handler = serverless(app);
