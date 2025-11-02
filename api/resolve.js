const express = require("express");
const serverless = require("serverless-http");
const axios = require("axios");

const app = express();
app.use(express.json());

async function getFinalUrl(url) {
  try {
    const head = await axios.head(url, {
      maxRedirects: 10,
      timeout: 10000,
      validateStatus: () => true,
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    const redirected = head.request?.res?.responseUrl;
    const resp = await axios.get(redirected || url, {
      headers: { "User-Agent": "Mozilla/5.0" },
      timeout: 10000,
    });
    return { html: resp.data, finalUrl: redirected || url, status: resp.status };
  } catch (err) {
    throw new Error("Error al seguir redirecciones: " + err.message);
  }
}

function extractVideoId(finalUrl, html) {
  const patternsUrl = [/\/video\/(\d+)/, /\/v\/(\d+)/];
  for (const r of patternsUrl) {
    const m = finalUrl.match(r);
    if (m && m[1]) return m[1];
  }
  if (html) {
    const patternsHtml = [/"aweme_id":"?(\d+)"?/];
    for (const r of patternsHtml) {
      const m = html.match(r);
      if (m && m[1]) return m[1];
    }
  }
  return null;
}

app.post("/", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "Falta el campo url" });

    const { html, finalUrl } = await getFinalUrl(url);
    const videoId = extractVideoId(finalUrl, html);

    if (!videoId) {
      return res.status(404).json({
        error: "No se pudo obtener el videoId",
        finalUrl,
        note: "Puede ser un enlace privado o protegido.",
      });
    }

    res.json({ finalUrl, videoId, message: "OK" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;
module.exports.handler = serverless(app);
