const express = require("express");
const serverless = require("serverless-http");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "*" })); // Permite cualquier dominio
app.use(express.json());

/** -----------------------
 * FUNCIONES AUXILIARES
 * ----------------------- */
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
  const patternsUrl = [/\/video\/(\d+)/, /\/v\/(\d+)/, /\/t\/(\d+)/, /\/item\/(\d+)/, /\/(\d{8,})(?:\?|$)/];
  for (const r of patternsUrl) {
    const m = finalUrl.match(r);
    if (m && m[1]) return m[1];
  }

  if (html) {
    const patternsHtml = [/"aweme_id":"?(\d+)"?/, /"awemeId":\s*"?(\d+)"?/, /"video":{"id":"?(\d+)"?/, /"itemId":"?(\d+)"?/, /"id":"(\d{9,})"/];
    for (const r of patternsHtml) {
      const m = html.match(r);
      if (m && m[1]) return m[1];
    }
  }

  return null;
}

/** -----------------------
 * ENDPOINTS
 * ----------------------- */
app.post("/api/resolve", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "Falta el campo url" });

    const { html, finalUrl } = await getFinalUrl(url);
    const videoId = extractVideoId(finalUrl, html);

    if (!videoId) return res.status(404).json({ error: "No se pudo obtener el videoId" });

    res.json({ finalUrl, videoId, message: "OK" });
  } catch (err) {
    console.error("resolve error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/download", async (req, res) => {
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

    if (!download_url) return res.status(404).json({ error: "No se encontró la URL del video." });

    res.json({ download_url });
  } catch (err) {
    console.error("download error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports.handler = serverless(app);
