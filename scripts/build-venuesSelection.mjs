import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🗺️  Generando VenuesSelection Template (HTML + CSS)...\n');

const distPath = path.join(__dirname, '..', 'dist-vanilla');

// 1. Crear carpeta si no existe
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath, { recursive: true });
}
if (!fs.existsSync(path.join(distPath, 'assets'))) {
  fs.mkdirSync(path.join(distPath, 'assets'));
}

console.log('📝 Generando venuesSelection.html...\n');

// ============================================================================
// DATOS - VENUES (importados de mapConfig.js)
// ============================================================================

const VENUES = [
  { id: 'miami', name: 'Miami', country: 'USA', stadium: 'Hard Rock Stadium', coordinates: { lat: 25.7617, lng: -80.1918 } },
  { id: 'new-york', name: 'New York', country: 'USA', stadium: 'MetLife Stadium', coordinates: { lat: 40.7128, lng: -74.0060 } },
  { id: 'los-angeles', name: 'Los Angeles', country: 'USA', stadium: 'SoFi Stadium', coordinates: { lat: 34.0522, lng: -118.2437 } },
  { id: 'dallas', name: 'Dallas', country: 'USA', stadium: 'AT&T Stadium', coordinates: { lat: 32.7767, lng: -96.7970 } },
  { id: 'kansas-city', name: 'Kansas City', country: 'USA', stadium: 'Arrowhead Stadium', coordinates: { lat: 39.0997, lng: -94.5786 } },
  { id: 'philadelphia', name: 'Philadelphia', country: 'USA', stadium: 'Lincoln Financial Field', coordinates: { lat: 39.9526, lng: -75.1652 } },
  { id: 'atlanta', name: 'Atlanta', country: 'USA', stadium: 'Mercedes-Benz Stadium', coordinates: { lat: 33.7490, lng: -84.3880 } },
  { id: 'seattle', name: 'Seattle', country: 'USA', stadium: 'Lumen Field', coordinates: { lat: 47.6062, lng: -122.3321 } },
  { id: 'san-francisco', name: 'San Francisco', country: 'USA', stadium: 'Levi\'s Stadium', coordinates: { lat: 37.7749, lng: -122.4194 } },
  { id: 'boston', name: 'Boston', country: 'USA', stadium: 'Gillette Stadium', coordinates: { lat: 42.3601, lng: -71.0589 } },
  { id: 'houston', name: 'Houston', country: 'USA', stadium: 'NRG Stadium', coordinates: { lat: 29.7604, lng: -95.3698 } },
  { id: 'ciudad-de-mexico', name: 'Ciudad de México', country: 'México', stadium: 'Estadio Azteca', coordinates: { lat: 19.4326, lng: -99.1332 } },
  { id: 'monterrey', name: 'Monterrey', country: 'México', stadium: 'Estadio BBVA', coordinates: { lat: 25.6866, lng: -100.3161 } },
  { id: 'guadalajara', name: 'Guadalajara', country: 'México', stadium: 'Estadio Akron', coordinates: { lat: 20.6597, lng: -103.3496 } },
  { id: 'toronto', name: 'Toronto', country: 'Canadá', stadium: 'BMO Field', coordinates: { lat: 43.6532, lng: -79.3832 } },
  { id: 'vancouver', name: 'Vancouver', country: 'Canadá', stadium: 'BC Place', coordinates: { lat: 49.2827, lng: -123.1207 } },
];

// ============================================================================
// FUNCIONES HELPER PARA GENERAR HTML
// ============================================================================

function getCountryDisplay(country) {
  if (country === "USA") return "Estados Unidos";
  if (country === "México") return "México";
  if (country === "Canadá") return "Canadá";
  return country;
}

function generateHeaderBar() {
  return `
    <header class="bg-white w-full">
      <div class="flex items-center justify-between w-full max-w-[358px] md:max-w-[548px] lg:max-w-[1200px] mx-auto py-3">
        <!-- Flecha volver - Mobile/Tablet -->
        <button 
          onclick="goBackToMainpage()" 
          class="text-action-default block lg:hidden"
          aria-label="Volver a partidos"
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
        <button class="inline-flex items-center gap-2 px-4 py-2 h-10 text-base font-semibold rounded-xl bg-brand-primary text-white hover:bg-bg-alt-secondary transition-colors">
          <span class="hidden lg:inline">Compartir</span>
          <i class="ph ph-paper-plane-tilt" style="font-size: 16px; font-weight: bold;"></i>
        </button>
      </div>
    </header>
  `;
}

function generateVenueCard(venue) {
  const country = getCountryDisplay(venue.country);
  return `
    <button
      onclick="navigateToVenue('${venue.id}')"
      class="bg-bg-primary rounded-xl p-4 md:py-2 md:px-4 flex items-center gap-4 hover:shadow-md transition-shadow text-left w-full cursor-pointer"
    >
      <!-- Imagen ciudad -->
      <div class="w-[60px] h-[60px] md:w-[60px] md:h-[60px] lg:w-20 lg:h-20 rounded-xl bg-bg-secondary flex-shrink-0 overflow-hidden">
        <img 
          src="https://www.figma.com/api/mcp/asset/d572076a-02db-4aa8-86e5-8eb7985c131b" 
          alt="${venue.name}" 
          class="w-full h-full object-cover" 
        />
      </div>

      <!-- Información -->
      <div class="flex flex-col gap-0 flex-1 min-w-0">
        <span class="text-text-default text-sm font-normal font-titillium leading-5">
          ${country}
        </span>
        <span class="text-text-default text-xl font-semibold font-titillium leading-7">
          ${venue.name}
        </span>
      </div>
    </button>
  `;
}

function generateInlineJS() {
  return `
    <script>
      // Navegación a página de venue específica
      function navigateToVenue(venueId) {
        window.location.href = 'venues.html?city=' + venueId;
      }
      
      // Volver a mainpage
      function goBackToMainpage() {
        window.location.href = 'mainpage.html';
      }
    </script>
  `;
}

// ============================================================================
// GENERAR HTML COMPLETO
// ============================================================================

const venuesGrid = VENUES.map(venue => generateVenueCard(venue)).join('\n        ');

const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sedes - World Cup Map 2026</title>
  <link rel="stylesheet" href="assets/styles.css" />
  <link href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400;600;700&display=swap" rel="stylesheet" />
  <script src="https://unpkg.com/@phosphor-icons/web"></script>
</head>
<body class="bg-bg-secondary">
  <div class="w-full min-h-screen flex flex-col bg-bg-secondary">
    
    ${generateHeaderBar()}
    
    <!-- Contenido principal -->
    <div class="w-full max-w-[1366px] mx-auto px-4 md:px-0 lg:px-[64px]">
      
      <!-- Botón Volver - Desktop only -->
      <div class="hidden lg:block pt-4 pb-6">
        <button 
          onclick="goBackToMainpage()"
          class="whitespace-nowrap overflow-hidden text-ellipsis font-semibold rounded-xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-offset-0 text-lg py-[10px] h-[48px] px-4 w-full lg:w-fit text-brand-primary hover:text-bg-alt-secondary active:text-action-pressed focus:border-bg-alt-secondary focus:text-bg-alt-secondary focus:border-transparent focus:ring-border-primary focus:ring-opacity-100 flex items-center justify-center gap-2 cursor-pointer"
        >
          <i class="ph ph-caret-left flex-shrink-0" style="font-size: 20px; font-weight: bold;"></i>
          Volver a partidos
        </button>
      </div>
      
      <!-- Título -->
      <h1 class="text-text-default text-xl font-semibold font-titillium leading-7 mb-6 mt-6 lg:mt-0 max-w-[358px] md:max-w-[548px] lg:max-w-[511px] w-full mx-auto lg:ml-0">
        Elegí una sede y explorá el Mundial desde adentro
      </h1>
      
      <!-- Grid de Sedes -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-32 max-w-[358px] md:max-w-[548px] lg:max-w-none mx-auto lg:ml-0">
        ${venuesGrid}
      </div>
      
    </div>
  </div>
  
  ${generateInlineJS()}
</body>
</html>
`;

// ============================================================================
// ESCRIBIR ARCHIVO Y COMPILAR CSS
// ============================================================================

// 1. Escribir HTML
const venuesSelectionPath = path.join(distPath, 'venuesSelection.html');
fs.writeFileSync(venuesSelectionPath, html);

console.log('✅ venuesSelection.html generado\n');

// 2. Compilar Tailwind CSS (escanea TODOS los HTML en dist-vanilla/)
console.log('🎨 Compilando Tailwind CSS con todas las clases de todos los templates...');
try {
  execSync(
    'npx tailwindcss -i ./src/index.css -o ./dist-vanilla/assets/styles.css --minify',
    { stdio: 'inherit' }
  );
  console.log('✅ CSS compilado\n');
} catch (error) {
  console.error('❌ Error compilando CSS:', error.message);
  process.exit(1);
}

// 3. Reportar
console.log('📦 Archivos generados:\n');
console.log('  📝 venuesSelection.html (100% fiel al template React)');
console.log('  🎨 assets/styles.css (compartido con mainpage.html y venues.html)\n');

console.log('✅ Build VenuesSelection completado en: dist-vanilla/venuesSelection.html\n');
console.log('💡 Para ver: Abrí dist-vanilla/venuesSelection.html en el navegador\n');
console.log('🔗 Navegación: mainpage.html → venuesSelection.html → venues.html?city={id}\n');
