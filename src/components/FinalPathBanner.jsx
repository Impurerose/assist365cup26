/**
 * FinalPathBanner Component
 * Banner modal para mostrar el camino a la final
 */

import { Trophy } from '@phosphor-icons/react';
import Button from '../dsys/Button';
import Chip from '../dsys/Chip';

const FinalPathBanner = () => {
  return (
    <>
      {/* Chips de navegación */}
      <div className="flex gap-2 mb-6">
        <Chip state="default">
          Grupos
        </Chip>
        <Chip state="selected">
          Eliminación
        </Chip>
      </div>

      <div className="bg-white border border-border-primary rounded-xl p-8 flex flex-col gap-6 items-center">
        {/* Ícono */}
        <div className="bg-brand-comp-lilac rounded-full w-[50px] h-[50px] flex items-center justify-center">
          <Trophy
            size={32}
            weight="duotone"
            className="text-bg-alt-primary"
          />
        </div>

        {/* Contenido */}
        <div className="flex flex-col gap-4 w-full">
          <p className="text-xl font-semibold text-text-default text-center leading-7">
            Mirá cómo sería el camino a la final
          </p>
          <p className="text-base text-[#31363A] text-center leading-6">
            Si en la fase de grupos quedamos:
          </p>

          {/* Botones */}
          <div className="flex items-center justify-between w-full gap-2">
            <Button variant="alt">Primeros</Button>
            <Button variant="alt">Segundos</Button>
            <Button variant="alt">Terceros</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FinalPathBanner;
