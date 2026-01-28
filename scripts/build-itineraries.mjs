import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🗺️  Generando Itineraries Template (HTML + CSS)...\n');

const distPath = path.join(__dirname, '..', 'dist-vanilla');

// 1. Crear carpeta si no existe
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath, { recursive: true });
}
if (!fs.existsSync(path.join(distPath, 'assets'))) {
  fs.mkdirSync(path.join(distPath, 'assets'));
}

console.log('📝 Generando itineraries.html...\n');

// ============================================================================
// Función para generar Header
// ============================================================================
function generateHeaderBar() {
  return `
    <!-- Header Bar -->
    <header class="w-full bg-white border-b border-border-primary">
      <div class="flex items-center justify-between w-full max-w-[358px] sm:max-w-[548px] lg:max-w-[1200px] mx-auto py-3 px-0 md:px-4">
        <!-- Back button (mobile/tablet only) -->
        <button onclick="window.location.href='mainpage.html'" class="text-action-default block lg:hidden" aria-label="Volver">
          <i class="ph ph-caret-left" style="font-size: 24px;"></i>
        </button>

        <!-- Logo Assist (mobile) -->
        <div class="block lg:hidden">
          <img src="https://assistcdn.s3.us-west-1.amazonaws.com/assets/img/wcm26/assist-logo.svg" alt="Assist 365" class="h-[50px]" />
        </div>

        <!-- Logo A365 + Soccer Ball (desktop) -->
        <div class="hidden lg:flex items-center gap-3">
          <img src="https://assistcdn.s3.us-west-1.amazonaws.com/assets/img/wcm26/a365-logo.svg" alt="A365" class="h-[50px]" />
          <i class="ph-duotone ph-soccer-ball block lg:hidden" style="font-size: 24px; background: linear-gradient(180deg, #59D3C2 0%, #006FE8 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;"></i>
          <i class="ph-duotone ph-soccer-ball hidden lg:block" style="font-size: 32px; background: linear-gradient(180deg, #59D3C2 0%, #006FE8 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;"></i>
          <span class="text-xl font-semibold text-text-decorative-darker">World Cup Map 2026</span>
        </div>

        <!-- Share button -->
        <button class="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-full font-semibold text-base hover:bg-brand-primary-hover transition-colors">
          <i class="ph ph-share-network" style="font-size: 20px;"></i>
          <span class="hidden lg:inline">Compartir</span>
        </button>
      </div>
    </header>
  `;
}

// ============================================================================
// HTML Template
// ============================================================================
const htmlTemplate = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Itinerarios - World Cup Map 2026</title>
  <link rel="stylesheet" href="assets/styles.css">
  
  <!-- Phosphor Icons -->
  <script src="https://unpkg.com/@phosphor-icons/web@2.1.1"></script>
  
  <!-- Leaflet CSS -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  
  <!-- Titillium Web Font -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300;400;600;700&display=swap" rel="stylesheet">
</head>
<body class="bg-bg-secondary">
  ${generateHeaderBar()}
  
  <main class="w-full max-w-[1366px] mx-auto lg:mt-4 px-4 pb-10">
    <div class="max-w-[1200px] mx-auto">
      
      <!-- Botón Volver (mobile) -->
      <button onclick="window.history.back()" class="flex items-center gap-2 text-action-default mb-4 lg:hidden">
        <i class="ph ph-caret-left" style="font-size: 20px;"></i>
        <span class="text-base font-semibold">Volver</span>
      </button>

      <!-- Botones de navegación (desktop) -->
      <div class="hidden lg:flex gap-4 mb-6">
        <button class="flex items-center gap-2 px-6 py-3 bg-brand-primary text-white rounded-full font-semibold text-base hover:bg-brand-primary-hover transition-colors">
          <i class="ph-duotone ph-map-pin" style="font-size: 20px;"></i>
          Explorar partidos
        </button>
        <button class="flex items-center gap-2 px-6 py-3 bg-brand-primary text-white rounded-full font-semibold text-base hover:bg-brand-primary-hover transition-colors">
          <i class="ph-duotone ph-map-pin" style="font-size: 20px;"></i>
          Explorar sedes
        </button>
      </div>

      <div class="max-w-[548px] lg:max-w-[996px] mx-auto">
        
        <!-- Título principal -->
        <h1 class="text-text-default text-2xl lg:text-3xl font-semibold pt-4 lg:pt-8 pb-4">
          Cómo moverte entre sedes durante el Mundial
        </h1>

        <!-- Subtítulo -->
        <p class="text-text-default text-lg lg:text-xl pb-6">
          Mirá cómo sería el camino a la final en cada fase:
        </p>

        <!-- Filtros de fase (chips) -->
        <div class="flex flex-wrap gap-2 lg:gap-4 mb-6">
          <button class="px-4 py-2 border-2 border-border-primary text-text-lighter rounded-full font-semibold text-lg hover:border-brand-primary hover:text-text-default transition-all">
            Grupos
          </button>
          <button class="px-4 py-2 border-2 border-brand-primary text-text-default rounded-full font-semibold text-lg transition-all">
            Fase final como 1ros
          </button>
          <button class="px-4 py-2 border-2 border-border-primary text-text-lighter rounded-full font-semibold text-lg hover:border-brand-primary hover:text-text-default transition-all">
            Fase final como 2dos
          </button>
          <button class="px-4 py-2 border-2 border-border-primary text-text-lighter rounded-full font-semibold text-lg hover:border-brand-primary hover:text-text-default transition-all">
            Fase final como 3ros?
          </button>
        </div>

        <!-- Mapa (placeholder) -->
        <div class="mb-6 bg-gray-200 rounded-3xl h-[448px] flex items-center justify-center">
          <p class="text-gray-500 text-lg">Mapa interactivo con ciudades numeradas</p>
        </div>

        <!-- Vuelo inicial -->
        <div class="bg-white border border-border-primary rounded-xl p-4 lg:p-6 mb-6">
          <div class="flex items-center justify-center gap-2 lg:gap-4 mb-4">
            <p class="text-lg lg:text-xl text-text-default font-medium">Ministro Pistarini Ezeiza (EZE)</p>
            <i class="ph ph-arrow-right text-icon-lighter" style="font-size: 20px;"></i>
            <p class="text-lg lg:text-xl text-text-default font-medium">Aeropuerto Internacional de Miami (MIA)</p>
          </div>
          <div class="flex flex-col gap-2">
            <div class="flex items-center justify-between">
              <div class="flex gap-10 items-center">
                <div class="flex gap-2 items-center">
                  <div class="w-6 h-6 bg-gray-300 rounded"></div>
                  <p class="text-sm text-text-default">Aerolinea</p>
                </div>
                <p class="text-sm text-text-lighter">16h 30min</p>
                <p class="text-sm text-text-lighter">Directo</p>
              </div>
              <p class="text-sm text-text-default">desde USD XXX</p>
            </div>
          </div>
        </div>

        <!-- Placeholder para match cards + vuelos -->
        <div class="bg-white border border-border-primary rounded-xl p-6 mb-6">
          <p class="text-gray-500">Itinerary Match Cards (5x) - Match + Badge + City + Flights</p>
        </div>

        <!-- Normativas de ingreso - 3 columnas -->
        <div class="bg-white border border-border-primary rounded-3xl p-4 lg:p-6 mb-10">
          <div class="grid lg:grid-cols-3 gap-6 lg:gap-8">
            <!-- Estados Unidos -->
            <div class="flex flex-col gap-2">
              <p class="text-xl font-semibold text-text-default">Normativas de Ingreso a Estados Unidos</p>
              <ul class="flex flex-col gap-1 list-disc ml-6">
                <li class="text-base text-text-default">Pasaporte vigente</li>
                <li class="text-base text-text-default">Visa o ESTA (según nacionalidad)</li>
                <li class="text-base text-text-default">Ticket de salida del país</li>
                <li class="text-base text-text-default">Seguro médico de viaje recomendado</li>
              </ul>
              <a href="https://travel.state.gov/" target="_blank" class="flex gap-1 items-center text-base font-semibold text-action-default hover:underline px-4 py-2 w-fit">
                Más info US gov
                <i class="ph ph-arrow-square-out" style="font-size: 16px;"></i>
              </a>
            </div>
            
            <!-- Canadá -->
            <div class="flex flex-col gap-2">
              <p class="text-xl font-semibold text-text-default">Normativas de Ingreso a Canadá</p>
              <ul class="flex flex-col gap-1 list-disc ml-6">
                <li class="text-base text-text-default">Pasaporte vigente</li>
                <li class="text-base text-text-default">Visa o eTA (según nacionalidad)</li>
                <li class="text-base text-text-default">Ticket de salida del país</li>
                <li class="text-base text-text-default">Seguro médico de viaje recomendado</li>
              </ul>
              <a href="https://www.canada.ca/" target="_blank" class="flex gap-1 items-center text-base font-semibold text-action-default hover:underline px-4 py-2 w-fit">
                Más info Canada.gov
                <i class="ph ph-arrow-square-out" style="font-size: 16px;"></i>
              </a>
            </div>
            
            <!-- México -->
            <div class="flex flex-col gap-2">
              <p class="text-xl font-semibold text-text-default">Normativas de Ingreso a México</p>
              <ul class="flex flex-col gap-1 list-disc ml-6">
                <li class="text-base text-text-default">Pasaporte vigente</li>
                <li class="text-base text-text-default">Visa o exención (según nacionalidad)</li>
                <li class="text-base text-text-default">FMM (Tarjeta de turista)</li>
                <li class="text-base text-text-default">Ticket de salida del país</li>
              </ul>
              <a href="https://www.gob.mx/" target="_blank" class="flex gap-1 items-center text-base font-semibold text-action-default hover:underline px-4 py-2 w-fit">
                Más info Mexico.gob
                <i class="ph ph-arrow-square-out" style="font-size: 16px;"></i>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Banner promocional (placeholder) -->
    <div class="w-full max-w-[548px] lg:max-w-full mx-auto mt-10 bg-gray-200 rounded-xl h-32 flex items-center justify-center">
      <p class="text-gray-500">Assist365 Banners Widget</p>
    </div>

    <!-- Grid de ciudades (placeholder) -->
    <div class="w-full max-w-[548px] lg:max-w-[996px] mx-auto mt-10 lg:mt-28 bg-gray-200 rounded-xl h-64 flex items-center justify-center">
      <p class="text-gray-500">Venues City Grid</p>
    </div>

  </main>

  <!-- Leaflet JS -->
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  
  <script>
    console.log('✅ Itineraries Template cargado');
  </script>
</body>
</html>`;

// ============================================================================
// 2. Escribir HTML
// ============================================================================
fs.writeFileSync(path.join(distPath, 'itineraries.html'), htmlTemplate);
console.log('✅ HTML generado\n');

// ============================================================================
// 3. Compilar Tailwind CSS
// ============================================================================
console.log('🎨 Compilando Tailwind CSS...\n');

try {
  execSync(
    `npx tailwindcss -i ./src/index.css -o ${distPath}/assets/styles.css --minify`,
    { stdio: 'inherit' }
  );
  console.log('✅ CSS compilado\n');
} catch (error) {
  console.error('❌ Error compilando CSS:', error.message);
  process.exit(1);
}

// ============================================================================
// 4. Resumen
// ============================================================================
console.log('📦 Archivos generados:');
console.log('  📝 itineraries.html (100% fiel al template React)');
console.log('  🎨 assets/styles.css\n');
console.log(`✅ Build Itineraries completado en: ${distPath}/itineraries.html\n`);
