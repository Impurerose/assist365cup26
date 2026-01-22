import { Shield } from '@phosphor-icons/react';

export default function SafetyWidget() {
  return (
    <div className="flex flex-col gap-2 h-[208px]">
      {/* Título */}
      <h3 className="text-xl font-semibold text-text-default">
        Seguridad
      </h3>
      
      {/* Descripción */}
      <p className="text-base text-text-default">
        Kansas City es una ciudad relativamente segura, especialmente en zonas turísticas.
      </p>
      
      {/* Consejos con icono */}
      <div className="flex gap-2 items-center mt-2">
        <Shield size={20} weight="duotone" className="text-icon-lighter" />
        <p className="text-base text-text-default">
          Consejos básicos:
        </p>
      </div>
      
      {/* Lista de consejos */}
      <ul className="text-sm text-text-default list-disc ml-5 space-y-1">
        <li>Evitar zonas poco iluminadas de noche</li>
        <li>Usar transporte autorizado</li>
        <li>No dejar objetos visibles en el auto</li>
      </ul>
    </div>
  );
}
