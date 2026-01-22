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

// 3. Importar build vanilla existente para reutilizar código
const buildVanillaPath = path.join(__dirname, 'build-vanilla.mjs');
const buildVanilla = await import(buildVanillaPath);

console.log('📝 Generando mainpage.html...\n');

// 4. Simplemente renombrar el index.html actual a mainpage.html
const currentIndexPath = path.join(distPath, 'index.html');
const mainpagePath = path.join(distPath, 'mainpage.html');

// Si existe index.html del build-vanilla, renombrarlo
if (fs.existsSync(currentIndexPath)) {
  fs.copyFileSync(currentIndexPath, mainpagePath);
  console.log('✅ mainpage.html generado desde index.html\n');
} else {
  // Si no existe, ejecutar build-vanilla primero
  console.log('⚠️  index.html no encontrado, ejecutando build-vanilla...\n');
  execSync('node scripts/build-vanilla.mjs', { stdio: 'inherit' });
  
  if (fs.existsSync(currentIndexPath)) {
    fs.copyFileSync(currentIndexPath, mainpagePath);
    console.log('✅ mainpage.html generado\n');
  } else {
    console.error('❌ Error: No se pudo generar index.html');
    process.exit(1);
  }
}

// 5. Actualizar links internos en mainpage.html
let mainpageContent = fs.readFileSync(mainpagePath, 'utf-8');

// Reemplazar referencias a venues si existen
mainpageContent = mainpageContent.replace(
  /onclick=".*?venues\.html.*?"/g,
  'onclick="window.location.href=\'venues.html\'"'
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
