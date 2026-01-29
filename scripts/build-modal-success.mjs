import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('✅ Generando Modal Success Template (HTML + CSS)...\n');

const distPath = path.join(__dirname, '..', 'dist-vanilla');

// 1. Crear carpeta si no existe
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath, { recursive: true });
}
if (!fs.existsSync(path.join(distPath, 'assets'))) {
  fs.mkdirSync(path.join(distPath, 'assets'));
}

console.log('📝 Generando modal-success.html...\n');

// ============================================================================
// HTML DEL MODAL SUCCESS TEMPLATE
// ============================================================================

const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- World Cup 2026 Map - Modal Success -->
  <!-- Generated: ${new Date().toISOString()} -->
  
  <!-- Fuentes -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300;400;600;700&display=swap" rel="stylesheet" />
  
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
  
  <title>¡Listo! - Mundial 2026</title>
  
  <!-- Styles -->
  <link rel="stylesheet" href="assets/styles.css?v=${Date.now()}" />
</head>

<body class="bg-bg-secondary">
  <!-- Contenedor principal centrado con overlay -->
  <div class="w-full min-h-screen flex items-center justify-center bg-bg-secondary bg-opacity-50 p-6">
    
    <!-- Modal Container -->
    <div class="bg-white flex flex-col gap-0 items-center px-0 py-10 relative rounded-xl shadow-xl max-w-md w-full">
      
      <!-- Content -->
      <div class="flex flex-col gap-6 items-center px-8 relative w-full">
        
        <!-- Success Icon -->
        <i class="ph-duotone ph-check-fat text-success-primary" style="font-size: 72px;"></i>

        <!-- Text Content -->
        <div class="flex flex-col gap-3 items-start text-center w-full text-text-default">
          <p class="font-semibold leading-8 text-2xl w-full" style="font-family: 'Titillium Web', sans-serif;">
            ¡Listo!
          </p>
          <div class="font-normal leading-6 text-base w-full" style="font-family: 'Titillium Web', sans-serif;">
            <p class="mb-0">Te enviamos un email con el link para continuar.</p>
            <p class="mb-0">No te olvides de revisar en spam.</p>
          </div>
        </div>
      </div>

      <!-- Close Button -->
      <button
        class="absolute flex items-center justify-center overflow-hidden p-2 right-2 rounded-xl w-9 h-9 top-2 hover:bg-bg-secondary transition-colors"
        onclick="closeModal()"
        aria-label="Cerrar modal"
      >
        <i class="ph ph-x text-action-default" style="font-size: 20px;"></i>
      </button>
    </div>
  </div>

  <!-- Scripts -->
  <script>
    function closeModal() {
      console.log('Modal cerrado');
      // Puedes agregar lógica para cerrar el modal
      // Por ejemplo, redirigir o esconder el modal
      // window.location.href = 'mainpage.html';
    }
  </script>
</body>
</html>`;

// 2. Escribir archivo
const modalSuccessPath = path.join(distPath, 'modal-success.html');
fs.writeFileSync(modalSuccessPath, html);

console.log('✅ HTML generado\n');

// 3. Compilar Tailwind CSS (si no existe)
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

// 4. Reportar
console.log('📦 Archivos generados:\n');
console.log('  📝 modal-success.html');
console.log('  🎨 assets/styles.css (compartido)\n');

console.log('✅ Build Modal Success completado en: dist-vanilla/modal-success.html\n');
console.log('💡 Para ver: Abrí dist-vanilla/modal-success.html en el navegador\n');
