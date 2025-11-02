# 🎬 Remover TikTok - Descarga Videos sin Marca de Agua

Descarga videos de TikTok sin marca de agua de forma rápida y sencilla. Aplicación web simple con interfaz moderna y modo oscuro.

## ⚖️ Aviso Legal y Derechos de Autor:

**IMPORTANTE**: Esta herramienta está diseñada únicamente para fines educativos y de uso personal.

### 📜 Consideraciones Legales

- ⚠️ **Respeta los derechos de autor**: Todo el contenido de TikTok pertenece a sus creadores originales
- 📝 **Uso personal únicamente**: No redistribuyas, vendas o uses comercialmente el contenido descargado
- 👤 **Crédito a los creadores**: Siempre da crédito al creador original si compartes el contenido
- 🚫 **Prohibido el uso comercial**: No uses videos descargados para fines comerciales sin permiso explícito
- 📋 **Términos de servicio**: Al usar esta herramienta, aceptas respetar los Términos de Servicio de TikTok
- 🔒 **Contenido privado**: No intentes descargar videos privados o protegidos

### ⚠️ Descargo de Responsabilidad

- Este proyecto no está afiliado, asociado, autorizado, respaldado o de ninguna manera oficialmente conectado con TikTok, ByteDance o cualquiera de sus subsidiarias o afiliados
- El autor de este proyecto no se hace responsable del mal uso de esta herramienta
- El usuario es el único responsable del cumplimiento de las leyes de derechos de autor aplicables en su jurisdicción
- Esta herramienta no debe utilizarse para infringir los derechos de propiedad intelectual de terceros

**Al usar esta herramienta, aceptas toda la responsabilidad por tu uso y te comprometes a cumplir con todas las leyes aplicables.**

## ✨ Características

- 📥 Descarga videos de TikTok sin marca de agua
- 🌓 Modo oscuro/claro
- 🚀 Interfaz rápida y responsive
- 💾 Descarga directa al dispositivo
- 🎨 Diseño moderno con Bootstrap 5

## 🛠️ Tecnologías Utilizadas

- **Frontend**: HTML, CSS, JavaScript, Bootstrap 5
- **Backend**: Node.js, Express
- **API Externa**: TikWM API

## 📋 Requisitos Previos

- Node.js (v14 o superior)
- npm o yarn

## 🚀 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/Jaime-D-Z/Remover-Tiktok.git
cd Remover-Tiktok
```

2. Instala las dependencias:
```bash
npm install
```

O instala manualmente:
```bash
npm install express axios cors
```

3. Inicia el servidor:
```bash
node server.js
```

4. Abre tu navegador en:
```
http://localhost:3000
```

## 📁 Estructura del Proyecto

```
📦 tiktok-downloader
├── 📂 node_modules/
├── 📂 public/
│   ├── 📄 index.html
│   └── 🎨 style.css
├── 📄 .gitignore
├── 📄 package-lock.json
├── 📄 package.json
└── 📄 server.js
```

## 🔧 Dependencias

```json
{
  "express": "^4.x.x",
  "axios": "^1.x.x",
  "cors": "^2.x.x"
}
```

## 📖 Uso

1. Copia el enlace de cualquier video de TikTok
2. Pega el enlace en el campo de entrada
3. Haz clic en "Obtener Video"
4. Espera a que se procese el video
5. Haz clic en "Descargar sin marca de agua"

### Ejemplos de enlaces válidos:
- `https://www.tiktok.com/@usuario/video/1234567890`
- `https://vm.tiktok.com/ABC123/`
- `https://www.tiktok.com/t/ABC123/`

## 🔌 API Endpoints

### POST `/api/resolve`
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
  "videoId": "1234567890",
  "status": 200,
  "message": "OK"
}
```

### POST `/api/download`
Obtiene la URL directa de descarga del video.

**Request:**
```json
{
  "videoId": "1234567890"
}
```

**Response:**
```json
{
  "download_url": "https://..."
}
```

### GET `/api/direct-download`
Descarga el video directamente.

**Query params:**
- `url`: URL directa del video obtenida del endpoint anterior

## ⚙️ Configuración

Puedes cambiar el puerto editando la variable `PORT` en `server.js`:

```javascript
const PORT = process.env.PORT || 3000;
```

## 🎨 Personalización

El archivo `style.css` contiene todos los estilos. Puedes personalizarlo según tus necesidades:

- Colores del tema
- Estilos del modo oscuro
- Animaciones y transiciones
- Tamaños y espaciados

## 🐛 Solución de Problemas

### El video no se descarga
- Verifica que el enlace sea válido
- Algunos videos privados no pueden descargarse
- Asegúrate de tener conexión a internet

### Error 404
- El video puede haber sido eliminado
- El enlace puede ser incorrecto
- La API externa puede estar temporalmente no disponible

## 📝 Notas Importantes

- Esta herramienta usa la API de TikWM para obtener los videos
- Respeta los derechos de autor al descargar contenido
- Solo descarga videos para uso personal
- Algunos videos protegidos pueden no estar disponibles

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.

### Limitaciones de Uso

- ✅ **Permitido**: Uso personal, educativo y de investigación
- ✅ **Permitido**: Modificar y adaptar el código
- ❌ **No permitido**: Uso comercial sin autorización
- ❌ **No permitido**: Infringir derechos de autor de terceros
- ❌ **No permitido**: Redistribuir contenido sin permiso de los creadores

## 👨‍💻 Autor

**Jaime-D-Z** - [GitHub Profile](https://github.com/Jaime-D-Z)

Proyecto: [Remover-Tiktok](https://github.com/Jaime-D-Z/Remover-Tiktok)

## 🙏 Agradecimientos

- [TikWM API](https://www.tikwm.com/) por proporcionar el servicio de descarga
- Bootstrap por el framework CSS
- Font Awesome por los iconos

---

⭐ Si te gustó este proyecto, dale una estrella en GitHub!
