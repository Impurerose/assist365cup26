import { CalendarBlankIcon, ArrowRightIcon, ArrowDownIcon } from '@phosphor-icons/react';
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
          <CalendarBlankIcon
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
      <div className="flex items-center justify-between flex-col lg:flex-row">
        <p className="text-base text-text-default">
          {origin}
        </p>
        <ArrowRightIcon
          size={20}
          className="text-icon-lighter hidden lg:block"
        />
        <ArrowDownIcon
          size={20}
          className="text-icon-lighter block lg:hidden"
        />
        <p className="text-base text-text-default">
          {destination}
        </p>
      </div>

      {/* Lista de opciones de vuelos - tabla */}
      <table className="w-full max-w-[420px] lg:max-w-full mx-auto">
        <tbody>
          {flights.map((flight, index) => (
            <FlightOption key={index} flight={flight} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
