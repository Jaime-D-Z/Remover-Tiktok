const express = require("express");
const serverless = require("serverless-http");
const axios = require("axios");
const cors = require("cors"); // Nueva importación

const app = express();
// Configuración de CORS: permite todas las solicitudes para evitar problemas de cross-origin
app.use(cors());
app.use(express.json());

/**
 * Obtiene la URL final después de redirecciones y el HTML de la página.
 * @param {string} url - URL inicial de TikTok.
 * @returns {Promise<{html: string, finalUrl: string}>} - Contenido HTML y URL resuelta.
 */
async function getFinalUrl(url) {
  // Primero, intentamos obtener los headers para seguir las redirecciones
  // Nota: `axios.head` puede fallar si el servidor no lo permite.
  // En entornos Serverless, a menudo es mejor usar `axios.get` con `maxRedirects`
  // para obtener la URL final.
  const resp = await axios.get(url, { maxRedirects: 10, timeout: 10000 });

  // La URL final se encuentra en la propiedad `request.res.responseUrl` en las respuestas de axios.
  // Usamos el estado del request para asegurar que tenemos la URL después de todas las redirecciones.
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
  const patterns = [/\/video\/(\d+)/, /"aweme_id":"?(\d+)"?/];
  for (const r of patterns) {
    const m = finalUrl.match(r) || html.match(r);
    if (m && m[1]) return m[1];
  }
  return null;
}

// Esta es la ruta raíz ("/") de la Express App, que Vercel mapea a /api/resolve
app.post("/", async (req, res) => {
  try {
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

    res.json({ finalUrl, videoId });
  } catch (err) {
    console.error("Error al procesar la solicitud:", err.message);
    // Para depuración, puedes enviar el error completo, pero en producción, mejor usar 500
    res
      .status(500)
      .json({ error: "Error interno del servidor", details: err.message });
  }
});

// Exporta el handler necesario para Vercel
module.exports.handler = serverless(app);
