import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🗺️  Generando Venues Template (HTML + CSS)...\n');

const distPath = path.join(__dirname, '..', 'dist-vanilla');

// 1. Crear carpeta si no existe
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath, { recursive: true });
}
if (!fs.existsSync(path.join(distPath, 'assets'))) {
  fs.mkdirSync(path.join(distPath, 'assets'));
}

// 2. Compilar Tailwind CSS (solo si no existe)
const cssPath = path.join(distPath, 'assets', 'styles.css');
if (!fs.existsSync(cssPath)) {
  console.log('🎨 Compilando Tailwind CSS...');
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
} else {
  console.log('✅ CSS ya existe, reutilizando...\n');
}

console.log('📝 Generando venues.html...\n');

// 3. Generar HTML de venues (simple, solo navbar + contenido dummy)
const html = `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- World Cup 2026 Map - Venues -->
    <!-- Generated: ${new Date().toISOString()} -->
    
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
    
    <title>Sedes Mundial 2026</title>
    
    <!-- Styles -->
    <link rel="stylesheet" href="assets/styles.css" />
  </head>
  
  <body class="bg-bg-secondary">
    <div class="w-full min-h-screen flex flex-col bg-bg-secondary">
      
      <!-- Header -->
      <header class="bg-white w-full">
        <div class="flex items-center justify-between w-full max-w-[1200px] mx-auto px-6 py-3">
          <div class="flex items-center gap-3">
            <img
              src="https://assistcdn.s3.us-west-1.amazonaws.com/assets/site/home/img/brand/a365_logo_xa.svg"
              alt="A365 Logo"
            />
            <svg width="0" height="0" class="absolute">
              <defs>
                <linearGradient id="soccerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#59D3C2" stop-opacity="1" />
                  <stop offset="100%" stop-color="#006FE8" stop-opacity="1" />
                </linearGradient>
              </defs>
            </svg>
            <i class="ph-duotone ph-soccer-ball" style="font-size: 32px; background: linear-gradient(180deg, #59D3C2 0%, #006FE8 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;"></i>
            <h1 class="text-xl font-semibold text-text-decorative-darker">
              World Cup Map 2026
            </h1>
          </div>
          <button class="inline-flex items-center justify-center gap-2 px-4 py-2 h-10 text-base font-semibold rounded-xl bg-brand-primary text-white hover:bg-bg-alt-secondary transition-colors">
            <i class="ph ph-share-network" style="font-size: 16px; font-weight: bold;"></i>
            Compartir
          </button>
        </div>
      </header>

      <!-- Main Content -->
      <div class="w-full max-w-[1366px] mx-auto mt-12 px-6">
        <div class="w-full max-w-[1200px] mx-auto">
          <div class="text-center py-20">
            <h2 class="text-4xl font-bold text-text-decorative-darker mb-4" style="font-family: 'Titillium Web', sans-serif;">
              Explorá las sedes del Mundial 2026
            </h2>
            <p class="text-xl text-text-lighter mb-8">
              Contenido en desarrollo...
            </p>
            
            <button 
              onclick="window.location.href='mainpage.html'"
              class="inline-flex items-center justify-center gap-2 px-4 py-2 h-10 text-base font-semibold rounded-xl bg-brand-primary text-white hover:bg-bg-alt-secondary transition-colors"
            >
              <i class="ph ph-soccer-ball" style="font-size: 16px; font-weight: bold;"></i>
              Ver partidos
            </button>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
`;

// 4. Escribir archivo
const venuesPath = path.join(distPath, 'venues.html');
fs.writeFileSync(venuesPath, html);

// 5. Reportar
console.log('📦 Archivos generados:\n');
console.log('  📝 venues.html');
console.log('  🎨 assets/styles.css (compartido)\n');

console.log('✅ Build Venues completado en: dist-vanilla/venues.html\n');
console.log('💡 Para ver: Abrí dist-vanilla/venues.html en el navegador\n');
