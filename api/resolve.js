const axios = require("axios");

/**
 * Obtiene la URL final después de redirecciones y el HTML de la página.
 * @param {string} url - URL inicial de TikTok.
 * @returns {Promise<{html: string, finalUrl: string}>} - Contenido HTML y URL resuelta.
 */
async function getFinalUrl(url) {
  // Usamos axios.get para manejar redirecciones y obtener el HTML
  const resp = await axios.get(url, { maxRedirects: 10, timeout: 10000 }); // La URL final está en la propiedad request.res.responseUrl después de todas las redirecciones.

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
 * Handler principal para la función de Netlify.
 * Netlify mapea api/resolve.js a la ruta /.netlify/functions/resolve
 */
exports.handler = async (event) => {
  // 1. Verificar que la solicitud sea POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Método no permitido. Use POST." }),
    };
  }

  try {
    // El cuerpo de la solicitud se recibe como una cadena JSON en Netlify/Lambda.
    const { url } = JSON.parse(event.body);

    if (!url) {
      console.error("Falta el campo url en el cuerpo de la solicitud.");
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Falta el campo url" }),
      };
    }

    const { html, finalUrl } = await getFinalUrl(url);
    const videoId = extractVideoId(finalUrl, html);

    if (!videoId) {
      console.error(`No se pudo extraer videoId de: ${finalUrl}`);
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "No se pudo obtener el videoId" }),
      };
    } // Envía la respuesta en formato JSON

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ finalUrl, videoId }),
    };
  } catch (err) {
    console.error("Error al procesar la solicitud:", err.message);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "Error interno del servidor",
        details: err.message,
      }),
    };
  }
};
