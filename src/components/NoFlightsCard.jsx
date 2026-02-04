import { IconContext } from "@phosphor-icons/react";

// SVG de ícono Empty (del diseño de Figma)
const EmptyIcon = () => (
  <img src="https://assistcdn.s3.us-west-1.amazonaws.com/assets/wc2026/emptyIcon.png"/>
);

/**
 * NoFlightsCard Component
 * Card que se muestra cuando no hay vuelos disponibles para una ruta
 * Basado en diseño de Figma: 630-5629
 */
export default function NoFlightsCard() {
  return (
    <div className="w-[360px] h-[88px] bg-brand-darkening/[0.06] rounded-xl p-4 flex items-center justify-center gap-1">
      <div className="shrink-0 w-4 h-4">
        <EmptyIcon />
      </div>
      <p className="text-sm text-text-default leading-5 pl-1">
        No encontramos vuelos disponibles para esta ruta.
      </p>
    </div>
  );
}
