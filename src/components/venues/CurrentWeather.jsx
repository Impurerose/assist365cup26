import { CloudSun } from "@phosphor-icons/react";
import VenueCard from "./VenueCard";
import ForecastDay from "./ForecastDay";

/**
 * CurrentWeather Component
 * Widget de clima actual con pronóstico de 4 días
 */
function CurrentWeather({ current, forecast }) {
  return (
    <VenueCard className="mt-4">
      <p className="text-xl font-semibold text-text-default">
        Clima actual
      </p>

      <div className="flex gap-10 mt-4">
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
                {current.temp}
              </p>
              <p className="text-sm text-text-lighter">
                {current.description}
              </p>
            </div>
          </div>
        </div>

        {/* Pronóstico 4 días - derecha */}
        <div className="flex flex-col gap-3 border-l border-border-primary w-full pl-4">
          {forecast.map((day, index) => (
            <ForecastDay key={index} {...day} />
          ))}
        </div>
      </div>
    </VenueCard>
  );
}

export default CurrentWeather;
