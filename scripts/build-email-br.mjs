import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('✅ Generando Email Template BR (HTML con estilos inline)...\n');

const distPath = path.join(__dirname, '..', 'dist-vanilla');

// 1. Crear carpeta si no existe
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath, { recursive: true });
}

console.log('📧 Generando email_br.html...\n');

// ============================================================================
// HTML DEL EMAIL TEMPLATE BR CON ESTILOS INLINE
// ============================================================================

const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- World Cup 2026 Map - Email Template BR -->
  <!-- Generated: ${new Date().toISOString()} -->
  
  <title>Seu caminho para a Copa começa aqui - Assist 365</title>
  
  <!--[if mso]>
  <style type="text/css">
    body, table, td {font-family: Arial, Helvetica, sans-serif !important;}
  </style>
  <![endif]-->
</head>

<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Titillium Web', Arial, Helvetica, sans-serif;">
  
  <!-- Tabla contenedor principal -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        
        <!-- Tabla del contenido del email (max-width: 718px = 43+632+43) -->
        <table width="718" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; max-width: 718px; position: relative;">
          
          <!-- Header con Logo -->
          <tr>
            <td style="padding: 48px 43px 0 43px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <!-- Título -->
                  <td align="left" style="vertical-align: middle;">
                    <h1 style="margin: 0; padding: 0; font-family: 'Titillium Web', Arial, Helvetica, sans-serif; font-size: 24px; font-weight: 600; line-height: 32px; color: #181b1d;">
                      Tudo pronto para continuar! ⚽
                    </h1>
                  </td>
                  
                  <!-- Logo -->
                  <td align="right" style="vertical-align: middle; width: 180px;">
                    <img 
                      src="https://assistcdn.s3.us-west-1.amazonaws.com/assets/site/home/img/brand/a365_logo_xa.svg" 
                      alt="Assist 365" 
                      width="180" 
                      height="80" 
                      style="display: block; border: 0; max-width: 180px; height: auto;"
                    />
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Línea divisoria -->
          <tr>
            <td style="padding: 0 43px;">
              <div style="height: 1px; background-color: #C2DFFF; margin: 24px 0;"></div>
            </td>
          </tr>
          
          <!-- Párrafo principal -->
          <tr>
            <td style="padding: 0 43px;">
              <p style="margin: 0 0 16px 0; font-family: 'Titillium Web', Arial, Helvetica, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; color: #181b1d;">
                Você já está participando do sorteio de uma passagem para viajar e torcer pela sua seleção na Copa do Mundo de 2026 🙌
              </p>
              <p style="margin: 0 0 16px 0; font-family: 'Titillium Web', Arial, Helvetica, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; color: #181b1d;">
                Agora você pode continuar explorando o guia completo da Copa e acessar todo o conteúdo para organizar sua viagem, sede por sede.
              </p>
            </td>
          </tr>
          
          <!-- Botón CTA -->
          <tr>
            <td style="padding: 24px 43px;">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="background-color: #006fe8; border-radius: 12px;">
                    <a 
                      href="https://assist-365.com/mundial-2026" 
                      style="display: inline-flex; align-items: center; justify-content: center; gap: 4px; padding: 12px 16px; font-family: 'Titillium Web', Arial, Helvetica, sans-serif; font-size: 18px; font-weight: 600; line-height: 28px; color: #ffffff; text-decoration: none; border-radius: 12px;"
                    >
                      <span style="white-space: nowrap;">Ir para o guia completo</span>
                      <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: inline-block; vertical-align: middle; margin-left: 4px;">
                        <path d="M14.2804 5.21996L9.28039 0.219965C9.17553 0.114995 9.0419 0.0434818 8.89639 0.0144742C8.75089 -0.0145335 8.60005 0.000267383 8.46296 0.0570042C8.32587 0.113741 8.20868 0.209864 8.12623 0.333214C8.04378 0.456564 7.99977 0.601597 7.99976 0.749965V3.04622C6.38976 3.24122 4.64601 4.03934 3.20289 5.26309C1.38039 6.80934 0.245386 8.80622 0.00663617 10.8881C-0.0175507 11.097 0.0247453 11.3082 0.12751 11.4917C0.230274 11.6752 0.388275 11.8216 0.579045 11.9102C0.769814 11.9987 0.98364 12.0248 1.19012 11.9849C1.39659 11.9449 1.58521 11.8408 1.72914 11.6875C2.38289 10.9912 4.66664 8.82872 7.99976 8.53622V10.75C7.99989 10.8982 8.04395 11.0431 8.12637 11.1663C8.20879 11.2895 8.32587 11.3855 8.46284 11.4423C8.5998 11.499 8.7505 11.5138 8.8959 11.4849C9.0413 11.456 9.17487 11.3847 9.27976 11.28L14.2798 6.27997C14.4203 6.13942 14.4993 5.94885 14.4994 5.75009C14.4995 5.55134 14.4208 5.36067 14.2804 5.21996ZM9.49976 8.93747V7.74997C9.49976 7.55105 9.42074 7.36029 9.28009 7.21964C9.13944 7.07898 8.94867 6.99997 8.74976 6.99997C5.68726 6.99997 3.33914 8.34747 1.88789 9.50684C2.33351 8.37184 3.11476 7.30559 4.17351 6.40746C5.58101 5.21309 7.29164 4.49997 8.74976 4.49997C8.94867 4.49997 9.13944 4.42095 9.28009 4.2803C9.42074 4.13964 9.49976 3.94888 9.49976 3.74997V2.56247L12.6873 5.74997L9.49976 8.93747Z" fill="white"/>
                      </svg>
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Párrafo de cierre -->
          <tr>
            <td style="padding: 24px 43px 48px 43px;">
              <p style="margin: 0 0 16px 0; font-family: 'Titillium Web', Arial, Helvetica, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; color: #181b1d;">
                A viagem da sua vida já está em jogo 🌍⚽
              </p>
              <p style="margin: 16px 0 0 0; font-family: 'Titillium Web', Arial, Helvetica, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; color: #181b1d;">
                —<br />
                Equipe A365
              </p>
            </td>
          </tr>
          
        </table>
        
      </td>
    </tr>
  </table>
  
</body>
</html>`;

// 2. Escribir archivo
const emailPath = path.join(distPath, 'email_br.html');
fs.writeFileSync(emailPath, html);

console.log('✅ HTML del email BR generado\n');

// 3. Reportar
console.log('📦 Archivo generado:\n');
console.log('  📧 email_br.html (versión en portugués con estilos inline)\n');

console.log('✅ Build Email BR completado en: dist-vanilla/email_br.html\n');
console.log('💡 Para ver: Abrí dist-vanilla/email_br.html en el navegador\n');
console.log('💡 El HTML está listo para usar en servicios de email (SendGrid, Mailchimp, etc.)\n');
