const axios = require("axios");

/**
 * Handler principal para la función de Netlify.
 * Se usa como proxy para descargar el video y forzar la descarga en el navegador.
 */
exports.handler = async (event) => {
  // CAMBIO CLAVE: Esperamos una solicitud GET, ya que el navegador nos redirige aquí.
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      body: JSON.stringify({
        error: "Método no permitido. Use GET para la descarga.",
      }),
    };
  }

  try {
    // En un GET, los parámetros vienen en queryStringParameters
    const { videoId, url: rawUrl } = event.queryStringParameters;

    if (!videoId && !rawUrl) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Falta videoId o url." }),
      };
    }

    const videoUrl = rawUrl || `https://www.tiktok.com/@user/video/${videoId}`;
    const api = `https://www.tikwm.com/api/?url=${encodeURIComponent(
      videoUrl
    )}`;

    // PASO 1: Obtener la URL de descarga real del servicio de terceros
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

    // PASO 2: Descargar el contenido del video desde el CDN
    const fileResponse = await axios.get(download_url, {
      responseType: "arraybuffer", // Crucial para manejar datos binarios
      timeout: 20000,
    });

    const videoBuffer = Buffer.from(fileResponse.data);
    const base64Video = videoBuffer.toString("base64");
    const filename = `tiktok_video_${videoId || Date.now()}.mp4`;

    // PASO 3: Devolver el contenido binario con encabezados de descarga
    return {
      statusCode: 200,
      headers: {
        // Indica al navegador que fuerce la descarga del archivo
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Type": "video/mp4",
        "Content-Length": videoBuffer.length,
      },
      body: base64Video,
      isBase64Encoded: true, // Indica a Lambda/Netlify que el cuerpo está codificado
    };
  } catch (err) {
    console.error("Error en la función download:", err.message);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "Error al descargar el video.",
        details: err.message,
      }),
    };
  }
};
