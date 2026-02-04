import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🏠 Generando MainPage Template (HTML + CSS + JS)...\n');

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

console.log('📝 Generando mainpage.html...\n');

// 3. Verificar que index.html existe (debe generarse con build:vanilla primero)
const currentIndexPath = path.join(distPath, 'index.html');
const mainpagePath = path.join(distPath, 'mainpage.html');

if (!fs.existsSync(currentIndexPath)) {
  console.error('❌ Error: index.html no existe en dist-vanilla/');
  console.error('💡 Ejecutá primero: npm run build:vanilla');
  process.exit(1);
}

// 4. Copiar index.html a mainpage.html
fs.copyFileSync(currentIndexPath, mainpagePath);
console.log('✅ mainpage.html generado desde index.html\n');

// 5. Actualizar links internos y agregar botón de itinerarios en mainpage.html
let mainpageContent = fs.readFileSync(mainpagePath, 'utf-8');

// Reemplazar referencias a venues si existen
mainpageContent = mainpageContent.replace(
  /onclick=".*?venues\.html.*?"/g,
  'onclick="window.location.href=\'venues.html\'"'
);

// Agregar botón "Mirá cómo llegar a cada partido" en la sección 2
const itinerariesButton = `
                <button 
                  class="mt-4 inline-flex items-center justify-center gap-2 px-4 py-2 h-12 text-lg font-semibold rounded-xl text-brand-primary hover:text-bg-alt-secondary active:text-action-pressed focus:outline-none focus:ring-4 focus:ring-border-primary transition-all duration-300 w-full lg:w-fit"
                  onclick="window.location.href='itineraries.html'"
                  style="font-family: 'Titillium Web', sans-serif;"
                >
                  <i class="ph-duotone ph-airplane-tilt" style="font-size: 16px;"></i>
                  <span>Mirá cómo llegar a cada partido</span>
                </button>`;

// Insertar el botón DENTRO del matches-section-2, antes de cerrar el div
mainpageContent = mainpageContent.replace(
  /(id="matches-section-2"[^>]*>[\s\S]*?)(<!-- Populated by JavaScript -->)/,
  `$1$2\n${itinerariesButton}`
);

fs.writeFileSync(mainpagePath, mainpageContent);

// 6. Reportar
console.log('📦 Archivos generados:\n');
console.log('  📝 mainpage.html');
console.log('  🎨 assets/styles.css (compartido)');
console.log('  ⚡ assets/app.js (compartido)');
console.log('  📄 assets/data.js (compartido)\n');

console.log('✅ Build MainPage completado en: dist-vanilla/mainpage.html\n');
console.log('💡 Para ver: Abrí dist-vanilla/mainpage.html en el navegador\n');
