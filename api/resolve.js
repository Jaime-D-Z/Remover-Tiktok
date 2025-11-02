const axios = require("axios");

/**
 * Obtiene la URL final después de redirecciones y el HTML de la página.
 * @param {string} url - URL inicial de TikTok.
 * @returns {Promise<{html: string, finalUrl: string}>} - Contenido HTML y URL resuelta.
 */
async function getFinalUrl(url) {
  // Usamos axios.get para manejar redirecciones y obtener el HTML
  const resp = await axios.get(url, { maxRedirects: 10, timeout: 10000 });

  // La URL final está en la propiedad request.res.responseUrl después de todas las redirecciones.
  const final = resp.request?.res?.responseUrl || url;

  return { html: resp.data, finalUrl: final };
}

/**
 * Extrae el ID del video de la URL final o del HTML.
 * @param {string} finalUrl - La URL después de las redirecciones.
 * @param {string} html - El contenido HTML de la página.
 * @returns {string | null} - El ID del video si se encuentra.
 */
function extractVideoId(finalUrl, html) {
  // Patrones para encontrar el ID del video
  const patterns = [/\/video\/(\d+)/, /"aweme_id":"?(\d+)"?/];
  for (const r of patterns) {
    const m = finalUrl.match(r) || html.match(r);
    if (m && m[1]) return m[1];
  }
  return null;
}

/**
 * Handler principal para la función Serverless de Vercel.
 * Vercel mapea api/resolve.js a la ruta /api/resolve
 */
module.exports = async (req, res) => {
  // 1. Verificar que la solicitud sea POST
  if (req.method !== "POST") {
    res.status(405).json({ error: "Método no permitido. Use POST." });
    return;
  }

  try {
    // El cuerpo de la solicitud (req.body) se parsea automáticamente en Vercel.
    const { url } = req.body;

    if (!url) {
      console.error("Falta el campo url en el cuerpo de la solicitud.");
      return res.status(400).json({ error: "Falta el campo url" });
    }

    const { html, finalUrl } = await getFinalUrl(url);
    const videoId = extractVideoId(finalUrl, html);

    if (!videoId) {
      console.error(`No se pudo extraer videoId de: ${finalUrl}`);
      return res.status(404).json({ error: "No se pudo obtener el videoId" });
    }

    // Configura el Content-Type explícitamente y envía la respuesta
    res.setHeader("Content-Type", "application/json");
    res.status(200).json({ finalUrl, videoId });
  } catch (err) {
    console.error("Error al procesar la solicitud:", err.message);
    res.setHeader("Content-Type", "application/json");
    res
      .status(500)
      .json({ error: "Error interno del servidor", details: err.message });
  }
};
