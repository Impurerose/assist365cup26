# 📋 Plan de Migración: React → Vanilla JavaScript
## World Cup 2026 Map - Análisis y Estrategia Completa

**Fecha:** 2026-01-16  
**Objetivo:** Generar HTML/CSS/JS 100% funcional, idéntico a la app React, sin dependencias

---

## 🔍 ANÁLISIS DE LA APLICACIÓN REACT

### Estructura de Componentes

```
App.jsx (Root)
├── HeaderBar.jsx
│   ├── SoccerBallGradient (SVG inline)
│   ├── <SoccerBall> de @phosphor-icons/react
│   └── Button (dsys)
│
├── SelectionControls (condicional: solo si selectedTeam)
│   ├── Select "Soy fan de" (teamsConfig)
│   └── Select "Ver partidos en" (venuesConfig)
│
├── MapContainer.jsx
│   ├── APIProvider (@vis.gl/react-google-maps)
│   ├── Map (con mapId, styles dinámicos por zoom)
│   └── VenueMarker[] (16 markers con AdvancedMarker)
│
└── SidePanel.jsx
    ├── ESTADO INICIAL (selectedTeam === null)
    │   ├── Texto de bienvenida
    │   ├── Background image (BallWidthDots.svg)
    │   └── Grid 2x3.5 con TeamCard[]
    │
    └── ESTADO SELECCIONADO (selectedTeam !== null)
        ├── SIN background image
        ├── Chips de navegación (Grupos / Eliminación)
        └── MatchCard[] (3 partidos mockup)
```

### Estados Globales (App.jsx)

```javascript
const [selectedTeam, setSelectedTeam] = useState(null);
const [viewMode, setViewMode] = useState("venue");
const [selectedCity, setSelectedCity] = useState(null);
const [panelTab, setPanelTab] = useState("groups");
```

### Configuración Crítica

**Google Maps API:**
- API Key: `AIzaSyBTLpnFO7BWQeVpblahIGHDLYzjVzF61oQ`
- Map ID: `c56ad705aa33bcadd4058d69`
- Library: `@vis.gl/react-google-maps`
- Component: `AdvancedMarker` (NO standard Marker)

**Datos:**
- 7 equipos (teamsConfig.js): ARG, BRA, COL, MEX, PAR, URU, ECU
- 16 venues (mapConfig.js): Miami, NY, LA, Dallas, KC, etc.

**Estilos Dinámicos:**
- Zoom ≤ 8: `MAP_STYLES_LOW_ZOOM` (sin labels)
- Zoom > 8: `MAP_STYLES_HIGH_ZOOM` (con labels países/estados)
- Threshold: línea 97 de mapConfig.js

---

## ❌ PROBLEMAS ACTUALES EN DIST-VANILLA

### 1. **SyntaxError en data.js línea 25**
```javascript
// ❌ INCORRECTO (template literals sin escapar)
const MAP_STYLES_LOW_ZOOM = [
  { featureType: "all", elementType: "labels", stylers: [{ visibility: "on" }] }
];
```
**Causa:** Comillas dobles dentro de strings con comillas dobles  
**Impacto:** Archivo no parsea, aplicación no inicia

### 2. **ReferenceError: TEAMS is not defined**
```javascript
// En app.js línea 95
grid.innerHTML = TEAMS.map(team => `...`).join('');
```
**Causa:** data.js no se carga porque tiene SyntaxError  
**Impacto:** populateTeamsGrid() falla, no se renderizan equipos

### 3. **Google Maps no renderiza**
```html
<!-- ❌ INCORRECTO -->
<script src="https://maps.googleapis.com/maps/api/js?key=..."></script>
```
**Problemas:**
- Falta `callback=initMap` en URL
- Falta `async defer`
- `window.initMap` no está definido correctamente
- No se usa `mapId` requerido por AdvancedMarker

### 4. **SVG Soccer Ball roto en navbar**
```html
<!-- ❌ HARDCODED SVG - No coincide con React -->
<svg width="32" height="32" viewBox="0 0 32 32">
  <path d="M16 4C9.4 4..."/>
</svg>
```
**React usa:** `<SoccerBall size={32} weight="duotone" />`  
**Problema:** Ícono se ve diferente, no tiene efecto duotone

### 5. **Falta funcionalidad completa**
**Implementado:**
- ✅ Grid de equipos inicial
- ✅ Click en equipo (alert básico)

**Faltante:**
- ❌ SelectionControls (2 selects) al seleccionar equipo
- ❌ Chips de navegación (Grupos/Eliminación)
- ❌ MatchCard[] con datos reales
- ❌ Toggle background image en SidePanel
- ❌ Interacción con markers del mapa

### 6. **Layout y padding incorrectos**
```html
<!-- ❌ Padding mal aplicado -->
<div class="rounded-l-xl flex flex-col p-6 w-[467px]...">
```
**React aplica:** Padding condicional según estado  
**Problema:** Espaciado no coincide con diseño original

---

## ✅ ESTRATEGIA DE SOLUCIÓN

### FASE 1: Corregir data.js - CRÍTICO 🔥

**Objetivo:** Eliminar SyntaxError, hacer archivo parseable

**Acciones:**
1. Remover template literals de arrays de configuración
2. Usar comillas simples consistentemente
3. Validar JSON/JS con linter

**Archivos:**
- `/dist-vanilla/assets/data.js`

**Código:**
```javascript
// ✅ CORRECTO
const MAP_STYLES_LOW_ZOOM = [
  { featureType: 'all', elementType: 'labels', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'road', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] }
];

const MAP_STYLES_HIGH_ZOOM = [
  { featureType: 'all', elementType: 'labels', stylers: [{ visibility: 'off' }] },
  { featureType: 'administrative.country', elementType: 'labels.text', stylers: [{ visibility: 'on' }] },
  { featureType: 'administrative.country', elementType: 'labels.text.fill', stylers: [{ color: '#444444' }] },
  { featureType: 'administrative.province', elementType: 'labels.text', stylers: [{ visibility: 'on' }] },
  { featureType: 'administrative.province', elementType: 'labels.text.fill', stylers: [{ color: '#666666' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'road', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] }
];

const ZOOM_THRESHOLD = 8;
```

---

### FASE 2: Reescribir index.html - Estructura Completa

**Objetivo:** HTML con 2 estados (inicial + seleccionado) + elementos correctos

**Estructura:**
```html
<body>
  <!-- Header Bar (SIEMPRE visible) -->
  <header>
    <!-- Logo Assist 365 -->
    <!-- SVG Soccer Ball de Phosphor Icons -->
    <!-- Título -->
    <!-- Botón Compartir con ícono Phosphor -->
  </header>

  <!-- Selection Controls (OCULTO inicialmente, visible con team) -->
  <div id="selection-controls" class="hidden">
    <!-- Select: Soy fan de -->
    <!-- Select: Ver partidos en -->
  </div>

  <!-- Main Container -->
  <div>
    <!-- Map Container -->
    <div id="map"></div>

    <!-- Side Panel -->
    <div id="side-panel">
      
      <!-- Estado Inicial (visible si !selectedTeam) -->
      <div id="initial-state">
        <h2>Seleccioná tu equipo...</h2>
        <div id="teams-grid"></div>
      </div>

      <!-- Estado Seleccionado (oculto inicialmente) -->
      <div id="selected-state" class="hidden">
        <!-- Chips Navigation -->
        <div id="chips-nav">
          <button data-tab="groups">Grupos</button>
          <button data-tab="elimination">Eliminación</button>
        </div>
        
        <!-- Match Cards Container -->
        <div id="match-cards"></div>
      </div>
      
    </div>
  </div>

  <!-- Scripts -->
  <script src="https://maps.googleapis.com/maps/api/js?key=...&callback=initMap&loading=async"></script>
  <script src="assets/data.js"></script>
  <script src="assets/app.js"></script>
</body>
```

**Correcciones específicas:**

1. **SVG Soccer Ball (Phosphor Icons CDN):**
```html
<!-- ✅ USAR ÍCONO DE PHOSPHOR WEB -->
<i class="ph ph-soccer-ball" style="font-size: 32px; font-weight: 300;"></i>

<!-- O SVG inline correcto desde Phosphor -->
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="url(#soccerGradient)" viewBox="0 0 256 256">
  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z" opacity="0.2"/>
  <path d="M128,16a112,112,0,1,0,112,112A112.12,112.12,0,0,0,128,16Zm0,208a96,96,0,1,1,96-96A96.11,96.11,0,0,1,128,224Z"/>
</svg>
```

2. **Clases Tailwind exactas:**
```html
<!-- Side Panel - Estado Inicial -->
<div class="rounded-l-xl flex flex-col p-6 w-[467px] h-[640px] bg-[rgba(81,90,96,0.06)] bg-[url(https://assistcdn.s3.us-west-1.amazonaws.com/assets/wc2026/BallWidthDots.svg)] bg-no-repeat bg-top bg-contain">

<!-- Side Panel - Estado Seleccionado (SIN background image) -->
<div class="rounded-l-xl flex flex-col p-6 w-[467px] h-[640px] bg-[rgba(81,90,96,0.06)]">
```

---

### FASE 3: Reescribir app.js - Lógica Robusta

**Objetivo:** Manejo de estado vanilla, equivalente a React hooks

**Estructura:**
```javascript
// ========================================
// ESTADO GLOBAL
// ========================================
const APP_STATE = {
  selectedTeam: null,
  selectedCity: null,
  activeTab: 'groups',
  map: null,
  markers: []
};

// ========================================
// GOOGLE MAPS - CALLBACK GLOBAL
// ========================================
window.initMap = function() {
  console.log('🗺️ Initializing Google Maps...');
  
  const mapElement = document.getElementById('map');
  if (!mapElement) {
    console.error('Map container not found');
    return;
  }

  // Crear mapa con mapId
  APP_STATE.map = new google.maps.Map(mapElement, {
    mapId: 'c56ad705aa33bcadd4058d69', // CRÍTICO para AdvancedMarker
    center: { lat: 45.5, lng: -100 },
    zoom: 4,
    minZoom: 3,
    disableDefaultUI: true,
    restriction: {
      latLngBounds: {
        north: 85, south: -85, west: -180, east: 180
      },
      strictBounds: true
    },
    styles: MAP_STYLES_LOW_ZOOM
  });

  // Listener de zoom para cambiar estilos
  APP_STATE.map.addListener('zoom_changed', handleZoomChange);

  // Crear markers
  createMarkers();
};

function handleZoomChange() {
  const zoom = APP_STATE.map.getZoom();
  const styles = zoom > ZOOM_THRESHOLD ? MAP_STYLES_HIGH_ZOOM : MAP_STYLES_LOW_ZOOM;
  APP_STATE.map.setOptions({ styles });
}

// ========================================
// MARKERS - AdvancedMarkerElement
// ========================================
async function createMarkers() {
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  VENUES.forEach(venue => {
    const markerContent = createMarkerContent(venue);
    
    const marker = new AdvancedMarkerElement({
      map: APP_STATE.map,
      position: { lat: venue.lat, lng: venue.lng },
      content: markerContent
    });

    marker.addListener('click', () => handleMarkerClick(venue));
    
    APP_STATE.markers.push({ marker, venue });
  });

  console.log(`✅ Created ${APP_STATE.markers.length} markers`);
}

function createMarkerContent(venue) {
  const container = document.createElement('div');
  container.className = 'flex flex-col items-center gap-2 cursor-pointer';
  container.innerHTML = `
    <div class="relative">
      <div class="w-14 h-14 rounded-full flex items-center justify-center border-3 border-white shadow-lg bg-gradient-to-b from-[#59D3C2] to-[#006FE8]">
        <i class="ph-fill ph-soccer-ball text-white" style="font-size: 28px;"></i>
      </div>
      <div style="position:absolute;left:50%;transform:translateX(-50%);top:52px;width:0;height:0;border-left:8px solid transparent;border-right:8px solid transparent;border-top:12px solid #006FE8;"></div>
    </div>
    <div class="bg-white px-3 py-1 rounded-lg shadow-md">
      <span class="text-[#0059BA] font-bold text-sm whitespace-nowrap">${venue.name}</span>
    </div>
  `;
  return container;
}

function handleMarkerClick(venue) {
  console.log('📍 Clicked venue:', venue.name);
  APP_STATE.selectedCity = venue;
  
  // Pan + zoom
  APP_STATE.map.panTo({ lat: venue.lat, lng: venue.lng });
  APP_STATE.map.setZoom(10);
  
  // Actualizar select si existe
  const citySelect = document.getElementById('city-select');
  if (citySelect) {
    citySelect.value = venue.id;
  }
}

// ========================================
// TEAMS GRID - Estado Inicial
// ========================================
function populateTeamsGrid() {
  const grid = document.getElementById('teams-grid');
  if (!grid) return;

  grid.innerHTML = TEAMS.map(team => `
    <button 
      onclick="handleTeamSelect('${team.id}')"
      class="bg-white rounded-lg p-4 flex items-center gap-3 hover:shadow-md transition-shadow cursor-pointer"
    >
      <span class="text-3xl">${team.flag}</span>
      <span class="font-semibold text-gray-800">${team.name}</span>
    </button>
  `).join('');
}

// ========================================
// TEAM SELECTION - Cambio de Estado
// ========================================
function handleTeamSelect(teamId) {
  const team = TEAMS.find(t => t.id === teamId);
  if (!team) return;

  APP_STATE.selectedTeam = team;
  console.log('⚽ Selected team:', team.name);

  // Toggle estados
  togglePanelState();
  
  // Mostrar selection controls
  showSelectionControls();
  
  // Poblar match cards
  populateMatchCards();
}

function togglePanelState() {
  const initialState = document.getElementById('initial-state');
  const selectedState = document.getElementById('selected-state');
  const sidePanel = document.getElementById('side-panel');

  if (APP_STATE.selectedTeam) {
    // Ocultar estado inicial
    initialState.classList.add('hidden');
    
    // Mostrar estado seleccionado
    selectedState.classList.remove('hidden');
    
    // Remover background image
    sidePanel.classList.remove(
      'bg-[url(https://assistcdn.s3.us-west-1.amazonaws.com/assets/wc2026/BallWidthDots.svg)]',
      'bg-no-repeat',
      'bg-top',
      'bg-contain'
    );
  } else {
    // Mostrar estado inicial
    initialState.classList.remove('hidden');
    
    // Ocultar estado seleccionado
    selectedState.classList.add('hidden');
    
    // Agregar background image
    sidePanel.classList.add(
      'bg-[url(https://assistcdn.s3.us-west-1.amazonaws.com/assets/wc2026/BallWidthDots.svg)]',
      'bg-no-repeat',
      'bg-top',
      'bg-contain'
    );
  }
}

function showSelectionControls() {
  const controls = document.getElementById('selection-controls');
  if (!controls) return;

  controls.classList.remove('hidden');
  
  // Poblar selects
  populateTeamSelect();
  populateCitySelect();
}

// ========================================
// MATCH CARDS - Mockup Data
// ========================================
const MOCK_MATCHES = [
  {
    number: 1,
    team1: { name: 'Argentina', flag: '🇦🇷' },
    team2: { name: 'Algeria', flag: '🇩🇿' },
    date: 'Martes 16 de junio',
    city: 'Kansas city',
    time: { local: '21:00 h (AR)', venue: '18:00 h (KCK)' }
  },
  {
    number: 2,
    team1: { name: 'Argentina', flag: '🇦🇷' },
    team2: { name: 'Austria', flag: '🇦🇹' },
    date: 'Lunes 22 de junio',
    city: 'Dallas',
    time: { local: '13:00 h (AR)', venue: '10:00 h (DL)' }
  },
  {
    number: 3,
    team1: { name: 'Jordania', flag: '🇯🇴' },
    team2: { name: 'Argentina', flag: '🇦🇷' },
    date: 'Sábado 27 de junio',
    city: 'Dallas',
    time: { local: '22:00 h (AR)', venue: '19:00 h (DL)' }
  }
];

function populateMatchCards() {
  const container = document.getElementById('match-cards');
  if (!container) return;

  const matchesHTML = MOCK_MATCHES.map(match => createMatchCardHTML(match)).join('');
  container.innerHTML = matchesHTML;
}

function createMatchCardHTML(match) {
  return `
    <div class="bg-white border border-[#C2DFFF] rounded-xl px-3 py-4 flex flex-col gap-4 relative">
      <!-- Badge número -->
      <div class="absolute right-[7px] top-[7px] w-5 h-5">
        <svg width="20" height="20" viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="10" fill="#006FE8"/>
          <text x="10" y="10" text-anchor="middle" dominant-baseline="central" fill="white" class="text-xs font-semibold">${match.number}</text>
        </svg>
      </div>

      <!-- Equipos -->
      <div class="flex items-center gap-2">
        <span class="text-xl">${match.team1.flag}</span>
        <p class="text-base font-semibold text-[#31363A]">${match.team1.name}</p>
        <p class="text-base font-semibold text-[#31363A]">-</p>
        <p class="text-base font-semibold text-[#31363A]">${match.team2.name}</p>
        <span class="text-xl">${match.team2.flag}</span>
      </div>

      <!-- Info partido -->
      <div class="flex flex-col gap-2">
        <div class="flex items-center gap-2">
          <i class="ph ph-calendar text-[#7BD0C2]" style="font-size: 20px;"></i>
          <p class="text-base text-[#31363A]">${match.date}</p>
        </div>
        <div class="flex items-center gap-2">
          <i class="ph ph-map-pin text-[#7BD0C2]" style="font-size: 20px;"></i>
          <p class="text-base text-[#31363A]">${match.city}</p>
        </div>
        <div class="flex items-center gap-2">
          <i class="ph ph-clock text-[#7BD0C2]" style="font-size: 20px;"></i>
          <p class="text-base text-[#31363A]">${match.time.local} - ${match.time.venue}</p>
        </div>
      </div>
    </div>
  `;
}

// ========================================
// CHIPS NAVIGATION
// ========================================
function initChipsNav() {
  const chips = document.querySelectorAll('#chips-nav button');
  chips.forEach(chip => {
    chip.addEventListener('click', () => handleTabSwitch(chip.dataset.tab));
  });
}

function handleTabSwitch(tab) {
  APP_STATE.activeTab = tab;
  
  // Update visual state
  const chips = document.querySelectorAll('#chips-nav button');
  chips.forEach(chip => {
    if (chip.dataset.tab === tab) {
      chip.classList.add('border-[#006FE8]', 'text-[#31363A]');
      chip.classList.remove('border-[#C2DFFF]', 'text-[#70777C]');
    } else {
      chip.classList.remove('border-[#006FE8]', 'text-[#31363A]');
      chip.classList.add('border-[#C2DFFF]', 'text-[#70777C]');
    }
  });

  console.log('📑 Tab switched to:', tab);
  // TODO: Filter matches by tab
}

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 World Cup 2026 Map - Vanilla Edition');
  
  populateTeamsGrid();
  initChipsNav();
  
  // Google Maps se inicializa via callback
});
```

---

### FASE 4: Google Maps Script Correcto

**HTML:**
```html
<!-- ✅ SCRIPT CON CALLBACK ASYNC -->
<script 
  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBTLpnFO7BWQeVpblahIGHDLYzjVzF61oQ&callback=initMap&loading=async"
  async
  defer
></script>
```

**Características:**
- `callback=initMap` → ejecuta window.initMap cuando carga
- `loading=async` → carga asíncrona moderna
- `async defer` → no bloquea renderizado
- NO usar `libraries=marker` (se importa dinámicamente)

---

### FASE 5: Testing y Validación

**Checklist:**
```
□ Console sin errores (0 errors)
□ Mapa renderiza correctamente
□ 16 markers visibles con labels
□ Click en team → estado cambia
□ Selection controls aparecen
□ Match cards se muestran
□ Chips de navegación funcionan
□ Click en marker → pan + zoom
□ Zoom cambia estilos del mapa
□ Layout idéntico a React (pixel-perfect)
□ Responsive (max-w-[1200px])
□ Fonts Titillium Web cargadas
□ Phosphor Icons funcionan
□ CSS Tailwind compilado completo
□ Total size ~30KB
```

---

## 📊 COMPARATIVA REACT vs VANILLA

| Aspecto | React | Vanilla JS |
|---------|-------|------------|
| **Bundle Size** | 213 KB (dist-html) | ~30 KB (target) |
| **Dependencies** | React, @vis.gl, Phosphor React | Solo Google Maps API |
| **Inicialización** | ReactDOM.render | DOMContentLoaded + callback |
| **Estado** | useState hooks | APP_STATE object |
| **Componentes** | JSX components | Template strings |
| **Maps Library** | @vis.gl/react-google-maps | google.maps native |
| **Markers** | AdvancedMarker wrapper | AdvancedMarkerElement |
| **Estilos** | Tailwind + className | Tailwind + class |
| **Renderizado** | Virtual DOM | Imperative DOM |

---

## 🎯 RESULTADO ESPERADO

**Estructura Final:**
```
dist-vanilla/
├── index.html          (~6 KB)    ← HTML completo 2 estados
├── assets/
│   ├── styles.css      (18 KB)    ← Tailwind compilado
│   ├── data.js         (~4 KB)    ← Configs + datos limpios
│   └── app.js          (~6 KB)    ← Lógica completa
│
TOTAL: ~34 KB (84% más ligero que React)
```

**Características:**
- ✅ 100% funcional, idéntico a React
- ✅ Sin dependencias (solo Google Maps)
- ✅ Editable manualmente
- ✅ SEO-friendly (HTML completo)
- ✅ Performance optimizado
- ✅ Compatible todos los browsers modernos

---

## 📝 NOTAS DE IMPLEMENTACIÓN

### Prioridad Alta 🔥
1. Corregir data.js (BLOQUEANTE)
2. Callback Google Maps (BLOQUEANTE)
3. AdvancedMarkerElement (REQUERIDO para markers)

### Prioridad Media ⚠️
4. Estados del SidePanel
5. Selection Controls
6. Match Cards

### Prioridad Baja ℹ️
7. Optimizaciones CSS
8. Mejoras UX
9. Animaciones adicionales

---

## 🔧 COMANDOS DE BUILD

**Regenerar vanilla:**
```bash
npm run build:vanilla
```

**Probar localmente:**
```bash
python3 -m http.server 8888 --directory dist-vanilla
# Abrir: http://localhost:8888
```

**Verificar errores:**
```bash
# Console del browser
# Network tab → verificar carga de scripts
# Elements → inspeccionar estructura DOM
```

---

## ✅ CRITERIOS DE ÉXITO

La migración será exitosa cuando:

1. **Funcionalidad:** Todas las features de React funcionan en vanilla
2. **Visual:** Layout pixel-perfect comparado con screenshot original
3. **Performance:** Carga < 2 segundos en 3G
4. **Compatibilidad:** Funciona en Chrome, Firefox, Safari, Edge
5. **Mantenibilidad:** Código legible, bien documentado
6. **Size:** Bundle < 40 KB total

---

**Autor:** GitHub Copilot  
**Versión:** 1.0  
**Status:** ✅ LISTO PARA IMPLEMENTACIÓN
