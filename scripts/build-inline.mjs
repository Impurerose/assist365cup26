import { build } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Generando HTML inline completo (todo en un archivo)...\n');

// 1. Build de Vite (salida separada en archivos)
await build({
  build: {
    outDir: 'dist-inline',
    emptyOutDir: true,
    cssCodeSplit: false,
    minify: false,
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
const distPath = path.join(__dirname, '..', 'dist-inline');
const assetsPath = path.join(distPath, 'assets');

// 3. Leer CSS
const cssFiles = fs.readdirSync(assetsPath).filter(f => f.endsWith('.css'));
const cssContent = cssFiles.map(f => 
  fs.readFileSync(path.join(assetsPath, f), 'utf-8')
).join('\n');

// 4. Leer JS
const jsFiles = fs.readdirSync(assetsPath).filter(f => f.endsWith('.js'));
const jsContent = jsFiles.map(f => 
  fs.readFileSync(path.join(assetsPath, f), 'utf-8')
).join('\n');

console.log('📝 Generando HTML inline...\n');

// 5. Generar HTML con todo inline
const htmlTemplate = `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- World Cup 2026 Map - Inline Build -->
    <!-- Generated: ${new Date().toISOString()} -->
    <!-- All CSS and JS are inlined for portability -->
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link 
      href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400;600;700&display=swap" 
      rel="stylesheet" 
    />
    
    <title>World Cup Map 2026 - Assist 365</title>
    
    <!-- Inline Styles -->
    <style>
${cssContent}
    </style>
  </head>
  
  <body>
    <!-- React App Mount Point -->
    <div id="root"></div>
    
    <!-- Inline Application Script -->
    <script type="module">
${jsContent}
    </script>
  </body>
</html>
`;

// 6. Guardar HTML inline
const htmlPath = path.join(distPath, 'index.html');
fs.writeFileSync(htmlPath, htmlTemplate);

// 7. Eliminar carpeta assets (ya no se necesita)
fs.rmSync(assetsPath, { recursive: true, force: true });

// 8. Reportar resultado
const stats = fs.statSync(htmlPath);
const size = (stats.size / 1024).toFixed(2);

console.log('📦 Archivo generado:\n');
console.log(`  📝 index.html  ${size} KB (todo inline)\n`);

console.log('✅ Build inline completado en: dist-inline/\n');
console.log('💡 Este archivo es 100% standalone:');
console.log('   - No necesita archivos externos');
console.log('   - Se puede copiar/pegar directamente');
console.log('   - Funciona sin servidor (doble click)\n');
