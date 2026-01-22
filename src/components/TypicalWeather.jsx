import { Thermometer, Sun, CloudLightning, WarningCircle } from '@phosphor-icons/react';

export default function TypicalWeather() {
  return (
    <>
      <p className="text-base font-semibold text-text-default">
        Clima habitual en Junio - Julio
      </p>

      <div className="flex flex-col gap-2 mt-4">
        {/* Temperaturas */}
        <div className="flex gap-2 items-center">
          <Thermometer
            size={20}
            weight="duotone"
            className="text-icon-lighter"
          />
          <p className="text-base text-text-lighter">Temperaturas:</p>
          <p className="text-base text-text-default">22°C a 32°C</p>
        </div>

        {/* Días calurosos */}
        <div className="flex gap-2 items-center">
          <Sun
            size={20}
            weight="duotone"
            className="text-icon-lighter"
          />
          <p className="text-base text-text-default">
            Días calurosos y húmedos
          </p>
        </div>

        {/* Tormentas */}
        <div className="flex gap-2 items-center">
          <CloudLightning
            size={20}
            weight="duotone"
            className="text-icon-lighter"
          />
          <p className="text-base text-text-default">
            Posibles tormentas eléctricas aisladas
          </p>
        </div>

        {/* Recomendación */}
        <div className="flex gap-2 items-start">
          <WarningCircle
            size={20}
            weight="duotone"
            className="text-icon-lighter flex-shrink-0"
          />
          <p className="text-base text-text-default">
            Lleva ropa liviana, gorra, protector solar y botella
            reutilizable.
          </p>
        </div>
      </div>
    </>
  );
}
