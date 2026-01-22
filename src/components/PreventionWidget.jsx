import { CheckFat, SuitcaseRolling } from '@phosphor-icons/react';

export default function PreventionWidget() {
  return (
    <div className="flex flex-col gap-2">
      {/* Título */}
      <h3 className="text-xl font-semibold text-text-default">
        Prevención
      </h3>
      
      {/* Grid de 2 columnas */}
      <div className="grid grid-cols-2 gap-4 mt-2">
        {/* Columna 1: Antes de viajar */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <CheckFat size={20} weight="duotone" className="text-icon-lighter" />
            <p className="text-base text-text-default">
              Antes de viajar:
            </p>
          </div>
          <ul className="text-sm text-text-default list-disc ml-5 space-y-1">
            <li>Guardar copias digitales de documentos</li>
            <li>Descargar mapas offline</li>
            <li>Confirmar entradas oficiales</li>
            <li>Contratar asistencia al viajero Assist 365</li>
          </ul>
        </div>
        
        {/* Columna 2: Durante el viaje */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <SuitcaseRolling size={20} weight="duotone" className="text-icon-lighter" />
            <p className="text-base text-text-default">
              Durante el viaje:
            </p>
          </div>
          <ul className="text-sm text-text-default list-disc ml-5 space-y-1">
            <li>Mantener hidratación</li>
            <li>Llegar temprano a los partidos</li>
            <li>Seguir indicaciones oficiales del evento</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
