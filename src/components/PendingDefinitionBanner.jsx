/**
 * PendingDefinitionBanner Component
 * Banner informativo para partidos aún por definirse
 */

import { ClockCountdown } from '@phosphor-icons/react';

const PendingDefinitionBanner = () => {
  return (
    <div className="bg-white border border-border-primary rounded-xl px-4 py-8 flex flex-col gap-6 items-center">
      {/* Ícono */}
      <div className="bg-brand-comp-lilac rounded-full w-[50px] h-[50px] flex items-center justify-center">
        <ClockCountdown
          size={32}
          weight="duotone"
          className="text-icon-darker"
        />
      </div>

      {/* Contenido */}
      <div className="flex flex-col gap-4 w-full text-center">
        <p className="text-xl font-semibold text-text-default leading-7" style={{ fontFamily: 'Titillium Web, sans-serif' }}>
          Todavía está por definirse
        </p>
        <p className="text-base text-text-default leading-6" style={{ fontFamily: 'Titillium Web, sans-serif' }}>
          Los partidos se definirán según los resultados de la etapa de grupos.
        </p>
      </div>
    </div>
  );
};

export default PendingDefinitionBanner;
