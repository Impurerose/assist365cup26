import { build } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Generando HTML estático con mapa interactivo...\n');

// 1. Build de Vite (salida separada en archivos)
await build({
  build: {
    outDir: 'dist-static',
    emptyOutDir: true,
    cssCodeSplit: false,
    minify: false, // HTML más legible
    rollupOptions: {
      output: {
        entryFileNames: 'assets/app.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
        manualChunks: undefined,
      }
    }
  }
});

console.log('✅ Build de Vite completado\n');

// 2. Leer archivos generados
const distPath = path.join(__dirname, '..', 'dist-static');
const htmlPath = path.join(distPath, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf-8');

console.log('📝 Limpiando y formateando HTML...\n');

// 3. Crear HTML template limpio y legible
const cssFiles = fs.readdirSync(path.join(distPath, 'assets'))
  .filter(f => f.endsWith('.css'))
  .map(f => `assets/${f}`);

const jsFiles = fs.readdirSync(path.join(distPath, 'assets'))
  .filter(f => f.endsWith('.js'))
  .map(f => `assets/${f}`);

// 4. Generar HTML desde cero con formato limpio
const htmlTemplate = `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- World Cup 2026 Map - Standalone Build -->
    <!-- Generated: ${new Date().toISOString()} -->
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link 
      href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400;600;700&display=swap" 
      rel="stylesheet" 
    />
    
    <title>World Cup Map 2026 - Assist 365</title>
    
    <!-- Styles -->
${cssFiles.map(f => `    <link rel="stylesheet" href="${f}" />`).join('\n')}
  </head>
  
  <body>
    <!-- React App Mount Point -->
    <div id="root"></div>
    
    <!-- Application Scripts -->
${jsFiles.map(f => `    <script type="module" src="${f}"></script>`).join('\n')}
  </body>
</html>
`;

// 5. Guardar HTML formateado
fs.writeFileSync(htmlPath, htmlTemplate);

// 6. Reportar archivos generados
console.log('📦 Archivos generados:\n');

const files = fs.readdirSync(distPath, { recursive: true });
files.forEach(file => {
  const filePath = path.join(distPath, file);
  const stats = fs.statSync(filePath);
  
  if (stats.isFile()) {
    const size = (stats.size / 1024).toFixed(2);
    const ext = path.extname(file);
    let icon = '📄';
    if (ext === '.html') icon = '📝';
    if (ext === '.css') icon = '🎨';
    if (ext === '.js') icon = '⚡';
    
    console.log(`  ${icon} ${file.padEnd(30)} ${size.padStart(8)} KB`);
  }
});

console.log('\n✅ Build completado en: dist-static/\n');
console.log('💡 Archivos separados:');
console.log('   - index.html  → HTML limpio y legible');
console.log('   - assets/*.css → Estilos');
console.log('   - assets/*.js  → JavaScript + React + Mapa\n');
