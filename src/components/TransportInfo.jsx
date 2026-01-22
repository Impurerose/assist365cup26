import { Car } from "@phosphor-icons/react";

export default function TransportInfo({ description, recommendations }) {
  return (
    <div className="flex flex-col">
      {/* Título */}
      <p className="text-xl font-semibold text-text-default pb-4">Traslados</p>

      <div className="flex flex-col gap-y-2">
        {/* Descripción */}
        <p className="text-base text-text-default">{description}</p>

        {/* Subtítulo con icono */}
        <div className="flex gap-2 items-center">
          <Car size={20} weight="duotone" className="text-icon-lighter" />
          <p className="text-base text-text-default">Recomendados:</p>
        </div>

        {/* Lista de recomendaciones */}
        <ul className="flex flex-col gap-1 list-disc ml-5">
          {recommendations.map((recommendation, index) => (
            <li key={index} className="text-sm text-text-default">
              {recommendation}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
