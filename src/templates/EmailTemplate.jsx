import { ShareFat } from "@phosphor-icons/react";

/**
 * Email Template
 * Email de confirmación de participación en sorteo
 * Output vanilla: email.html (HTML puro con estilos inline)
 */
function EmailTemplate() {
  return (
    <div className="bg-white relative w-full h-full">
      {/* Logo */}
      <div className="absolute right-[43px] top-[48px] h-[80px] w-[180px]">
        <img
          src="https://assistcdn.s3.us-west-1.amazonaws.com/assets/site/home/img/brand/a365_logo_xa.svg"
          alt="Assist 365"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Título */}
      <h1 
        className="absolute left-[43px] top-[57px] font-semibold text-2xl leading-8 text-text-darker"
        style={{ fontFamily: "'Titillium Web', sans-serif" }}
      >
        ¡Todo listo para seguir! ⚽
      </h1>

      {/* Línea divisoria */}
      <div className="absolute left-[43px] top-[129px] w-[632px] h-px bg-border-primary"></div>

      {/* Párrafo principal */}
      <div 
        className="absolute left-[43px] top-[169px] w-[632px] font-normal text-base leading-6 text-text-darker whitespace-pre-wrap"
        style={{ fontFamily: "'Titillium Web', sans-serif" }}
      >
        <p className="mb-0">Ya estás participando del sorteo por un pasaje para viajar y alentar a tu selección en el Mundial 2026 🙌</p>
        <p className="mb-0 text-base">&nbsp;</p>
        <p>Ahora podés continuar explorando la guía mundialista completa y acceder a todo el contenido para organizar tu viaje sede por sede.</p>
      </div>

      {/* Botón CTA */}
      <a
        href="#"
        className="absolute left-[43px] top-[329px] bg-action-default rounded-xl px-4 py-3 flex items-center justify-center gap-1 no-underline"
      >
        <span 
          className="font-semibold text-lg leading-7 text-text-onbutton whitespace-nowrap"
          style={{ fontFamily: "'Titillium Web', sans-serif" }}
        >
          Ir a la guía completa
        </span>
        <ShareFat size={32} weight="regular" className="text-text-onbutton" />
      </a>

      {/* Párrafo de cierre */}
      <div 
        className="absolute left-[43px] top-[445px] w-[632px] font-normal text-base leading-6 text-text-darker whitespace-pre-wrap"
        style={{ fontFamily: "'Titillium Web', sans-serif" }}
      >
        <p className="mb-0">El viaje de tu vida ya está en juego 🌍⚽</p>
        <p className="mb-0 text-base">&nbsp;</p>
        <p className="mb-0">—</p>
        <p>Equipo A365</p>
      </div>
    </div>
  );
}

export default EmailTemplate;
