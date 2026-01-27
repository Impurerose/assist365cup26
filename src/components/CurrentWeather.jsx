import { CloudSun, Cloud, CloudRain, Sun } from '@phosphor-icons/react';

export default function CurrentWeather() {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xl font-semibold text-text-default">
        Clima actual
      </p>

      <div className="flex lg:gap-10 mt-4 flex-col lg:flex-row mx-auto">
        {/* Clima de hoy - izquierda */}
        <div className="flex gap-2 items-center pl-4">
          <CloudSun
            size={40}
            weight="duotone"
            className="text-text-lighter"
          />
          <div className="flex flex-col gap-1.5 w-[98px]">
            <p className="text-sm text-text-default">Hoy</p>
            <div className="flex flex-col gap-1.5">
              <p className="text-4xl font-semibold text-text-default leading-10">
                17° C
              </p>
              <p className="text-sm text-text-lighter">
                Nubes dispersas
              </p>
            </div>
          </div>
        </div>

        {/* Pronóstico 4 días - derecha */}
        <div className="flex flex-col gap-3 border-t pt-2 mt-2 lg:border-t-0 lg:border-l border-border-primary w-full _w-[209px] pl-4">
          {/* Miércoles */}
          <div className="flex gap-4 items-center">
            <div className="flex gap-4 items-center">
              <p className="text-sm text-text-default">Mié</p>
              <div className="flex gap-3 items-center">
                <Cloud
                  size={24}
                  weight="duotone"
                  className="text-text-lighter"
                />
                <div className="flex gap-1 items-center text-sm">
                  <p className="text-text-lighter">13°</p>
                  <p className="text-text-default">26°</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-text-lighter">Nubes</p>
          </div>

          {/* Jueves */}
          <div className="flex gap-4 items-center">
            <div className="flex gap-4 items-center">
              <p className="text-sm text-text-default">Jue</p>
              <div className="flex gap-3 items-center">
                <CloudRain
                  size={24}
                  weight="duotone"
                  className="text-text-lighter"
                />
                <div className="flex gap-1 items-center text-sm">
                  <p className="text-text-lighter">11°</p>
                  <p className="text-text-default">24°</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-text-lighter">Lluvia ligera</p>
          </div>

          {/* Viernes */}
          <div className="flex gap-4 items-center">
            <div className="flex gap-4 items-center">
              <p className="text-sm text-text-default">Vie</p>
              <div className="flex gap-3 items-center">
                <Cloud
                  size={24}
                  weight="duotone"
                  className="text-text-lighter"
                />
                <div className="flex gap-1 items-center text-sm w-[52px] justify-end">
                  <p className="text-text-lighter">9°</p>
                  <p className="text-text-default">20°</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-text-lighter">Nubes</p>
          </div>

          {/* Sábado */}
          <div className="flex gap-4 items-center">
            <div className="flex gap-4 items-center">
              <p className="text-sm text-text-default">Sáb</p>
              <div className="flex gap-3 items-center">
                <Sun
                  size={24}
                  weight="duotone"
                  className="text-warning-primary"
                />
                <div className="flex gap-1 items-center text-sm">
                  <p className="text-text-lighter">13°</p>
                  <p className="text-text-default">26°</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-text-lighter">Soleado</p>
          </div>
        </div>
      </div>
    </div>
  );
}
