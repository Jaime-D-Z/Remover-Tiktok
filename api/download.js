const axios = require("axios");

/**
 * Handler principal para la función de Netlify.
 * Netlify mapea api/download.js a la ruta /.netlify/functions/download
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
    const { videoId, url } = JSON.parse(event.body);

    if (!videoId && !url) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Falta videoId o url" }),
      };
    }

    const videoUrl = url || `https://www.tiktok.com/@user/video/${videoId}`;
    const api = `https://www.tikwm.com/api/?url=${encodeURIComponent(
      videoUrl
    )}`;

    const r = await axios.get(api, {
      headers: { "User-Agent": "Mozilla/5.0" },
      timeout: 10000,
    });
    const download_url =
      r.data?.data?.play || r.data?.data?.play_addr || r.data?.data?.wmplay;

    if (!download_url) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "No se encontró la URL del video." }),
      };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ download_url }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
