# 🎬 TikTok Downloader - Descarga Videos sin Marca de Agua

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-badge-id/deploy-status)](https://app.netlify.com/sites/remove-tiktok/deploys)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red.svg)](https://github.com/Jaime-D-Z)

Descarga videos de TikTok sin marca de agua de forma rápida, fácil y 100% gratuita. Interfaz moderna con modo oscuro y diseño responsive.

## 🚀 Demo en Vivo

**Prueba la aplicación aquí:** [https://remove-tiktok.netlify.app/](https://remove-tiktok.netlify.app/)

---

## ⚖️ Aviso Legal y Derechos de Autor

> **⚠️ IMPORTANTE:** Esta herramienta está diseñada únicamente para fines educativos y de uso personal.

### 📜 Consideraciones Legales

- ⚠️ **Respeta los derechos de autor:** Todo el contenido de TikTok pertenece a sus creadores originales
- 📝 **Uso personal únicamente:** No redistribuyas, vendas o uses comercialmente el contenido descargado
- 👤 **Crédito a los creadores:** Siempre da crédito al creador original si compartes el contenido
- 🚫 **Prohibido el uso comercial:** No uses videos descargados para fines comerciales sin permiso explícito
- 📋 **Términos de servicio:** Al usar esta herramienta, aceptas respetar los [Términos de Servicio de TikTok](https://www.tiktok.com/legal/terms-of-service)
- 🔒 **Contenido privado:** No intentes descargar videos privados o protegidos

### ⚠️ Descargo de Responsabilidad

- Este proyecto **no está afiliado, asociado, autorizado, respaldado** o de ninguna manera oficialmente conectado con TikTok, ByteDance o cualquiera de sus subsidiarias o afiliados
- El autor de este proyecto **no se hace responsable del mal uso** de esta herramienta
- El usuario es el **único responsable** del cumplimiento de las leyes de derechos de autor aplicables en su jurisdicción
- Esta herramienta **no debe utilizarse** para infringir los derechos de propiedad intelectual de terceros

**Al usar esta herramienta, aceptas toda la responsabilidad por tu uso y te comprometes a cumplir con todas las leyes aplicables.**

---

## ✨ Características

- 🚀 **Super Rápido** - Descarga videos en segundos
- 🔒 **100% Seguro** - Sin anuncios molestos ni virus
- 🎥 **Alta Calidad** - Videos HD sin marca de agua
- 🌙 **Dark Mode** - Interfaz moderna con modo oscuro
- 📱 **Responsive** - Funciona perfectamente en móviles, tablets y desktop
- ⚡ **Sin Registro** - No necesitas crear cuenta
- 💾 **Descarga Directa** - El video se guarda automáticamente en tu dispositivo
- 🎨 **Interfaz Moderna** - Diseño atractivo con animaciones suaves

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Bootstrap 5.3.3
- Font Awesome 6.4.0
- Google Fonts (Poppins)

### Backend
- Node.js
- Netlify Functions (Serverless)
- Axios para peticiones HTTP

### APIs y Servicios
- TikWM API - Obtención de videos sin marca de agua
- Netlify - Hosting y funciones serverless

---

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (v14 o superior)
- npm (viene con Node.js) o [yarn](https://yarnpkg.com/)
- Una cuenta en [Netlify](https://www.netlify.com/) (para deployment)

---

## 🚀 Instalación Local

### 1. Clona el repositorio

```bash
git clone https://github.com/Jaime-D-Z/Remover-Tiktok.git
cd Remover-Tiktok
```

### 2. Instala las dependencias

```bash
npm install
```

O si prefieres yarn:

```bash
yarn install
```

Las dependencias principales que se instalarán son:
- `axios` - Para hacer peticiones HTTP
- Netlify CLI (opcional, para desarrollo local)

### 3. Desarrollo Local con Netlify CLI

```bash
# Instala Netlify CLI globalmente (si no lo tienes)
npm install -g netlify-cli

# Inicia el servidor de desarrollo
netlify dev
```

Esto iniciará el servidor en `http://localhost:8888` con las funciones de Netlify funcionando localmente.

---

## 📁 Estructura del Proyecto

```
📦 Remover-Tiktok
├── 📂 .github/
│   └── 📂 workflows/
│       └── 📄 main.yml           # CI/CD con GitHub Actions
├── 📂 api/                        # Netlify Functions (Serverless)
│   ├── 📄 download.js             # Función para descargar videos
│   └── 📄 resolve.js              # Función para resolver URLs de TikTok
├── 📂 public/                     # Archivos estáticos
│   ├── 📄 index.html              # Página principal
│   └── 🎨 style.css               # Estilos CSS (opcional si usas inline)
├── 📄 .gitignore                  # Archivos ignorados por Git
├── 📄 netlify.toml                # Configuración de Netlify
├── 📄 package.json                # Dependencias y scripts
├── 📄 package-lock.json           # Lock de dependencias
└── 📄 README.md                   # Este archivo
```

---

## 📖 Cómo Usar

### Desde la Web

1. **Visita:** [https://remove-tiktok.netlify.app/](https://remove-tiktok.netlify.app/)
2. **Copia** el enlace de cualquier video de TikTok
3. **Pega** el enlace en el campo de entrada
4. **Haz clic** en "Descargar"
5. **Espera** a que se procese el video
6. **¡Listo!** El video se descargará automáticamente

### Ejemplos de Enlaces Válidos

```
✅ https://www.tiktok.com/@usuario/video/1234567890
✅ https://vm.tiktok.com/ABC123/
✅ https://www.tiktok.com/t/ABC123/
✅ https://m.tiktok.com/v/1234567890.html
```

---

## 🔌 API Endpoints (Netlify Functions)

### 1. `POST /.netlify/functions/resolve`

Resuelve el enlace de TikTok y obtiene el ID del video.

**Request:**
```json
{
  "url": "https://www.tiktok.com/@usuario/video/1234567890"
}
```

**Response:**
```json
{
  "finalUrl": "https://www.tiktok.com/@usuario/video/1234567890",
  "videoId": "1234567890"
}
```

### 2. `GET /.netlify/functions/download`

Descarga el video o redirige a la URL directa.

**Query Params:**
- `videoId` - ID del video de TikTok

**Comportamiento:**
- Videos **< 5 MB**: Descarga a través del proxy
- Videos **> 5 MB**: Redirección directa al CDN

---

## ⚙️ Configuración para Netlify

### netlify.toml

```toml
[build]
  command = "npm install"
  functions = "api"
  publish = "public"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Variables de Entorno (Opcional)

Si necesitas configurar variables:

```env
NODE_VERSION=18
```

---

## 🎨 Personalización

### Cambiar Colores

Edita las variables CSS en `index.html` o `style.css`:

```css
:root {
  --primary-color: #fe2c55;      /* Rosa TikTok */
  --secondary-color: #25f4ee;    /* Cyan TikTok */
  --dark-bg: #121212;            /* Fondo oscuro */
}
```

### Modificar Límite de Tamaño

En `api/download.js`, cambia:

```javascript
const MAX_SIZE_MB = 5; // Cambia a 10, 15, etc.
```

---

## 🐛 Solución de Problemas

### ❌ El video no se descarga

- ✅ Verifica que el enlace sea válido
- ✅ Algunos videos privados no pueden descargarse
- ✅ Asegúrate de tener conexión a internet

### ❌ Error 404 - Video no encontrado

- ✅ El video puede haber sido eliminado
- ✅ El enlace puede ser incorrecto
- ✅ La API externa puede estar temporalmente no disponible

### ❌ Error 500 - Error del servidor

- ✅ Revisa los logs en Netlify Dashboard
- ✅ Verifica que las funciones estén correctamente desplegadas
- ✅ Asegúrate de tener las dependencias instaladas

### ❌ Videos muy grandes no descargan

- ✅ Esto es normal, videos > 5 MB se abren en nueva pestaña
- ✅ Netlify Functions tiene límite de 6 MB en respuestas
- ✅ El video se descargará directamente desde el CDN de TikTok

---

## 🚀 Deploy en Netlify

### Opción 1: Deploy con Botón (Más Fácil)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Jaime-D-Z/Remover-Tiktok)

### Opción 2: Deploy Manual

1. **Haz Fork** de este repositorio
2. **Conéctalo** a tu cuenta de Netlify
3. **Configura** el build:
   - Build command: `npm install`
   - Publish directory: `public`
   - Functions directory: `api`
4. **Deploy!**

### Opción 3: Netlify CLI

```bash
# Login en Netlify
netlify login

# Inicializa el proyecto
netlify init

# Deploy
netlify deploy --prod
```

---

## 📝 Notas Importantes

- 📌 Esta herramienta usa la API de **TikWM** para obtener los videos
- 📌 **Respeta los derechos de autor** al descargar contenido
- 📌 Solo descarga videos para **uso personal**
- 📌 Algunos videos protegidos pueden **no estar disponibles**
- 📌 Los enlaces de descarga tienen un **tiempo de expiración** (5-15 min)
- 📌 Videos muy largos pueden tardar más en procesarse

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Aquí te explico cómo:

1. **Haz Fork** del proyecto
2. **Crea una rama** para tu feature:
   ```bash
   git checkout -b feature/NuevaCaracteristica
   ```
3. **Commit** tus cambios:
   ```bash
   git commit -m 'Add: Nueva característica increíble'
   ```
4. **Push** a la rama:
   ```bash
   git push origin feature/NuevaCaracteristica
   ```
5. **Abre un Pull Request**

### 📋 Guidelines para Contribuir

- ✅ Usa nombres descriptivos para commits
- ✅ Comenta tu código cuando sea necesario
- ✅ Asegúrate de que todo funcione antes de hacer PR
- ✅ Actualiza el README si es necesario

---

## 📄 Licencia

Este proyecto está bajo la **Licencia MIT** - consulta el archivo [LICENSE](LICENSE) para más detalles.

### Limitaciones de Uso

| Tipo de Uso | Permitido | Notas |
|-------------|-----------|-------|
| 🎓 Educativo | ✅ Sí | Para aprender y estudiar |
| 👤 Personal | ✅ Sí | Uso privado y personal |
| 🔧 Modificación | ✅ Sí | Puedes adaptar el código |
| 💼 Comercial | ❌ No* | Solo con autorización |
| 📤 Redistribución | ⚠️ Limitado | Con crédito al autor |

*Para uso comercial, contacta al autor.

---

## 👨‍💻 Autor

**Jaime D. Z.**

- 🐙 GitHub: [@Jaime-D-Z](https://github.com/Jaime-D-Z)

---

## 🙏 Agradecimientos

- 🙌 [TikWM API](https://tikwm.com/) - Por proporcionar el servicio de descarga
- 🎨 [Bootstrap](https://getbootstrap.com/) - Framework CSS
- 🎯 [Font Awesome](https://fontawesome.com/) - Iconos increíbles
- 🚀 [Netlify](https://www.netlify.com/) - Hosting y funciones serverless
- 💙 A todos los **contribuidores** y usuarios que apoyan este proyecto

---

## ⭐ Apoya el Proyecto

Si te gustó este proyecto y te fue útil:

1. ⭐ **Dale una estrella** en GitHub
2. 🔄 **Comparte** con tus amigos
3. 🐛 **Reporta bugs** si encuentras alguno
4. 💡 **Sugiere mejoras** en Issues
5. 🤝 **Contribuye** con código

---

## 📊 Estadísticas del Proyecto

![GitHub stars](https://img.shields.io/github/stars/Jaime-D-Z/Remover-Tiktok?style=social)
![GitHub forks](https://img.shields.io/github/forks/Jaime-D-Z/Remover-Tiktok?style=social)
![GitHub issues](https://img.shields.io/github/issues/Jaime-D-Z/Remover-Tiktok)
![GitHub pull requests](https://img.shields.io/github/issues-pr/Jaime-D-Z/Remover-Tiktok)

---

## 🔮 Roadmap

- [ ] Agregar soporte para descargar múltiples videos
- [ ] Implementar historial de descargas
- [ ] Agregar opción de calidad de video
- [ ] Soporte para descargar solo audio
- [ ] Preview del video antes de descargar
- [ ] Estadísticas de uso
- [ ] API pública para desarrolladores

---

## 📞 Contacto y Soporte

¿Tienes preguntas o necesitas ayuda?

- 💬 **Issues:** [GitHub Issues](https://github.com/Jaime-D-Z/Remover-Tiktok/issues)

---

<div align="center">

**Hecho con ❤️ por [Jaime-D-Z](https://github.com/Jaime-D-Z)**

Si este proyecto te ayudó, ¡considera darle una ⭐!

[🌐 Demo](https://remove-tiktok.netlify.app/) • [📝 Docs](https://github.com/Jaime-D-Z/Remover-Tiktok/wiki) • [🐛 Report Bug](https://github.com/Jaime-D-Z/Remover-Tiktok/issues) • [✨ Request Feature](https://github.com/Jaime-D-Z/Remover-Tiktok/issues)

</div>
