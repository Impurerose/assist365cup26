import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Generando versión Vanilla (HTML + CSS + JS sin React)...\n');

const distPath = path.join(__dirname, '..', 'dist-vanilla');

// 1. Crear carpeta final
if (fs.existsSync(distPath)) {
  fs.rmSync(distPath, { recursive: true });
}
fs.mkdirSync(distPath);
fs.mkdirSync(path.join(distPath, 'assets'));

console.log('📝 Generando archivos vanilla...\n');

// 2. Compilar Tailwind CSS directamente
console.log('🎨 Compilando Tailwind CSS...');
try {
  execSync(
    'npx tailwindcss -i ./src/index.css -o ./dist-vanilla/assets/styles.css --minify',
    { stdio: 'inherit' }
  );
} catch (error) {
  console.error('❌ Error compilando CSS:', error.message);
  process.exit(1);
}

console.log('✅ CSS compilado\n');

// 3. Leer configuración de mapas y teams
const mapConfigPath = path.join(__dirname, '..', 'src', 'config', 'mapConfig.js');
const teamsConfigPath = path.join(__dirname, '..', 'src', 'config', 'teamsConfig.js');

// 5. Crear archivo de datos (data.js) - SIN SYNTAX ERRORS
const dataJs = `// World Cup 2026 - Data
// Auto-generated: ${new Date().toISOString()}

const TEAMS = [
  { id: 'ARG', name: 'Argentina', flag: '🇦🇷' },
  { id: 'BRA', name: 'Brasil', flag: '🇧🇷' },
  { id: 'COL', name: 'Colombia', flag: '🇨🇴' },
  { id: 'MEX', name: 'México', flag: '🇲🇽' },
  { id: 'PAR', name: 'Paraguay', flag: '🇵🇾' },
  { id: 'URU', name: 'Uruguay', flag: '🇺🇾' },
  { id: 'ECU', name: 'Ecuador', flag: '🇪🇨' }
];

const VENUES = [
  { id: 1, name: 'Miami', lat: 25.7617, lng: -80.1918, stadium: 'Hard Rock Stadium', country: 'USA' },
  { id: 2, name: 'New York', lat: 40.7128, lng: -74.0060, stadium: 'MetLife Stadium', country: 'USA' },
  { id: 3, name: 'Los Angeles', lat: 34.0522, lng: -118.2437, stadium: 'SoFi Stadium', country: 'USA' },
  { id: 4, name: 'Dallas', lat: 32.7767, lng: -96.7970, stadium: 'AT&T Stadium', country: 'USA' },
  { id: 5, name: 'Kansas City', lat: 39.0997, lng: -94.5786, stadium: 'Arrowhead Stadium', country: 'USA' },
  { id: 6, name: 'Philadelphia', lat: 39.9526, lng: -75.1652, stadium: 'Lincoln Financial Field', country: 'USA' },
  { id: 7, name: 'Atlanta', lat: 33.7490, lng: -84.3880, stadium: 'Mercedes-Benz Stadium', country: 'USA' },
  { id: 8, name: 'Seattle', lat: 47.6062, lng: -122.3321, stadium: 'Lumen Field', country: 'USA' },
  { id: 9, name: 'San Francisco', lat: 37.7749, lng: -122.4194, stadium: 'Levi\\'s Stadium', country: 'USA' },
  { id: 10, name: 'Boston', lat: 42.3601, lng: -71.0589, stadium: 'Gillette Stadium', country: 'USA' },
  { id: 11, name: 'Houston', lat: 29.7604, lng: -95.3698, stadium: 'NRG Stadium', country: 'USA' },
  { id: 12, name: 'Ciudad de México', lat: 19.4326, lng: -99.1332, stadium: 'Estadio Azteca', country: 'México' },
  { id: 13, name: 'Monterrey', lat: 25.6866, lng: -100.3161, stadium: 'Estadio BBVA', country: 'México' },
  { id: 14, name: 'Guadalajara', lat: 20.6597, lng: -103.3496, stadium: 'Estadio Akron', country: 'México' },
  { id: 15, name: 'Toronto', lat: 43.6532, lng: -79.3832, stadium: 'BMO Field', country: 'Canadá' },
  { id: 16, name: 'Vancouver', lat: 49.2827, lng: -123.1207, stadium: 'BC Place', country: 'Canadá' }
];

const MAP_CONFIG = {
  mapId: 'c56ad705aa33bcadd4058d69',
  center: { lat: 45.5, lng: -100 },
  zoom: 4,
  minZoom: 3,
  disableDefaultUI: true,
  restriction: {
    latLngBounds: { north: 85, south: -85, west: -180, east: 180 },
    strictBounds: true
  }
};

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
`;

fs.writeFileSync(path.join(distPath, 'assets', 'data.js'), dataJs);

// 6. Crear JavaScript principal (app.js) - Lógica completa vanilla
const appJs = `// World Cup 2026 - Main Application
// Auto-generated: ${new Date().toISOString()}

const APP_STATE = {
  selectedTeam: null,
  selectedCity: null,
  activeTab: 'groups',
  map: null,
  markers: []
};

window.initMap = async function() {
  console.log('🗺️ Initializing Google Maps...');
  
  const mapElement = document.getElementById('map');
  if (!mapElement) {
    console.error('Map element not found');
    return;
  }

  APP_STATE.map = new google.maps.Map(mapElement, {
    ...MAP_CONFIG,
    styles: MAP_STYLES_LOW_ZOOM
  });

  APP_STATE.map.addListener('zoom_changed', handleZoomChange);
  
  await createMarkers();
  console.log('✅ Map initialized');
};

function handleZoomChange() {
  const zoom = APP_STATE.map.getZoom();
  const styles = zoom > ZOOM_THRESHOLD ? MAP_STYLES_HIGH_ZOOM : MAP_STYLES_LOW_ZOOM;
  APP_STATE.map.setOptions({ styles });
}

async function createMarkers() {
  const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');

  VENUES.forEach(venue => {
    const content = createMarkerContent(venue);
    const marker = new AdvancedMarkerElement({
      map: APP_STATE.map,
      position: { lat: venue.lat, lng: venue.lng },
      content: content
    });

    marker.addListener('click', () => handleMarkerClick(venue));
    APP_STATE.markers.push({ marker, venue });
  });

  console.log(\`✅ Created \${APP_STATE.markers.length} markers\`);
}

function createMarkerContent(venue) {
  const container = document.createElement('div');
  container.className = 'flex flex-col items-center gap-2 cursor-pointer';
  container.innerHTML = \`
    <div class="relative">
      <div class="w-14 h-14 rounded-full flex items-center justify-center border-3 border-white shadow-lg" style="background: linear-gradient(to bottom, #59D3C2, #006FE8);">
        <i class="ph-fill ph-soccer-ball text-white" style="font-size: 28px;"></i>
      </div>
      <div style="position:absolute;left:50%;transform:translateX(-50%);top:52px;width:0;height:0;border-left:8px solid transparent;border-right:8px solid transparent;border-top:12px solid #006FE8;"></div>
    </div>
    <div class="bg-white px-3 py-1 rounded-lg shadow-md">
      <span class="text-[#0059BA] font-bold text-sm whitespace-nowrap">\${venue.name}</span>
    </div>
  \`;
  return container;
}

function handleMarkerClick(venue) {
  console.log('📍 Clicked venue:', venue.name);
  APP_STATE.selectedCity = venue;
  APP_STATE.map.panTo({ lat: venue.lat, lng: venue.lng });
  APP_STATE.map.setZoom(10);
  
  const citySelect = document.getElementById('city-select');
  if (citySelect) citySelect.value = venue.id;
}

function populateTeamsGrid() {
  const grid = document.getElementById('teams-grid');
  if (!grid) return;

  grid.innerHTML = TEAMS.map(team => \`
    <button 
      onclick="handleTeamSelect('\${team.id}')"
      class="bg-white rounded-lg p-4 flex items-center gap-3 hover:shadow-md transition-shadow cursor-pointer"
    >
      <span class="text-3xl">\${team.flag}</span>
      <span class="font-semibold text-gray-800">\${team.name}</span>
    </button>
  \`).join('');
}

window.handleTeamSelect = function(teamId) {
  const team = TEAMS.find(t => t.id === teamId);
  if (!team) return;

  APP_STATE.selectedTeam = team;
  console.log('⚽ Selected team:', team.name);

  togglePanelState();
  showSelectionControls();
  populateMatchCards();
};

function togglePanelState() {
  const initialState = document.getElementById('initial-state');
  const selectedState = document.getElementById('selected-state');
  const sidePanel = document.getElementById('side-panel');

  if (APP_STATE.selectedTeam) {
    initialState.classList.add('hidden');
    selectedState.classList.remove('hidden');
    sidePanel.classList.remove('bg-[url(https://assistcdn.s3.us-west-1.amazonaws.com/assets/wc2026/BallWidthDots.svg)]');
  } else {
    initialState.classList.remove('hidden');
    selectedState.classList.add('hidden');
    sidePanel.classList.add('bg-[url(https://assistcdn.s3.us-west-1.amazonaws.com/assets/wc2026/BallWidthDots.svg)]');
  }
}

function showSelectionControls() {
  const controls = document.getElementById('selection-controls');
  if (!controls) return;
  controls.classList.remove('hidden');
  populateSelects();
}

function populateSelects() {
  const teamSelect = document.getElementById('team-select');
  const citySelect = document.getElementById('city-select');

  if (teamSelect) {
    teamSelect.innerHTML = '<option value="">Seleccioná tu equipo</option>' + 
      TEAMS.map(t => \`<option value="\${t.id}" \${APP_STATE.selectedTeam?.id === t.id ? 'selected' : ''}>\${t.flag} \${t.name}</option>\`).join('');
  }

  if (citySelect) {
    citySelect.innerHTML = '<option value="">Seleccioná sede</option>' + 
      VENUES.map(v => \`<option value="\${v.id}">\${v.name}</option>\`).join('');
  }
}

function populateMatchCards() {
  const container = document.getElementById('match-cards');
  if (!container) return;

  container.innerHTML = MOCK_MATCHES.map(match => \`
    <div class="bg-white border border-[#C2DFFF] rounded-xl px-3 py-4 flex flex-col gap-4 relative">
      <div class="absolute right-[7px] top-[7px] w-5 h-5">
        <svg width="20" height="20" viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="10" fill="#006FE8"/>
          <text x="10" y="14" text-anchor="middle" fill="white" class="text-xs font-semibold" style="font-family: 'Titillium Web', sans-serif;">\${match.number}</text>
        </svg>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-xl">\${match.team1.flag}</span>
        <p class="text-base font-semibold text-[#31363A]">\${match.team1.name}</p>
        <p class="text-base font-semibold text-[#31363A]">-</p>
        <p class="text-base font-semibold text-[#31363A]">\${match.team2.name}</p>
        <span class="text-xl">\${match.team2.flag}</span>
      </div>
      <div class="flex flex-col gap-2">
        <div class="flex items-center gap-2">
          <i class="ph ph-calendar" style="font-size: 20px; color: #7BD0C2;"></i>
          <p class="text-base text-[#31363A]">\${match.date}</p>
        </div>
        <div class="flex items-center gap-2">
          <i class="ph ph-map-pin" style="font-size: 20px; color: #7BD0C2;"></i>
          <p class="text-base text-[#31363A]">\${match.city}</p>
        </div>
        <div class="flex items-center gap-2">
          <i class="ph ph-clock" style="font-size: 20px; color: #7BD0C2;"></i>
          <p class="text-base text-[#31363A]">\${match.time.local} - \${match.time.venue}</p>
        </div>
      </div>
    </div>
  \`).join('');
}

function initChipsNav() {
  const chips = document.querySelectorAll('#chips-nav button');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      APP_STATE.activeTab = chip.dataset.tab;
      chips.forEach(c => {
        if (c.dataset.tab === APP_STATE.activeTab) {
          c.classList.add('border-[#006FE8]', 'text-[#31363A]');
          c.classList.remove('border-[#C2DFFF]', 'text-[#70777C]');
        } else {
          c.classList.remove('border-[#006FE8]', 'text-[#31363A]');
          c.classList.add('border-[#C2DFFF]', 'text-[#70777C]');
        }
      });
      console.log('📑 Tab:', APP_STATE.activeTab);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 World Cup 2026 Map - Vanilla Edition');
  populateTeamsGrid();
  initChipsNav();
});
`;

fs.writeFileSync(path.join(distPath, 'assets', 'app.js'), appJs);

// 7. Crear HTML completo (REPLICA EXACTA del diseño React)
const html = `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- World Cup 2026 Map - Vanilla Build -->
    <!-- Generated: ${new Date().toISOString()} -->
    <!-- Pure HTML + CSS + JavaScript (No React) -->
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link 
      href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400;600;700&display=swap" 
      rel="stylesheet" 
    />
    
    <!-- Favicons -->
    <link
      rel="icon"
      href="https://assistcdn.s3.us-west-1.amazonaws.com/assets/site/favicon/FaviconA365.ico"
      sizes="48x48"
      type="image/x-icon"
    />
    <link
      rel="icon"
      href="https://assistcdn.s3.us-west-1.amazonaws.com/assets/site/favicon/FaviconA365.svg"
      type="image/svg+xml"
    />
    <link
      rel="apple-touch-icon"
      href="https://assistcdn.s3.us-west-1.amazonaws.com/assets/site/favicon/apple-touch-icon.png"
      sizes="180x180"
    />
    
    <!-- Phosphor Icons -->
    <script src="https://unpkg.com/@phosphor-icons/web@2.1.1"></script>
    
    <title>World Cup Map 2026</title>
    
    <!-- Styles -->
    <link rel="stylesheet" href="assets/styles.css" />
  </head>
  
  <body class="bg-[#F2F2F2]">
    <div class="w-full min-h-screen flex flex-col">
      
      <!-- Header -->
      <header class="bg-white w-full">
        <div class="flex items-center justify-between w-full max-w-[1200px] mx-auto px-6 py-3">
          <div class="flex items-center gap-3">
            <img
              src="https://assistcdn.s3.us-west-1.amazonaws.com/assets/site/home/img/brand/a365_logo_xa.svg"
              alt="A365 Logo"
            />
            <svg width="32" height="32" viewBox="0 0 32 32" class="flex-shrink-0">
              <defs>
                <linearGradient id="soccerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#59D3C2" stop-opacity="1" />
                  <stop offset="100%" stop-color="#006FE8" stop-opacity="1" />
                </linearGradient>
              </defs>
              <circle cx="16" cy="16" r="14" fill="url(#soccerGradient)" opacity="0.2"/>
              <path d="M16 4C9.4 4 4 9.4 4 16s5.4 12 12 12 12-5.4 12-12S22.6 4 16 4zm0 22c-5.5 0-10-4.5-10-10S10.5 6 16 6s10 4.5 10 10-4.5 10-10 10z" fill="url(#soccerGradient)"/>
            </svg>
            <h1 class="text-xl font-semibold text-[#0059BA]">
              World Cup Map 2026
            </h1>
          </div>
          <button class="inline-flex items-center justify-center gap-2 px-4 py-2 h-10 text-base font-semibold rounded-xl bg-[#006FE8] text-white hover:bg-[#0059BA] transition-colors">
            <i class="ph ph-share-network" style="font-size: 16px; font-weight: bold;"></i>
            Compartir
          </button>
        </div>
      </header>

      <!-- Selection Controls (hidden initially, shown when team selected) -->
      <div id="selection-controls" class="hidden w-full max-w-[1366px] mx-auto mt-6">
        <div class="px-4 w-full max-w-[1200px] mx-auto">
          <div class="flex items-end justify-between gap-6 font-semibold">
            <div class="flex gap-x-2 items-center">
              <span class="text-[#31363A] text-xl pr-4">Soy fan de:</span>
              <select id="team-select" class="w-80 bg-white border border-[#C2DFFF] rounded-xl p-3 text-base font-normal focus:outline-none focus:ring-2 focus:ring-[#C2DFFF]">
                <option value="">Seleccioná tu equipo</option>
              </select>
            </div>
            <div class="flex gap-x-2 items-center">
              <span class="text-[#31363A] text-xl pr-4">Ver partidos en:</span>
              <select id="city-select" class="w-80 bg-white border border-[#C2DFFF] rounded-xl p-3 text-base font-normal focus:outline-none focus:ring-2 focus:ring-[#C2DFFF]">
                <option value="">Seleccioná sede</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="w-full max-w-[1366px] mx-auto mt-8">
        <div class="px-4 w-full max-w-[1200px] mx-auto">
          
          <!-- Map + Side Panel Container -->
          <div class="gap-6 w-full flex justify-center bg-[#F2F2F2]">
            
            <!-- Map Container -->
            <div class="rounded-2xl overflow-hidden w-[790px] h-[640px]">
              <div id="map" class="w-full h-full"></div>
            </div>

            <!-- Side Panel -->
            <div id="side-panel" class="rounded-l-xl flex flex-col p-6 w-[467px] h-[640px] bg-[rgba(81,90,96,0.06)] bg-[url(https://assistcdn.s3.us-west-1.amazonaws.com/assets/wc2026/BallWidthDots.svg)] bg-no-repeat bg-top bg-contain">
              
              <!-- ESTADO INICIAL (no team selected) -->
              <div id="initial-state">
                <div class="flex flex-col items-start mb-6 mt-32">
                  <h2 class="text-lg font-semibold text-[#0059BA] leading-snug">
                    Seleccioná tu equipo para explorar tu camino a la gran final 2026
                  </h2>
                </div>
                <div id="teams-grid" class="grid grid-cols-2 gap-3">
                  <!-- Teams populated by JavaScript -->
                </div>
              </div>

              <!-- ESTADO SELECCIONADO (team selected) -->
              <div id="selected-state" class="hidden">
                <!-- Chips Navigation -->
                <div id="chips-nav" class="flex gap-2 mb-6">
                  <button 
                    data-tab="groups" 
                    class="border-2 border-[#006FE8] text-[#31363A] font-semibold rounded-full px-4 py-[10px] text-lg transition-all duration-300 cursor-pointer"
                  >
                    Grupos
                  </button>
                  <button 
                    data-tab="elimination" 
                    class="border-2 border-[#C2DFFF] text-[#70777C] font-semibold rounded-full px-4 py-[10px] text-lg transition-all duration-300 cursor-pointer hover:border-[#006FE8] hover:text-[#31363A]"
                  >
                    Eliminación
                  </button>
                </div>

                <!-- Match Cards -->
                <div id="match-cards" class="flex flex-col gap-3">
                  <!-- Match cards populated by JavaScript -->
                </div>
              </div>
              
            </div>

          </div>
        </div>
      </div>
    </div>

    <!-- Google Maps API with callback -->
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBTLpnFO7BWQeVpblahIGHDLYzjVzF61oQ&callback=initMap&loading=async" async defer></script>
    
    <!-- Application Data -->
    <script src="assets/data.js"></script>
    
    <!-- Application Logic -->
    <script src="assets/app.js"></script>
    
  </body>
</html>
`;

// 7. Escribir todos los archivos
fs.writeFileSync(path.join(distPath, 'index.html'), html);
fs.writeFileSync(path.join(distPath, 'assets', 'data.js'), dataJs);
fs.writeFileSync(path.join(distPath, 'assets', 'app.js'), appJs);

console.log('✅ Archivos vanilla generados\n');

// 8. Reportar archivos generados
console.log('📦 Archivos generados:\n');

const files = [
  'index.html',
  'assets/styles.css',
  'assets/data.js',
  'assets/app.js'
];

files.forEach(file => {
  const filePath = path.join(distPath, file);
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    const size = (stats.size / 1024).toFixed(2);
    const ext = path.extname(file);
    let icon = '📄';
    if (ext === '.html') icon = '📝';
    if (ext === '.css') icon = '🎨';
    if (ext === '.js') icon = '⚡';
    
    console.log(`  ${icon} ${file.padEnd(25)} ${size.padStart(8)} KB`);
  }
});

console.log('\n✅ Build Vanilla completado en: dist-vanilla/\n');
console.log('💡 Características:');
console.log('   - HTML completo (no <div id="root">)');
console.log('   - CSS separado (Tailwind compilado)');
console.log('   - JavaScript vanilla (sin React)');
console.log('   - Google Maps API directa');
console.log('   - 100% editable y legible\n');
console.log('⚠️  IMPORTANTE: Actualiza la API key de Google Maps en index.html\n');
