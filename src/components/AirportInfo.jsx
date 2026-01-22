import { AirplaneTakeoff, ArrowSquareOut } from '@phosphor-icons/react';

export default function AirportInfo({ name, description, features, officialLink }) {
  return (
    <div className="flex flex-col gap-2">
      {/* Icono + Título */}
      <div className="flex flex-col gap-1">
        <AirplaneTakeoff
          size={32}
          weight="duotone"
          className="text-icon-lighter"
        />
        <p className="text-base font-semibold text-text-default">
          Aeropuerto
        </p>
      </div>

      {/* Descripción */}
      <p className="text-base text-text-default">
        {description}
      </p>

      {/* Lista de características */}
      <ul className="flex flex-col gap-1 list-disc ml-5">
        {features.map((feature, index) => (
          <li key={index} className="text-sm text-text-default">
            {feature}
          </li>
        ))}
      </ul>

      {/* Enlace a info oficial */}
      {officialLink && (
        <a
          href={officialLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex gap-1 items-center text-base font-semibold text-action-default hover:underline"
        >
          Más info oficial
          <ArrowSquareOut size={16} weight="regular" />
        </a>
      )}
    </div>
  );
}
