import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🎭 Generando Modal Template (HTML + CSS)...\n');

const distPath = path.join(__dirname, '..', 'dist-vanilla');

// 1. Crear carpeta si no existe
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath, { recursive: true });
}
if (!fs.existsSync(path.join(distPath, 'assets'))) {
  fs.mkdirSync(path.join(distPath, 'assets'));
}

console.log('📝 Generando modal.html...\n');

// ============================================================================
// HTML DEL MODAL TEMPLATE
// ============================================================================

const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- Fuentes -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300;400;600;700&display=swap" rel="stylesheet" />
  
  <!-- Phosphor Icons -->
  <script src="https://unpkg.com/@phosphor-icons/web@2.1.1"></script>
  
  <!-- Micromodal -->
  <script src="https://unpkg.com/micromodal/dist/micromodal.min.js"></script>
  
  <title>Modal - Mundial 2026</title>
  
  <!-- Styles -->
  <link rel="stylesheet" href="assets/styles.css" />
</head>

<body class="bg-bg-secondary">
  <!-- Contenedor principal centrado -->
  <div class="w-full min-h-screen flex items-center justify-center bg-bg-secondary">
    <!-- Botón para abrir modal -->
    <button 
      data-micromodal-trigger="modal-1"
      class="whitespace-nowrap overflow-hidden text-ellipsis font-semibold rounded-xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-offset-0 text-lg py-[10px] h-[48px] px-6 bg-brand-primary focus:bg-bg-alt-secondary text-white hover:bg-bg-alt-secondary active:bg-action-pressed focus:ring-border-primary focus:ring-opacity-100"
    >
      Abrir modal
    </button>

    <!-- Modal -->
    <div class="modal micromodal-slide" id="modal-1" aria-hidden="true">
      <div class="modal__overlay" tabindex="-1" data-micromodal-close>
        <div
          class="modal__container shadow-xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-1-title"
        >
          <main class="modal__content" id="modal-1-content">
            <img
              src="https://assistcdn.s3.us-west-1.amazonaws.com/assets/wc2026/SoccerPlaneIcon.svg"
              alt="Soccer Plane Icon"
              class="mb-6 mx-auto"
            />

            <p class="text-2xl text-text-default text-center">
              Explorá la guía mundialista completa y 
              <span class="font-semibold">
                participá por un pasaje para ver a tu selección.
              </span>
            </p>

            <div class="form__container space-y-4 mx-auto max-w-[330px] pt-6 w-full">
              <!-- TextField 1 -->
              <div class="w-full">
                <input
                  type="text"
                  placeholder="Nombre completo"
                  class="h-[48px] text-text-default text-base py-3 px-3 rounded-xl border border-border-primary bg-white transition-colors duration-300 ease-in-out hover:border-action-hover focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-border-primary focus:ring-opacity-100 w-full text-left"
                  autocomplete="off"
                  autocorrect="off"
                  autocapitalize="off"
                  spellcheck="false"
                />
              </div>

              <!-- TextField 2 -->
              <div class="w-full">
                <input
                  type="text"
                  placeholder="Ingresá tu correo electrónico"
                  class="h-[48px] text-text-default text-base py-3 px-3 rounded-xl border border-border-primary bg-white transition-colors duration-300 ease-in-out hover:border-action-hover focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-border-primary focus:ring-opacity-100 w-full text-left"
                  autocomplete="off"
                  autocorrect="off"
                  autocapitalize="off"
                  spellcheck="false"
                />
              </div>
            </div>
          </main>
          
          <footer class="modal__footer w-full flex items-center justify-center">
            <div class="w-full max-w-[330px] mt-4">
              <button class="whitespace-nowrap overflow-hidden text-ellipsis font-semibold rounded-xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-offset-0 text-lg py-[10px] h-[48px] px-6 w-full bg-action-alt-default text-text-default hover:bg-action-alt-hover active:bg-action-alt-pressed focus:bg-action-alt-default focus:ring-icon-lighter focus:ring-opacity-100 flex items-center justify-center gap-2">
                <span>Quiero participar</span>
                <i class="ph-fill ph-share-fat text-text-alt-onbutton" style="font-size: 16px;"></i>
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  </div>

  <!-- Inicializar MicroModal -->
  <script>
    MicroModal.init({
      disableScroll: true,
      awaitCloseAnimation: true,
    });
  </script>
</body>
</html>`;

// 2. Escribir archivo
const modalPath = path.join(distPath, 'modal.html');
fs.writeFileSync(modalPath, html);

console.log('✅ HTML generado\n');

// 3. Compilar Tailwind CSS
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

// 4. Reportar
console.log('📦 Archivos generados:\n');
console.log('  📝 modal.html');
console.log('  🎨 assets/styles.css (incluye estilos de MicroModal)\n');

console.log('✅ Build Modal completado en: dist-vanilla/modal.html\n');
console.log('💡 Para ver: Abrí dist-vanilla/modal.html en el navegador\n');
