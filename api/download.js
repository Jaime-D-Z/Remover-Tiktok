const axios = require("axios");

/**
 * Handler principal para la función de Netlify.
 * Intenta descargar el video a través del proxy si es pequeño,
 * o redirige directamente si es muy grande.
 */
exports.handler = async (event) => {
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      body: JSON.stringify({
        error: "Método no permitido. Use GET para la descarga.",
      }),
    };
  }

  try {
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

    // PASO 2: Verificar el tamaño del video con HEAD request
    const headResponse = await axios
      .head(download_url, {
        timeout: 5000,
      })
      .catch(() => null);

    const contentLength = headResponse?.headers?.["content-length"];
    const fileSizeMB = contentLength
      ? parseInt(contentLength) / (1024 * 1024)
      : 0;

    console.log(`Tamaño del video: ${fileSizeMB.toFixed(2)} MB`);

    // PASO 3: Decidir entre proxy o redirección
    const MAX_SIZE_MB = 5; // Límite de 5 MB para usar el proxy

    if (fileSizeMB > MAX_SIZE_MB || !contentLength) {
      // Video grande o tamaño desconocido: REDIRIGIR directamente
      console.log("Video muy grande, redirigiendo directamente...");
      return {
        statusCode: 302,
        headers: {
          Location: download_url,
          "Cache-Control": "no-cache",
        },
        body: "",
      };
    }

    // PASO 4: Video pequeño: descargar a través del proxy
    console.log("Video pequeño, descargando a través del proxy...");
    const fileResponse = await axios.get(download_url, {
      responseType: "arraybuffer",
      timeout: 15000, // 15 segundos para videos pequeños
    });

    const videoBuffer = Buffer.from(fileResponse.data);
    const base64Video = videoBuffer.toString("base64");
    const filename = `tiktok_video_${videoId || Date.now()}.mp4`;

    return {
      statusCode: 200,
      headers: {
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Type": "video/mp4",
        "Content-Length": videoBuffer.length,
      },
      body: base64Video,
      isBase64Encoded: true,
    };
  } catch (err) {
    console.error("Error en la función download:", err.message);

    // Si falla el proxy, intentar redirigir como fallback
    if (err.config?.url) {
      console.log("Error en proxy, intentando redirección de emergencia...");
      return {
        statusCode: 302,
        headers: {
          Location: err.config.url,
          "Cache-Control": "no-cache",
        },
        body: "",
      };
    }

    return {
      statusCode: 500,
      headers: { "Content-Type": "text/html; charset=utf-8" },
      body: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Error de Descarga</title>
          <style>
            body {
              font-family: 'Poppins', Arial, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            }
            .error-box {
              background: white;
              padding: 2.5rem;
              border-radius: 12px;
              box-shadow: 0 10px 40px rgba(0,0,0,0.2);
              text-align: center;
              max-width: 500px;
            }
            h1 { color: #dc3545; margin-bottom: 1rem; }
            p { color: #6c757d; line-height: 1.6; }
            button {
              margin-top: 1.5rem;
              padding: 0.75rem 2rem;
              background: #dc3545;
              color: white;
              border: none;
              border-radius: 8px;
              cursor: pointer;
              font-size: 1rem;
              font-weight: 600;
              transition: background 0.2s;
            }
            button:hover { background: #c82333; }
          </style>
        </head>
        <body>
          <div class="error-box">
            <h1>❌ Error al Descargar</h1>
            <p><strong>Detalle del error:</strong></p>
            <p>${err.message}</p>
            <p>Por favor, intenta nuevamente. Si el problema persiste, el video podría ser demasiado grande o estar temporalmente no disponible.</p>
            <button onclick="window.close()">Cerrar Pestaña</button>
          </div>
        </body>
        </html>
      `,
    };
  }
};
