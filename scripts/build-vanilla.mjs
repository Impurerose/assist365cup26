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

// 2.5. Agregar estilos de Tom Select
console.log('🎨 Agregando estilos de Tom Select...');
const tomSelectStyles = `

/* Tom Select Custom Styles - A365 Design System */
.ts-wrapper.single .ts-control {
  background: #fff;
  border: 1px solid rgb(194, 223, 255);
  border-radius: 0.75rem;
  padding: 0.75rem;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 400;
  transition: border-color 0.3s, box-shadow 0.3s;
  cursor: pointer;
}

.ts-wrapper.single .ts-control:hover {
  border-color: rgb(51, 140, 237);
}

.ts-wrapper.single.focus .ts-control {
  outline: none;
  border-color: rgb(194, 223, 255);
  box-shadow: 0 0 0 2px rgb(194, 223, 255);
}

.ts-wrapper .ts-control .item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.ts-wrapper.single .ts-control:after {
  content: '';
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 6px solid #31363A;
  pointer-events: none;
}

.ts-dropdown {
  background: #fff;
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  margin-top: 0.25rem;
  border: none;
  overflow: hidden;
}

.ts-dropdown .option {
  padding: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.ts-dropdown .option:hover,
.ts-dropdown .option.active {
  background-color: #f2f2f2;
  color: #31363A;
}

.ts-dropdown .option .flex {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.ts-wrapper.single .ts-control .item .text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem;
}

.ts-dropdown .option .text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem;
}

/* Hide native dropdown arrow */
.ts-wrapper.single .ts-control input {
  display: none;
}

/* Placeholder style */
.ts-wrapper.single .ts-control.dropdown-active:before {
  display: none;
}

.ts-wrapper .ts-control > * {
  vertical-align: middle;
  display: inline-flex;
  align-items: center;
}

/* Input hidden when item selected */
.ts-wrapper.single.has-items .ts-control input {
  display: none !important;
}

/* Max height for dropdown */
.ts-dropdown-content {
  max-height: 256px;
  overflow-y: auto;
}

/* Scrollbar style */
.ts-dropdown-content::-webkit-scrollbar {
  width: 8px;
}

.ts-dropdown-content::-webkit-scrollbar-track {
  background: #f2f2f2;
  border-radius: 0.75rem;
}

.ts-dropdown-content::-webkit-scrollbar-thumb {
  background: #c2dfff;
  border-radius: 0.75rem;
}

.ts-dropdown-content::-webkit-scrollbar-thumb:hover {
  background: #338ced;
}
`;

const cssPath = path.join(distPath, 'assets', 'styles.css');
const currentCss = fs.readFileSync(cssPath, 'utf8');
fs.writeFileSync(cssPath, currentCss + tomSelectStyles);
console.log('✅ Estilos de Tom Select agregados\n');

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
  { id: 'ECU', name: 'Ecuador', flag: '🇪🇨' },
  { id: 'PAN', name: 'Panamá', flag: '🇵🇦' }
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
  mapId: 'c6f5508b76c0d2152b22324d',
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
    id: 1,
    number: 1,
    team1: { name: 'Argentina', flag: '🇦🇷' },
    team2: { name: 'Algeria', flag: '🇩🇿' },
    date: 'Martes 16 de junio',
    city: 'Kansas city',
    time: { local: '21:00 h (AR)', venue: '18:00 h (KCK)' },
    stage: 'groups',
    group: 'A'
  },
  {
    id: 2,
    number: 2,
    team1: { name: 'Argentina', flag: '🇦🇷' },
    team2: { name: 'Austria', flag: '🇦🇹' },
    date: 'Lunes 22 de junio',
    city: 'Dallas',
    time: { local: '13:00 h (AR)', venue: '10:00 h (DL)' },
    stage: 'groups',
    group: 'A'
  },
  {
    id: 3,
    number: 3,
    team1: { name: 'Pendiente', flag: null },
    team2: { name: 'A definir', flag: null },
    date: 'Viernes 20 de junio',
    city: 'Vélez',
    time: { local: '18:00 h (AR)', venue: '18:00 h (VEL)' },
    stage: 'groups',
    group: 'B'
  },
  {
    id: 4,
    number: 4,
    team1: { name: 'A definir', flag: null },
    team2: { name: 'A definir', flag: null },
    date: 'Jueves 26 de junio',
    city: 'Vélez',
    time: { local: '16:30 h (AR)', venue: '16:30 h (VEL)' },
    stage: 'elimination',
    phase: '16avos'
  },
  {
    id: 5,
    number: 5,
    team1: { name: 'A definir', flag: null },
    team2: { name: 'A definir', flag: null },
    date: 'Viernes 27 de junio',
    city: 'River Plate',
    time: { local: '19:00 h (AR)', venue: '19:00 h (RP)' },
    stage: 'elimination',
    phase: 'Octavos'
  },
  {
    id: 6,
    number: 6,
    team1: { name: 'A definir', flag: null },
    team2: { name: 'A definir', flag: null },
    date: 'Sábado 28 de junio',
    city: 'River Plate',
    time: { local: '21:00 h (AR)', venue: '21:00 h (RP)' },
    stage: 'elimination',
    phase: 'Cuartos'
  },
  {
    id: 7,
    number: 7,
    team1: { name: 'A definir', flag: null },
    team2: { name: 'A definir', flag: null },
    date: 'Domingo 29 de junio',
    city: 'Vélez',
    time: { local: '20:00 h (AR)', venue: '20:00 h (VEL)' },
    stage: 'elimination',
    phase: 'Semi'
  }
];

const MOCK_MATCHES_WITHOUT_PENDING = [
  {
    id: 1,
    number: 1,
    team1: { name: 'Argentina', flag: '🇦🇷' },
    team2: { name: 'Algeria', flag: '🇩🇿' },
    date: 'Martes 16 de junio',
    city: 'Kansas city',
    time: { local: '21:00 h (AR)', venue: '18:00 h (KCK)' },
    stage: 'groups',
    group: 'A'
  },
  {
    id: 2,
    number: 2,
    team1: { name: 'Argentina', flag: '🇦🇷' },
    team2: { name: 'Austria', flag: '🇦🇹' },
    date: 'Lunes 22 de junio',
    city: 'Dallas',
    time: { local: '13:00 h (AR)', venue: '10:00 h (DL)' },
    stage: 'groups',
    group: 'A'
  },
  {
    id: 3,
    number: 1,
    team1: { name: 'A definir', flag: null },
    team2: { name: 'A definir', flag: null },
    date: 'Jueves 26 de junio',
    city: 'Vélez',
    time: { local: '16:30 h (AR)', venue: '16:30 h (VEL)' },
    stage: 'elimination',
    phase: '16avos'
  },
  {
    id: 4,
    number: 2,
    team1: { name: 'A definir', flag: null },
    team2: { name: 'A definir', flag: null },
    date: 'Viernes 27 de junio',
    city: 'River Plate',
    time: { local: '19:00 h (AR)', venue: '19:00 h (RP)' },
    stage: 'elimination',
    phase: 'Octavos'
  },
  {
    id: 5,
    number: 3,
    team1: { name: 'A definir', flag: null },
    team2: { name: 'A definir', flag: null },
    date: 'Sábado 28 de junio',
    city: 'River Plate',
    time: { local: '21:00 h (AR)', venue: '21:00 h (RP)' },
    stage: 'elimination',
    phase: 'Cuartos'
  },
  {
    id: 6,
    number: 4,
    team1: { name: 'A definir', flag: null },
    team2: { name: 'A definir', flag: null },
    date: 'Domingo 29 de junio',
    city: 'Vélez',
    time: { local: '20:00 h (AR)', venue: '20:00 h (VEL)' },
    stage: 'elimination',
    phase: 'Semi'
  }
];

const MOCK_MATCHES_FINISHED = [
  {
    id: 1,
    number: 1,
    team1: { name: 'Argentina', flag: '🇦🇷', score: 5 },
    team2: { name: 'Argelia', flag: '🇩🇿', score: 1 },
    city: 'Kansas city',
    date: 'Martes 16 de junio',
    time: { local: '21:00 h (AR)', venue: '18:00 h (KCK)' },
    stage: 'groups',
    group: 'A',
    finished: true
  },
  {
    id: 2,
    number: 2,
    team1: { name: 'Argentina', flag: '🇦🇷', score: 6 },
    team2: { name: 'Austria', flag: '🇦🇹', score: 2 },
    city: 'Dallas',
    date: 'Lunes 22 de junio',
    time: { local: '13:00 h (AR)', venue: '10:00 h (DL)' },
    stage: 'groups',
    group: 'A',
    finished: true
  },
  {
    id: 3,
    number: 3,
    team1: { name: 'Jordania', flag: '🇯🇴', score: 3 },
    team2: { name: 'Argentina', flag: '🇦🇷', score: 7 },
    city: 'Dallas',
    date: 'Sábado 27 de junio',
    time: { local: '22:00 h (AR)', venue: '19:00 h (DL)' },
    stage: 'groups',
    group: 'A',
    finished: true
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

  APP_STATE.map = new google.maps.Map(mapElement, MAP_CONFIG);

  APP_STATE.map.addListener('zoom_changed', () => {
    console.log('Zoom level:', APP_STATE.map.getZoom());
  });
  
  await createMarkers();
  console.log('✅ Map initialized');
};

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
    <img 
      src="https://assistcdn.s3.us-west-1.amazonaws.com/assets/wc2026/a365pin.svg" 
      alt="\${venue.name}"
      class="w-auto h-auto"
    />
    <div class="px-3 py-1">
      <span class="text-text-decorative-darker font-bold text-sm whitespace-nowrap">\${venue.name}</span>
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
      class="bg-white rounded-xl px-4 py-3 flex items-center gap-3 w-full lg:w-[150px] hover:shadow-md transition-shadow"
    >
      <span class="text-[32px] leading-none">\${team.flag}</span>
      <span class="font-semibold text-default text-base">\${team.name}</span>
    </button>
  \`).join('');
}

function populateOtherTeamSelect() {
  initCustomSelect('other-team-select', TEAMS, 'Otro equipo', (option) => {
    handleTeamSelect(option.id);
  });
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
    sidePanel.classList.remove('lg:bg-[url(https://assistcdn.s3.us-west-1.amazonaws.com/assets/wc2026/BallWidthDots.svg)]', 'bg-no-repeat', 'bg-top', 'bg-contain');
  } else {
    initialState.classList.remove('hidden');
    selectedState.classList.add('hidden');
    sidePanel.classList.add('lg:bg-[url(https://assistcdn.s3.us-west-1.amazonaws.com/assets/wc2026/BallWidthDots.svg)]', 'bg-no-repeat', 'bg-top', 'bg-contain');
  }
}

function showSelectionControls() {
  const controls = document.getElementById('selection-controls');
  if (!controls) return;
  controls.classList.remove('hidden');
  populateSelects();
}

function populateSelects() {
  initCustomSelect('team-select', TEAMS, 'Seleccioná tu equipo', (option) => {
    handleTeamSelect(option.id);
  }, APP_STATE.selectedTeam?.id);

  initCustomSelect('city-select', VENUES, 'Seleccioná sede', (option) => {
    APP_STATE.selectedCity = option;
    if (APP_STATE.map) {
      APP_STATE.map.panTo({ lat: option.lat, lng: option.lng });
      APP_STATE.map.setZoom(10);
    }
  });
}

/**
 * Initialize Tom Select on a select element
 * @param {string} selectId - ID of the select element
 * @param {Array} options - Array of options
 * @param {string} placeholder - Placeholder text
 * @param {Function} onChange - Callback when selection changes
 * @param {string|null} selectedValue - Initial selected value
 */
function initCustomSelect(selectId, options, placeholder, onChange, selectedValue = null) {
  const selectElement = document.getElementById(selectId);
  if (!selectElement) return;

  // Configure Tom Select
  const tomSelect = new TomSelect(\`#\${selectId}\`, {
    valueField: 'id',
    labelField: 'name',
    searchField: 'name',
    options: options,
    placeholder: placeholder,
    create: false,
    maxItems: 1,
    allowEmptyOption: false,
    closeAfterSelect: true,
    
    // Custom rendering with flags
    render: {
      option: function(data, escape) {
        return \`
          <div class="flex items-center gap-2 p-2">
            \${data.flag ? \`<span class="text-xl">\${data.flag}</span>\` : ''}
            <span>\${escape(data.name)}</span>
          </div>
        \`;
      },
      item: function(data, escape) {
        return \`
          <div class="flex items-center gap-2">
            \${data.flag ? \`<span class="text-xl">\${data.flag}</span>\` : ''}
            <span>\${escape(data.name)}</span>
          </div>
        \`;
      }
    },
    
    // Handle selection change
    onChange: function(value) {
      if (!value) return;
      const selectedOption = options.find(opt => String(opt.id) === String(value));
      if (selectedOption && onChange) {
        onChange(selectedOption);
      }
    }
  });

  // Set initial value if provided
  if (selectedValue) {
    tomSelect.setValue(selectedValue, true);
  }

  return tomSelect;
}

function populateMatchCards() {
  const container = document.getElementById('match-cards');
  if (!container) return;

  container.innerHTML = MOCK_MATCHES.map(match => renderMatchCard(match)).join('');
}

function renderMatchCard(match) {
  const finishedBadge = match.finished ? \`
    <div class="absolute right-8 -top-[6px]">
      <div class="bg-success-primary text-white text-sm font-normal px-2 py-1 rounded-full whitespace-nowrap" style="font-family: 'Titillium Web', sans-serif; line-height: 20px;">
        Finalizado
      </div>
    </div>
  \` : '';

  const phaseBadge = match.phase ? \`
    <div class="absolute right-8 -top-[6px]">
      <div class="bg-bg-alt-secondary text-white text-sm font-normal px-2 py-1 rounded-full whitespace-nowrap" style="font-family: 'Titillium Web', sans-serif; line-height: 20px;">
        \${match.phase}
      </div>
    </div>
  \` : '';

  const teamDisplay = match.finished 
    ? \`\${match.team1.name} \${match.team1.score} - \${match.team2.score} \${match.team2.name}\`
    : \`\${match.team1.name} - \${match.team2.name}\`;

  const flagPlaceholder = \`
    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="15" viewBox="0 0 21 15" fill="none">
      <path d="M19 0.5H2C1.17157 0.5 0.5 1.17157 0.5 2V13C0.5 13.8284 1.17157 14.5 2 14.5H19C19.8284 14.5 20.5 13.8284 20.5 13V2C20.5 1.17157 19.8284 0.5 19 0.5Z" fill="#DDDDDD" stroke="black" stroke-opacity="0.1"/>
    </svg>
  \`;

  return \`
    <div class="bg-white border border-border-primary rounded-xl px-3 py-4 flex flex-col gap-4 relative overflow-visible">
      <div class="absolute right-[7px] -top-[3px] w-5 h-5">
        <svg width="20" height="20" viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="10" fill="#006FE8"/>
          <text x="10" y="14" text-anchor="middle" fill="white" class="text-xs font-semibold" style="font-family: 'Titillium Web', sans-serif;">\${match.number}</text>
        </svg>
      </div>
      \${finishedBadge}
      \${phaseBadge}
      <div class="flex items-center gap-2">
        \${match.team1.flag ? \`<span class="text-xl">\${match.team1.flag}</span>\` : flagPlaceholder}
        <p class="text-base font-semibold text-text-default" style="font-family: 'Titillium Web', sans-serif;">\${teamDisplay}</p>
        \${match.team2.flag ? \`<span class="text-xl">\${match.team2.flag}</span>\` : flagPlaceholder}
      </div>
      <div class="flex flex-col gap-2">
        <div class="flex items-start gap-4">
          <div class="flex items-center gap-2">
            <i class="ph ph-calendar" style="font-size: 20px; color: #7BD0C2;"></i>
            <p class="text-base text-text-default" style="font-family: 'Titillium Web', sans-serif;">\${match.date}</p>
          </div>
          <div class="flex items-center gap-2">
            <i class="ph ph-map-pin" style="font-size: 20px; color: #7BD0C2;"></i>
            <p class="text-base text-text-default" style="font-family: 'Titillium Web', sans-serif;">\${match.city}</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <i class="ph ph-clock" style="font-size: 20px; color: #7BD0C2;"></i>
          <p class="text-base text-text-default" style="font-family: 'Titillium Web', sans-serif;">\${match.time.local} - \${match.time.venue}</p>
        </div>
      </div>
    </div>
  \`;
}

function renderMatchesContainer(matches, initialTab = 'groups') {
  const groupMatches = matches.filter(m => m.stage === 'groups');
  const eliminationMatches = matches.filter(m => m.stage === 'elimination');
  
  // Position selector para tab de eliminación
  const positionSelect = initialTab === 'elimination' ? \`
    <div class="mb-4">
      <div class="relative pt-1 w-full">
        <div class="custom-select position-select">
          <div class="custom-select-selected bg-white border border-border-primary rounded-xl p-3 text-base font-normal flex items-center justify-between cursor-pointer" tabindex="0">
            <span class="select-value text-text-default">Primer puesto</span>
            <div class="select-chevron">
              <i class="ph-bold ph-caret-down" style="font-size: 20px; color: #31363A;"></i>
            </div>
          </div>
          <div class="custom-select-items bg-white z-50 w-full rounded-xl shadow-lg overflow-y-auto absolute mt-1 top-full hidden" style="max-height: 256px;">
            <div class="custom-select-item selected" data-value="1st">
              <span>Primer puesto</span>
            </div>
            <div class="custom-select-item" data-value="2nd">
              <span>Segundo puesto</span>
            </div>
            <div class="custom-select-item" data-value="3rd">
              <span>Tercer puesto</span>
            </div>
            <div class="custom-select-item" data-value="4th">
              <span>Cuarto puesto</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  \` : '';
  
  return \`
    <div class="flex gap-2 mb-6">
      <button 
        data-tab="groups" 
        class="border-2 \${initialTab === 'groups' ? 'border-brand-primary text-text-default' : 'border-border-primary text-text-lighter'} font-semibold rounded-full px-4 py-[10px] text-lg transition-all duration-300 cursor-pointer"
        style="font-family: 'Titillium Web', sans-serif;"
      >
        Grupos
      </button>
      <button 
        data-tab="elimination" 
        class="border-2 \${initialTab === 'elimination' ? 'border-brand-primary text-text-default' : 'border-border-primary text-text-lighter'} font-semibold rounded-full px-4 py-[10px] text-lg transition-all duration-300 cursor-pointer"
        style="font-family: 'Titillium Web', sans-serif;"
      >
        Eliminación
      </button>
    </div>
    \${positionSelect}
    <div class="flex flex-col gap-3 pt-3 overflow-y-auto">
      \${(initialTab === 'groups' ? groupMatches : eliminationMatches).map(m => renderMatchCard(m)).join('')}
    </div>
  \`;
}

function renderFinalPathBanner() {
  return \`
    <div class="flex gap-2 mb-6">
      <button class="border-2 border-border-primary text-text-lighter font-semibold rounded-full px-4 py-[10px] text-lg" style="font-family: 'Titillium Web', sans-serif;">
        Grupos
      </button>
      <button class="border-2 border-brand-primary text-text-default font-semibold rounded-full px-4 py-[10px] text-lg" style="font-family: 'Titillium Web', sans-serif;">
        Eliminación
      </button>
    </div>
    <div class="bg-white border pb-8 border-border-primary rounded-xl p-4 flex flex-col gap-6 items-center w-full max-w-full">
      <div class="bg-brand-comp-lilac mt-4 rounded-full w-[50px] h-[50px] flex items-center justify-center">
        <i class="ph-duotone ph-trophy" style="font-size: 32px; color: #31319B;"></i>
      </div>
      <div class="flex flex-col gap-4 w-full">
        <p class="text-xl font-semibold text-default text-center leading-7" style="font-family: 'Titillium Web', sans-serif;">
          Mirá cómo sería el camino a la final
        </p>
        <p class="text-base text-default text-center leading-6" style="font-family: 'Titillium Web', sans-serif;">
          Si en la fase de grupos quedamos:
        </p>
        <div class="flex items-center justify-between lg:justify-center w-full gap-2">
          <button class="bg-action-alt-default text-default hover:bg-action-alt-hover active:bg-action-alt-pressed focus:bg-action-alt-default focus:ring-icon-lighter focus:ring-4 focus:outline-none w-full lg:w-fit px-4 py-[10px] h-[48px] text-lg font-semibold rounded-xl transition-all duration-300" style="font-family: 'Titillium Web', sans-serif;">
            Primeros
          </button>
          <button class="bg-action-alt-default text-default hover:bg-action-alt-hover active:bg-action-alt-pressed focus:bg-action-alt-default focus:ring-icon-lighter focus:ring-4 focus:outline-none w-full lg:w-fit px-4 py-[10px] h-[48px] text-lg font-semibold rounded-xl transition-all duration-300" style="font-family: 'Titillium Web', sans-serif;">
            Segundos
          </button>
          <button class="bg-action-alt-default text-default hover:bg-action-alt-hover active:bg-action-alt-pressed focus:bg-action-alt-default focus:ring-icon-lighter focus:ring-4 focus:outline-none w-full lg:w-fit px-4 py-[10px] h-[48px] text-lg font-semibold rounded-xl transition-all duration-300" style="font-family: 'Titillium Web', sans-serif;">
            Terceros
          </button>
        </div>
      </div>
    </div>
  \`;
}

function renderPendingDefinitionBanner() {
  return \`
    <div class="bg-white border border-border-primary rounded-xl px-4 py-8 flex flex-col gap-6 items-center">
      <div class="bg-brand-comp-lilac rounded-full w-[50px] h-[50px] flex items-center justify-center">
        <i class="ph-duotone ph-clock-countdown" style="font-size: 32px; color: #31319B;"></i>
      </div>
      <div class="flex flex-col gap-4 w-full text-center">
        <p class="text-xl font-semibold text-default leading-7" style="font-family: 'Titillium Web', sans-serif;">
          Todavía está por definirse
        </p>
        <p class="text-base text-default leading-6" style="font-family: 'Titillium Web', sans-serif;">
          Los partidos se definirán según los resultados de la etapa de grupos.
        </p>
      </div>
    </div>
  \`;
}

function initPositionSelects() {
  document.querySelectorAll('.position-select').forEach(selectContainer => {
    const selectedDiv = selectContainer.querySelector('.custom-select-selected');
    const itemsDiv = selectContainer.querySelector('.custom-select-items');
    const valueSpan = selectContainer.querySelector('.select-value');

    // Toggle dropdown
    selectedDiv.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = !itemsDiv.classList.contains('hidden');
      
      // Close all other dropdowns
      document.querySelectorAll('.custom-select-items').forEach(dropdown => {
        dropdown.classList.add('hidden');
      });

      if (!isOpen) {
        itemsDiv.classList.remove('hidden');
      }
    });

    // Handle option selection
    itemsDiv.addEventListener('click', (e) => {
      const item = e.target.closest('.custom-select-item');
      if (!item) return;

      const value = item.dataset.value;
      
      // Update display
      valueSpan.textContent = item.querySelector('span').textContent;

      // Update selected state
      itemsDiv.querySelectorAll('.custom-select-item').forEach(i => i.classList.remove('selected'));
      item.classList.add('selected');

      // Close dropdown
      itemsDiv.classList.add('hidden');

      console.log('\uD83D\uDCCA Position selected:', value);
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!selectContainer.contains(e.target)) {
        itemsDiv.classList.add('hidden');
      }
    });
  });
}

function initAllSections() {
  // Section 2: All matches
  const section2 = document.getElementById('matches-section-2');
  if (section2) {
    section2.innerHTML = renderMatchesContainer(MOCK_MATCHES, 'groups');
  }

  // Section 3: Final Path Banner
  const section3 = document.getElementById('final-path-banner');
  if (section3) {
    section3.innerHTML = renderFinalPathBanner();
  }

  // Section 4: Matches without pending (elimination tab)
  const section4 = document.getElementById('matches-section-4');
  if (section4) {
    section4.innerHTML = renderMatchesContainer(MOCK_MATCHES_WITHOUT_PENDING, 'elimination');
  }

  // Section 5: Pending Definition Banner
  const section5 = document.getElementById('pending-banner');
  if (section5) {
    section5.innerHTML = renderPendingDefinitionBanner();
  }

  // Section 6: Finished Matches
  const section6 = document.getElementById('matches-finished');
  if (section6) {
    section6.innerHTML = renderMatchesContainer(MOCK_MATCHES_FINISHED, 'groups');
  }

  // Initialize position selects after rendering
  initPositionSelects();
}

function initChipsNav() {
  const chips = document.querySelectorAll('#chips-nav button');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      APP_STATE.activeTab = chip.dataset.tab;
      chips.forEach(c => {
        if (c.dataset.tab === APP_STATE.activeTab) {
          c.classList.add('border-brand-primary', 'text-text-default');
          c.classList.remove('border-border-primary', 'text-text-lighter');
        } else {
          c.classList.remove('border-brand-primary', 'text-text-default');
          c.classList.add('border-border-primary', 'text-text-lighter');
        }
      });
      console.log('📑 Tab:', APP_STATE.activeTab);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 World Cup 2026 Map - Vanilla Edition');
  populateTeamsGrid();
  populateOtherTeamSelect();
  initChipsNav();
  initAllSections();
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
    
    <!-- Tom Select -->
    <link href="https://cdn.jsdelivr.net/npm/tom-select@2.3.1/dist/css/tom-select.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/tom-select@2.3.1/dist/js/tom-select.complete.min.js"></script>
    
    <title>World Cup Map 2026</title>
    
    <!-- Styles -->
    <link rel="stylesheet" href="assets/styles.css" />
  </head>
  
  <body class="bg-bg-secondary">
    <div class="w-full min-h-screen flex flex-col bg-bg-secondary pb-32">
      
      <!-- Header -->
      <header class="bg-white w-full">
        <div class="flex items-center justify-between w-full max-w-[358px] md:max-w-[548px] lg:max-w-[1200px] mx-auto py-3">
          <!-- Flecha de regreso (mobile/tablet only) -->
          <button 
            onclick="window.history.back()" 
            class="text-action-default block lg:hidden"
            aria-label="Volver"
          >
            <i class="ph ph-arrow-left" style="font-size: 24px; font-weight: bold;"></i>
          </button>

          <!-- Logo + Soccer Ball + Título -->
          <div class="flex w-fit items-center">
            <!-- Logo desktop -->
            <img
              class="hidden lg:block"
              src="https://assistcdn.s3.us-west-1.amazonaws.com/assets/site/home/img/brand/a365_logo_xa.svg"
              alt="A365 Logo"
            />
            
            <!-- Logo mobile/tablet -->
            <img
              class="block lg:hidden"
              src="https://assistcdn.s3.us-west-1.amazonaws.com/assets/site/home/img/brand/Assist-logo.svg"
              alt="Assist365"
            />

            <!-- Gradiente para Soccer Ball -->
            <svg width="0" height="0" class="absolute">
              <defs>
                <linearGradient id="soccerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#59D3C2" stop-opacity="1" />
                  <stop offset="100%" stop-color="#006FE8" stop-opacity="1" />
                </linearGradient>
              </defs>
            </svg>
            
            <!-- Soccer Ball responsive (mobile: 24px, desktop: 32px) -->
            <i class="ph-duotone ph-soccer-ball block lg:hidden" style="font-size: 24px; background: linear-gradient(180deg, #59D3C2 0%, #006FE8 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;"></i>
            <i class="ph-duotone ph-soccer-ball hidden lg:block" style="font-size: 32px; background: linear-gradient(180deg, #59D3C2 0%, #006FE8 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;"></i>
            
            <!-- Título responsive -->
            <h1 class="text-base lg:text-xl font-semibold text-text-decorative-darker">
              World Cup Map 2026
            </h1>
          </div>

          <!-- Botón Compartir con texto responsive -->
          <button class="inline-flex items-center justify-center gap-2 px-4 py-2 h-10 text-base font-semibold rounded-xl bg-brand-primary text-white hover:bg-bg-alt-secondary transition-colors">
            <span class="hidden lg:inline">Compartir</span>
            <i class="ph ph-share-network" style="font-size: 16px; font-weight: bold;"></i>
          </button>
        </div>
      </header>

      <!-- Selection Controls (shown when team selected) -->
      <div id="selection-controls" class="w-full max-w-[1366px] mx-auto mt-6">
        <div class="w-full max-w-[834px] lg:max-w-[1200px] mx-auto">
          <div class="w-full flex items-end justify-center lg:justify-between gap-4 lg:gap-6 lg:mt-6 lg:mb-8 font-semibold mx-auto">
            <div class="flex gap-x-2 items-center">
              <span class="text-text-default text-xl pr-4 hidden lg:block">Soy fan de:</span>
              <div class="relative pt-1 w-[200px] lg:w-80">
                <select id="team-select" placeholder="Seleccioná tu equipo"></select>
              </div>
            </div>
            <div class="flex gap-x-2 items-center lg:hidden">
              <div class="relative pt-1 w-[200px] lg:w-80">
                <select id="city-select" placeholder="Seleccioná sede"></select>
              </div>
            </div>
            <button class="hidden lg:flex items-center gap-2 px-4 py-2 h-10 text-base font-semibold rounded-xl border-2 border-brand-primary text-brand-primary hover:border-bg-alt-secondary hover:text-bg-alt-secondary active:border-action-pressed active:text-action-pressed focus:outline-none focus:ring-4 focus:ring-border-primary transition-all duration-300">
              <i class="ph ph-map-pin-area" style="font-size: 16px; font-weight: bold;"></i>
              Explorar sedes
            </button>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="w-full max-w-[1366px] mx-auto mt-8">
        <div class="w-full max-w-[834px] lg:max-w-[1200px] mx-auto flex flex-col gap-y-8">
          
          <!-- SECTION 1: Map + Side Panel Container -->
          <div class="gap-6 w-full flex flex-col lg:flex-row justify-center bg-bg-secondary">
            <div class="rounded-2xl overflow-hidden w-full lg:w-[715px] h-[640px]">
              <div id="map" class="w-full h-full"></div>
            </div>

            <div class="bg-brand-darkening w-full lg:max-w-[467px]">
              <div id="side-panel" class="mx-auto lg:mx-0 rounded-l-xl flex flex-col lg:px-4 pt-4 lg:pt-6 lg:p-6 w-full max-w-[368px] lg:max-w-full lg:w-[467px] h-[640px] lg:bg-[url(https://assistcdn.s3.us-west-1.amazonaws.com/assets/wc2026/BallWidthDots.svg)] bg-no-repeat bg-top bg-contain">
                <div id="initial-state">
                  <div class="max-w-[360px] lg:max-w-[316px] w-full mx-auto">
                    <div class="flex flex-col mb-6 mt-6 lg:mt-32 pt-2">
                      <h2 class="text-xl lg:text-2xl font-semibold text-text-decorative-darker leading-snug" style="font-family: 'Titillium Web', sans-serif;">
                        Seleccioná tu equipo y explorá el camino a la final
                      </h2>
                    </div>
                    <div id="teams-grid" class="grid grid-cols-2 gap-4 w-full">
                      <!-- Teams populated by JavaScript -->
                    </div>
                    <div class="mt-6">
                      <div class="relative pt-1 w-full">
                        <select id="other-team-select" placeholder="Otro equipo"></select>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="selected-state" class="hidden">
                  <div id="chips-nav" class="flex gap-2 mb-6">
                  <button 
                    data-tab="groups" 
                    class="border-2 border-brand-primary text-text-default font-semibold rounded-full px-4 py-[10px] text-lg transition-all duration-300 cursor-pointer"
                    style="font-family: 'Titillium Web', sans-serif;"
                  >
                    Grupos
                  </button>
                  <button 
                    data-tab="elimination" 
                    class="border-2 border-border-primary text-text-lighter font-semibold rounded-full px-4 py-[10px] text-lg transition-all duration-300 cursor-pointer hover:border-brand-primary hover:text-text-default"
                    style="font-family: 'Titillium Web', sans-serif;"
                  >
                    Eliminación
                  </button>
                </div>
                <div id="match-cards" class="flex flex-col gap-3 pt-3 overflow-y-auto">
                  <!-- Match cards populated by JavaScript -->
                </div>
              </div>
            </div>
            </div>
          </div>

          <!-- SECTION 2: Placeholder + All Matches -->
          <div class="gap-6 w-full flex flex-col lg:flex-row items-center lg:items-start justify-center bg-bg-secondary">
            <div class="text-2xl">
              <img src="https://placehold.co/715x640" alt="Placeholder" class="w-full lg:w-auto" />
            </div>
            <div class="bg-brand-darkening w-full lg:max-w-[467px]">
              <div id="matches-section-2" class="mx-auto lg:mx-0 rounded-l-xl flex flex-col lg:px-4 pt-4 lg:pt-6 lg:p-6 w-full max-w-[368px] lg:max-w-full lg:w-[467px] h-[640px]">
                <!-- Populated by JavaScript -->
              </div>
            </div>
          </div>

          <!-- SECTION 3: Placeholder + Final Path Banner -->
          <div class="gap-6 w-full flex flex-col lg:flex-row items-center lg:items-start justify-center bg-[#F2F2F2]">
            <div class="text-2xl">
              <img src="https://placehold.co/715x640" alt="Placeholder" class="w-full lg:w-auto" />
            </div>
            <div class="bg-brand-darkening w-full lg:max-w-[467px]">
              <div id="final-path-banner" class="mx-auto lg:mx-0 rounded-l-xl flex flex-col lg:px-4 pt-4 lg:pt-6 lg:p-6 w-full max-w-[368px] lg:max-w-full lg:w-[467px] h-[640px]">
                <!-- Populated by JavaScript -->
              </div>
            </div>
          </div>

          <!-- SECTION 4: Placeholder + Matches Without Pending (Elimination) -->
          <div class="gap-6 w-full flex flex-col lg:flex-row items-center lg:items-start justify-center bg-[#F2F2F2]">
            <div class="text-2xl">
              <img src="https://placehold.co/715x640" alt="Placeholder" class="w-full lg:w-auto" />
            </div>
            <div class="bg-brand-darkening w-full lg:max-w-[467px]">
              <div id="matches-section-4" class="mx-auto lg:mx-0 rounded-l-xl flex flex-col lg:px-4 pt-4 lg:pt-6 lg:p-6 w-full max-w-[368px] lg:max-w-full lg:w-[467px] h-[640px]">
                <!-- Populated by JavaScript -->
              </div>
            </div>
          </div>

          <!-- SECTION 5: Placeholder + Pending Definition Banner -->
          <div class="gap-6 w-full flex flex-col lg:flex-row items-center lg:items-start justify-center bg-[#F2F2F2]">
            <div class="text-2xl">
              <img src="https://placehold.co/715x640" alt="Placeholder" class="w-full lg:w-auto" />
            </div>
            <div class="bg-brand-darkening w-full lg:max-w-[467px]">
              <div id="pending-banner" class="mx-auto lg:mx-0 rounded-l-xl flex flex-col lg:px-4 pt-4 lg:pt-6 lg:p-6 w-full max-w-[368px] lg:max-w-full lg:w-[467px] h-[640px]">
                <!-- Populated by JavaScript -->
              </div>
            </div>
          </div>

          <!-- SECTION 6: Placeholder + Finished Matches -->
          <div class="gap-6 w-full flex flex-col lg:flex-row items-center lg:items-start justify-center bg-[#F2F2F2]">
            <div class="text-2xl">
              <img src="https://placehold.co/715x640" alt="Placeholder" class="w-full lg:w-auto" />
            </div>
            <div class="bg-brand-darkening w-full lg:max-w-[467px]">
              <div id="matches-finished" class="mx-auto lg:mx-0 rounded-l-xl flex flex-col lg:px-4 pt-4 lg:pt-6 lg:p-6 w-full max-w-[368px] lg:max-w-full lg:w-[467px] h-[640px]">
                <!-- Populated by JavaScript -->
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
