# 🗺️ World Cup 2026 Map - Build System

Sistema de build para generar HTML estático con mapa interactivo de Google Maps.

---

## 📋 Opciones de Build

### **1. Build Static (Archivos Separados) - RECOMENDADO**

```bash
npm run build:static
```

**Output:** `dist-static/`

```
dist-static/
├── index.html          ← HTML limpio y legible
└── assets/
    ├── app.js          ← JavaScript + React + Mapa
    └── style.css       ← Tailwind CSS
```

**Ventajas:**
- ✅ HTML súper legible y editable
- ✅ Archivos separados (fácil debug)
- ✅ Se puede modificar el HTML sin recompilar
- ✅ Mejor para desarrollo y mantenimiento

**Usar cuando:**
- Necesitas editar el HTML fácilmente
- Vas a subir a un servidor (Directus, hosting, etc.)
- Quieres debug más fácil

---

### **2. Build Inline (Todo en un archivo)**

```bash
npm run build:inline
```

**Output:** `dist-inline/`

```
dist-inline/
└── index.html          ← TODO inline (CSS + JS + HTML)
```

**Ventajas:**
- ✅ Un solo archivo portable
- ✅ No necesita servidor
- ✅ Funciona con doble click
- ✅ Fácil compartir/copiar

**Usar cuando:**
- Necesitas portabilidad máxima
- Quieres enviarlo por email/chat
- Demo rápida sin servidor

---

### **3. Build HTML (Vite Plugin - Ultra comprimido)**

```bash
npm run build:html
```

**Output:** `dist-html/`

```
dist-html/
└── index.html          ← TODO minificado y ultra comprimido
```

**Ventajas:**
- ✅ Archivo más pequeño posible
- ✅ Código minificado
- ✅ Optimizado para producción

**Usar cuando:**
- Necesitas el archivo más pequeño
- Producción final

---

## 🚀 Modo Desarrollo

```bash
npm run dev
```

- Hot reload automático
- Desarrollas en React normal
- Google Maps API desde `.env`

---

## 📝 Comparación de Tamaños

| Build Type | Archivos | Tamaño Total | Editable | Portable |
|------------|----------|--------------|----------|----------|
| **static** | 3 files  | ~328 KB      | ✅ Sí    | ⚠️ No*   |
| **inline** | 1 file   | ~329 KB      | ⚠️ No    | ✅ Sí    |
| **html**   | 1 file   | ~213 KB      | ❌ No    | ✅ Sí    |

\* Requiere servidor para ejecutar

---

## 🔧 Workflow Recomendado

### **Para Desarrollo:**
```bash
npm run dev                    # Desarrollar
npm run build:static          # Ver resultado
```

### **Para Producción:**
```bash
npm run build:static          # Build con archivos separados
# Subir dist-static/ a servidor/Directus
```

### **Para Demo Rápida:**
```bash
npm run build:inline          # Un solo archivo
# Compartir dist-inline/index.html
```

---

## 🗂️ Estructura Similar a Directus

Los scripts en `scripts/` son similares al sistema de Directus:

```
scripts/
├── build-static.mjs      ← Similar a build-destinos-final.mjs
├── build-inline.mjs      ← Versión inline completa
└── ...
```

Cada script:
- ✅ Usa Vite para compilar
- ✅ Procesa archivos generados
- ✅ Genera HTML limpio y formateado
- ✅ Reporta tamaños de archivos

---

## 📌 Notas Importantes

### **Google Maps API Key**

Los builds incluyen la API key de `VITE_GOOGLE_MAPS_API_KEY` del `.env`.

**Opciones:**

1. **Mantener inline** (menos seguro pero funciona):
   - La key queda en el código
   - Funciona out-of-the-box

2. **Cargar externamente** (más seguro):
   - Editar `index.html` manualmente
   - Agregar: `<script src="https://maps.googleapis.com/maps/api/js?key=TU_KEY"></script>`

---

## 🎨 Personalización

### **Editar HTML (build:static):**

1. Ejecuta: `npm run build:static`
2. Edita: `dist-static/index.html`
3. Los cambios persisten (no necesitas recompilar)

### **Editar Estilos:**

1. Modifica: `src/index.css` o componentes
2. Re-ejecuta: `npm run build:static`

### **Editar Mapa:**

1. Modifica: `src/components/MapContainer.jsx`
2. Re-ejecuta: `npm run build:static`

---

## 🔄 Integración con Directus

Similar al workflow de `/directus`:

```bash
# 1. Generar HTML estático
npm run build:static

# 2. Copiar contenido a Directus
# - Copiar dist-static/index.html al editor
# - Subir assets/ al CDN/carpeta de assets
# - Actualizar rutas en HTML si es necesario
```

---

## 🆘 Troubleshooting

**El mapa no se muestra:**
- Verifica la API key de Google Maps
- Revisa la consola del navegador

**Errores al compilar:**
- Verifica `node_modules`: `npm install`
- Limpia caché: `rm -rf dist-* node_modules/.vite`

**HTML no formateado:**
- Usa `build:static` en lugar de `build:html`
- El plugin singlefile minifica todo

---

**Made with ❤️ for Assist 365**
