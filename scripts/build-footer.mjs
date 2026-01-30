import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🦶 Generando Footer Template (HTML + CSS)...\n');

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

console.log('📝 Generando footer.html...\n');

// ============================================================================
// DATOS Y CONFIGURACIÓN
// ============================================================================

const ASSETS_URL = 'https://assistcdn.s3.us-west-1.amazonaws.com/assets/site/icons';

const socialNetworks = [
  {
    name: 'Instagram',
    icon: `${ASSETS_URL}/InstagramLogo.svg`,
    url: 'https://www.instagram.com/assist365ok/',
  },
  {
    name: 'Facebook',
    icon: `${ASSETS_URL}/FacebookLogo.svg`,
    url: 'https://www.facebook.com/assist.365.cover/',
  },
  {
    name: 'X',
    icon: `${ASSETS_URL}/XLogo.svg`,
    url: 'https://twitter.com/assist365ok',
  },
  {
    name: 'TikTok',
    icon: `${ASSETS_URL}/TiktokLogo.svg`,
    url: 'https://www.tiktok.com/@assist365ok',
  },
  {
    name: 'LinkedIn',
    icon: `${ASSETS_URL}/LinkedinLogo.svg`,
    url: 'https://ar.linkedin.com/company/assist-365',
  },
  {
    name: 'Youtube',
    icon: `${ASSETS_URL}/YoutubeLogo.svg`,
    url: 'https://www.youtube.com/c/Assist365_Seguro_de_viaje',
  },
];

const legalText = `TEXTO A CONFIRMAR!!!
Copyright © 2024 ASSIST 365. Todos los derechos reservados.
LOS SERVICIOS ASSIST 365 TIENEN LIMITACIONES EXCLUSIVAS SEGÚN EL TIPO DE PRODUCTO ADQUIRIDO. APLICAN LAS LIMITACIONES Y EXCLUSIONES DE USO HABITUAL Y/O LEGAL EN EL PAÍS EN QUE SE EMITA EL PRODUCTO ASSIST 365. A PARTIR DE LOS 75 AÑOS INCLUSIVE SE APLICA UN INCREMENTO DEL 50% SOBRE LAS TARIFAS. EL LÍMITE DE EDAD PARA LAS COBERTURAS OFRECIDAS ES DE HASTA 85 AÑOS, Y LOS SERVICIOS OFRECEN UNA COBERTURA DE ALCANCE MUNDIAL, A EXCEPCIÓN DEL PAÍS DE RESIDENCIA PERMANENTE DEL BENEFICIARIO. LOS SERVICIOS Y PRODUCTOS SE RIGEN POR CONDICIONES GENERALES QUE SE INFORMAN CON LA COMPRA DE CADA PRODUCTO ASSIST 365 Y SE HALLAN A SU DISPOSICIÓN INGRESANDO EN EL PORTAL WEB, PUEDEN SER SOLICITADAS EN FORMA TELEFÓNICA O POR E-MAIL. LAS ENFERMEDADES PREEXISTENTES TIENEN EXCLUSIONES Y LIMITACIONES. ASSIST 365 NO ES UNA EMPRESA DE SEGUROS, SINO QUE ACTÚA EN CALIDAD DE TOMADORA EN BENEFICIO DE SUS CLIENTES.`;

// ============================================================================
// FUNCIONES HELPER PARA GENERAR HTML
// ============================================================================

function generateSocialButton(social) {
  return `
    <button
      type="button"
      onclick="window.open('${social.url}', '_blank', 'noopener,noreferrer')"
      class="w-9 h-9 p-2 border-2 border-brand-primary rounded-xl flex items-center justify-center hover:border-text-decorative-darker hover:text-text-decorative-darker active:border-action-pressed active:text-action-pressed focus:outline-none focus:ring-4 focus:ring-brand-primary focus:ring-opacity-100 focus:border-transparent transition-all duration-300"
      aria-label="Visitar ${social.name}"
    >
      <img
        src="${social.icon}"
        alt="${social.name}"
        class="w-5 h-5 object-contain"
      />
    </button>`;
}

// ============================================================================
// HTML TEMPLATE
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
  
  <title>Footer - Mundial 2026</title>
  
  <!-- Styles -->
  <link rel="stylesheet" href="assets/styles.css" />
</head>

<body class="bg-bg-secondary">
  <!-- Footer Component -->
  <footer class="w-full max-w-[1366px] flex flex-col items-center mt-20 mx-auto">
    <div class="w-full">
      
      <!-- ========================================
           FOOTER SUPERIOR - Redes Sociales + CTA
           ======================================== -->
      <div class="bg-white flex items-start xl:items-center justify-between px-[83px] pt-10 pb-16 flex-col-reverse xl:flex-row gap-y-8 xl:gap-y-0">
        
        <!-- Izquierda: Redes Sociales -->
        <div class="max-w-[548px] mx-auto flex flex-col gap-4 w-full">
          <h3 class="text-text-decorative-darker font-semibold text-base leading-6">
            Seguinos en redes
          </h3>
          <div class="flex gap-3">
            ${socialNetworks.map(generateSocialButton).join('')}
          </div>
        </div>

        <!-- Derecha: Tagline + CTA -->
        <div class="max-w-[548px] flex xl:items-end gap-6 xl:gap-12 mx-auto xl:mx-0 flex-col xl:flex-row xl:max-w-full items-center w-full">
          <p class="text-text-decorative-darker text-[36px] leading-10">
            <span class="font-normal">En tu viaje,</span> 
            <span class="font-semibold">a tu lado.</span>
          </p>
          <button
            type="button"
            onclick="console.log('TODO: Navegar a cotización')"
            class="w-full xl:w-auto whitespace-nowrap overflow-hidden text-ellipsis font-semibold rounded-xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-offset-0 text-lg py-[10px] h-[48px] px-4 bg-brand-primary focus:bg-bg-alt-secondary text-white hover:bg-bg-alt-secondary active:bg-action-pressed focus:ring-brand-primary focus:ring-opacity-100 flex items-center justify-center gap-2"
          >
            <span>Cotizá tu asistencia</span>
            <!-- ArrowRight Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
              <path d="M224.49,136.49l-72,72a12,12,0,0,1-17-17L187,140H40a12,12,0,0,1,0-24H187L135.51,64.48a12,12,0,0,1,17-17l72,72A12,12,0,0,1,224.49,136.49Z"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- ========================================
           SUBFOOTER - Términos + Texto Legal
           ======================================== -->
      <div class="bg-action-focus pt-8 pb-16 flex flex-col gap-6">
        
        <!-- Botón Términos y Condiciones -->
        <div class="max-w-[548px] xl:max-w-[1200px] mx-auto px-4 xl:px-0">
          <div>
            <button
              type="button"
              onclick="console.log('TODO: Abrir términos y condiciones')"
              class="text-action-alt-default font-semibold text-base leading-6 px-4 py-2 rounded-xl hover:text-white hover:bg-white hover:bg-opacity-10 active:bg-white active:bg-opacity-20 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 transition-all duration-300 mb-6 w-fit"
            >
              Términos y condiciones
            </button>
          </div>

          <!-- Línea divisoria -->
          <div class="w-full h-px bg-border-alt-secondary"></div>

          <!-- Texto Legal -->
          <div class="w-full pt-6">
            <p class="text-white text-sm font-normal leading-5">
TEXTO A CONFIRMAR!!!
Copyright © 2024 ASSIST 365. Todos los derechos reservados.
LOS SERVICIOS ASSIST 365 TIENEN LIMITACIONES EXCLUSIVAS SEGÚN EL TIPO DE PRODUCTO ADQUIRIDO. APLICAN LAS LIMITACIONES Y EXCLUSIONES DE USO HABITUAL Y/O LEGAL EN EL PAÍS EN QUE SE EMITA EL PRODUCTO ASSIST 365. A PARTIR DE LOS 75 AÑOS INCLUSIVE SE APLICA UN INCREMENTO DEL 50% SOBRE LAS TARIFAS. EL LÍMITE DE EDAD PARA LAS COBERTURAS OFRECIDAS ES DE HASTA 85 AÑOS, Y LOS SERVICIOS OFRECEN UNA COBERTURA DE ALCANCE MUNDIAL, A EXCEPCIÓN DEL PAÍS DE RESIDENCIA PERMANENTE DEL BENEFICIARIO. LOS SERVICIOS Y PRODUCTOS SE RIGEN POR CONDICIONES GENERALES QUE SE INFORMAN CON LA COMPRA DE CADA PRODUCTO ASSIST 365 Y SE HALLAN A SU DISPOSICIÓN INGRESANDO EN EL PORTAL WEB, PUEDEN SER SOLICITADAS EN FORMA TELEFÓNICA O POR E-MAIL. LAS ENFERMEDADES PREEXISTENTES TIENEN EXCLUSIONES Y LIMITACIONES. ASSIST 365 NO ES UNA EMPRESA DE SEGUROS, SINO QUE ACTÚA EN CALIDAD DE TOMADORA EN BENEFICIO DE SUS CLIENTES.
            </p>
          </div>

        </div>
      </div>
      
    </div>
  </footer>
</body>
</html>`;

// ============================================================================
// ESCRIBIR ARCHIVO
// ============================================================================

const outputPath = path.join(distPath, 'footer.html');
fs.writeFileSync(outputPath, html, 'utf-8');

console.log('✅ footer.html generado correctamente\n');
console.log(`📂 Ubicación: ${outputPath}\n`);
console.log('🎉 Build completado!\n');
