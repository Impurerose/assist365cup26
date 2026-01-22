import { CalendarBlank, ArrowRight } from '@phosphor-icons/react';
import FlightOption from './FlightOption';

export default function FlightsWidget({ origin, destination, period, flights }) {
  return (
    <div className="flex flex-col gap-4">
      {/* Header: Título y fecha */}
      <div className="flex items-center justify-between">
        <p className="text-xl font-semibold text-text-default">
          Vuelos
        </p>
        <div className="flex gap-2 items-center">
          <CalendarBlank
            size={20}
            weight="duotone"
            className="text-icon-lighter"
          />
          <p className="text-base text-text-default">
            {period}
          </p>
        </div>
      </div>

      {/* Ruta: Origen -> Destino */}
      <div className="flex items-center justify-between">
        <p className="text-base text-text-default">
          {origin}
        </p>
        <ArrowRight
          size={20}
          className="text-icon-lighter"
        />
        <p className="text-base text-text-default">
          {destination}
        </p>
      </div>

      {/* Lista de opciones de vuelos */}
      <div className="flex flex-col gap-2">
        {flights.map((flight, index) => (
          <FlightOption
            key={index}
            airline={flight.airline}
            logo={flight.logo}
            duration={flight.duration}
            type={flight.type}
            price={flight.price}
          />
        ))}
      </div>
    </div>
  );
}
