const express = require("express");
const serverless = require("serverless-http");
const axios = require("axios");

const app = express();
app.use(express.json());

async function getFinalUrl(url) {
  try {
    const head = await axios.head(url, { maxRedirects: 10, timeout: 10000 });
    const final = head.request?.res?.responseUrl || url;
    const resp = await axios.get(final, { timeout: 10000 });
    return { html: resp.data, finalUrl: final, status: resp.status };
  } catch (err) {
    throw new Error("Error al seguir redirecciones: " + err.message);
  }
}

function extractVideoId(finalUrl, html) {
  const patterns = [/\/video\/(\d+)/, /"aweme_id":"?(\d+)"?/];
  for (const r of patterns) {
    const m = finalUrl.match(r) || html.match(r);
    if (m && m[1]) return m[1];
  }
  return null;
}

app.post("/", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "Falta el campo url" });

    const { html, finalUrl } = await getFinalUrl(url);
    const videoId = extractVideoId(finalUrl, html);

    if (!videoId) return res.status(404).json({ error: "No se pudo obtener el videoId" });

    res.json({ finalUrl, videoId, message: "OK" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;
module.exports.handler = serverless(app);
