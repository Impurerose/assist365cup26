import { ArrowSquareOut } from '@phosphor-icons/react';

/**
 * CountryRequirementsCard Component
 * Card genérica para requisitos de ingreso a un país
 */
export default function CountryRequirementsCard({ 
  countryName, 
  requirements, 
  linkText,
  linkUrl 
}) {
  return (
    <div className="flex flex-col gap-2">
      {/* Título */}
      <p className="text-xl font-semibold text-text-default">
        Normativas de Ingreso a {countryName}
      </p>

      {/* Lista de requisitos */}
      <ul className="flex flex-col gap-1 list-disc ml-6">
        {requirements.map((requirement, index) => (
          <li key={index} className="text-base text-text-default">
            {requirement}
          </li>
        ))}
      </ul>

      {/* Enlace a info oficial */}
      {linkUrl && (
        <a
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex gap-1 items-center text-base font-semibold text-action-default hover:underline px-4 py-2 w-fit"
        >
          {linkText || `Más info ${countryName}`}
          <ArrowSquareOut size={16} weight="regular" />
        </a>
      )}
    </div>
  );
}
