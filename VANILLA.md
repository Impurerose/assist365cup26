# 🗺️ World Cup 2026 Map - Vanilla Build

**HTML puro + CSS + JavaScript (sin React)**

---

## 📦 Estructura de Archivos

```
dist-vanilla/
├── index.html          ← HTML completo (no <div id="root">)
└── assets/
    ├── styles.css      ← Tailwind CSS compilado
    ├── data.js         ← Datos (venues, teams, config)
    └── app.js          ← Lógica de la aplicación
```

**Total: ~28 KB** (sin React, mucho más ligero)

---

## ✨ Características

### **1. HTML Completo y Legible**
```html
<body class="bg-gray-100">
  <!-- Header -->
  <header class="bg-white shadow-sm">
    <h1>World Cup 2026 - Interactive Map</h1>
  </header>

  <!-- Controls -->
  <div class="mb-6 flex gap-4">
    <select id="team-select">...</select>
    <select id="city-select">...</select>
  </div>

  <!-- Map -->
  <div id="map" style="height: 640px;"></div>
</body>
```

- ✅ No `<div id="root">`
- ✅ HTML semántico completo
- ✅ Clases Tailwind aplicadas
- ✅ 100% editable

### **2. JavaScript Vanilla (sin React)**
```javascript
// Google Maps API directa
map = new google.maps.Map(element, {
  center: { lat: 37.09, lng: -95.71 },
  zoom: 4,
  styles: MAP_STYLES
});

// Marcadores
VENUES.forEach(venue => {
  const marker = new google.maps.Marker({
    position: { lat: venue.lat, lng: venue.lng },
    map: map
  });
});
```

- ✅ Sin dependencias de React
- ✅ Google Maps API nativa
- ✅ Código simple y directo
- ✅ Fácil de modificar

### **3. Datos Separados**
```javascript
// data.js - Fácil de editar
const VENUES = [
  { id: 1, name: 'Miami', lat: 25.76, lng: -80.19, ... },
  { id: 2, name: 'New York', lat: 40.71, lng: -74.00, ... }
];

const TEAMS = [
  { id: 1, name: 'Argentina', flag: '🇦🇷', group: 'A' }
];
```

- ✅ Datos en archivo separado
- ✅ Formato simple (JS object)
- ✅ Fácil actualizar venues/teams

---

## 🚀 Cómo Usar

### **1. Generar Build**
```bash
npm run build:vanilla
```

### **2. Configurar Google Maps API**
Edita `dist-vanilla/index.html` línea ~88:
```html
<!-- Reemplaza YOUR_API_KEY_HERE con tu API key -->
<script src="https://maps.googleapis.com/maps/api/js?key=TU_API_KEY"></script>
```

### **3. Servir Archivos**
Necesitas un servidor web (no funciona con file://)

**Opción A - Python:**
```bash
cd dist-vanilla
python -m http.server 8000
# Abre: http://localhost:8000
```

**Opción B - Node:**
```bash
cd dist-vanilla
npx serve
```

**Opción C - VS Code:**
- Instala extensión "Live Server"
- Click derecho en `index.html` → "Open with Live Server"

---

## 📝 Personalización

### **Agregar Nuevo Venue**

Edita `assets/data.js`:
```javascript
const VENUES = [
  // ... venues existentes
  { 
    id: 9, 
    name: 'Seattle', 
    lat: 47.6062, 
    lng: -122.3321, 
    stadium: 'Lumen Field', 
    country: 'USA' 
  }
];
```

### **Cambiar Estilos del Mapa**

Edita `assets/data.js`:
```javascript
const MAP_STYLES = [
  { 
    elementType: "geometry", 
    stylers: [{ color: "#1a1a1a" }]  // ← Cambiar a modo oscuro
  }
];
```

### **Modificar HTML**

Edita `index.html` directamente:
```html
<!-- Agregar nuevo elemento -->
<div class="my-custom-section">
  <h2>Mis Partidos Favoritos</h2>
  <!-- ... -->
</div>
```

### **Agregar Funcionalidad JS**

Edita `assets/app.js`:
```javascript
// Agregar nueva función
function highlightMyTeam() {
  // Tu código aquí
}

// Llamarla en init()
function init() {
  initMap();
  initSelects();
  highlightMyTeam();  // ← Nueva función
}
```

---

## 🔄 Integración con Directus

### **Método 1: Archivos Separados (Recomendado)**

1. **Subir archivos:**
   ```
   Directus File Manager:
   ├── venues/index.html
   └── venues/assets/
       ├── styles.css
       ├── data.js
       └── app.js
   ```

2. **En el contenido de Directus:**
   ```html
   <link rel="stylesheet" href="/venues/assets/styles.css">
   
   <!-- HTML del index.html (sin <html>, <head>, <body>) -->
   <header class="bg-white shadow-sm">...</header>
   <main>...</main>
   
   <script src="https://maps.googleapis.com/maps/api/js?key=KEY"></script>
   <script src="/venues/assets/data.js"></script>
   <script src="/venues/assets/app.js"></script>
   ```

### **Método 2: Inline (Todo en uno)**

Genera versión inline:
```bash
npm run build:inline
```

Luego copia todo el contenido de `dist-inline/index.html` al editor de Directus.

---

## 🆚 Comparación: Vanilla vs React

| Aspecto | Vanilla Build | React Build (static) |
|---------|---------------|---------------------|
| **HTML** | Completo y real | `<div id="root">` |
| **Tamaño** | ~28 KB | ~328 KB |
| **Dependencias** | Solo Google Maps | React + Google Maps wrapper |
| **Editable** | 100% | Solo HTML, no componentes |
| **Complejidad** | Baja | Media |
| **SEO** | Perfecto | Requiere SSR/SSG |
| **Performance** | Más rápido | Ligeramente más lento |

---

## 🎯 Casos de Uso Ideales

**Usa Vanilla Build cuando:**
- ✅ Necesitas HTML 100% editable
- ✅ Integración con CMS (Directus, WordPress)
- ✅ Quieres tamaño mínimo
- ✅ No necesitas estado complejo de React
- ✅ Prefieres JavaScript simple

**Usa React Build cuando:**
- ✅ Desarrollas una SPA completa
- ✅ Necesitas estado complejo
- ✅ Prefieres componentes reutilizables
- ✅ Equipo familiarizado con React

---

## 🐛 Troubleshooting

### **El mapa no se muestra**
- ✅ Verifica la API key de Google Maps
- ✅ Revisa la consola del navegador (F12)
- ✅ Asegúrate de usar servidor web (no file://)

### **Marcadores no aparecen**
- ✅ Verifica que `data.js` se cargó (F12 → Network)
- ✅ Revisa coordenadas en `VENUES`
- ✅ Chequea zoom del mapa

### **Estilos no se aplican**
- ✅ Verifica ruta de `styles.css`
- ✅ Abre DevTools → Elements para ver clases

### **JavaScript no funciona**
- ✅ Orden de scripts en HTML:
  1. Google Maps API
  2. data.js
  3. app.js

---

## 📊 Datos Incluidos

### **Venues (Sedes)**
- Miami (Hard Rock Stadium)
- New York (MetLife Stadium)
- Los Angeles (SoFi Stadium)
- Dallas (AT&T Stadium)
- Ciudad de México (Estadio Azteca)
- Toronto (BMO Field)
- Vancouver (BC Place)
- Monterrey (Estadio BBVA)

### **Teams (Equipos)**
- Argentina 🇦🇷
- Brasil 🇧🇷
- México 🇲🇽
- Estados Unidos 🇺🇸
- Canadá 🇨🇦
- Uruguay 🇺🇾

---

## 🔧 Workflow de Desarrollo

```bash
# 1. Desarrollar en React (con hot reload)
npm run dev

# 2. Generar versión Vanilla
npm run build:vanilla

# 3. Probar localmente
cd dist-vanilla
python -m http.server 8000

# 4. Editar HTML/JS/CSS directamente
# (cambios se ven al recargar)

# 5. Subir a Directus/servidor
```

---

## 📚 Archivos Detallados

### **index.html**
- Header con título
- Controles (selects)
- Contenedor del mapa
- Info de ciudad seleccionada
- Footer
- Scripts (Google Maps, data, app)

### **assets/styles.css**
- Tailwind CSS compilado
- Clases utility
- Reset CSS
- Responsive

### **assets/data.js**
- `VENUES`: Array de sedes
- `TEAMS`: Array de equipos
- `MAP_CONFIG`: Configuración del mapa
- `MAP_STYLES`: Estilos visuales

### **assets/app.js**
- `initMap()`: Inicializar Google Maps
- `initSelects()`: Popular dropdowns
- `handleMarkerClick()`: Click en marcador
- `updateSelectedCity()`: Mostrar info
- Event listeners

---

**¿Preguntas? Consulta BUILD.md para más opciones de build**
