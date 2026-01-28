import { ArrowRightIcon } from '@phosphor-icons/react';
import FlightOption from './FlightOption';

/**
 * FlightRoute Component
 * Card de ruta de vuelo inicial (Origen → Destino) con opciones de vuelos
 * Usado en el template de Itinerarios
 */
export default function FlightRoute({ origin, destination, flights, size = 'default', background = 'default' }) {
  const textSize = size === 'small' ? 'text-sm lg:text-base' : 'text-lg lg:text-xl';
  const bgColor = background === 'dark' ? 'bg-brand-darkening' : 'bg-white';

  return (
    <div className={`${bgColor} border border-border-primary rounded-xl p-4 lg:p-6 flex flex-col gap-4`}>
      {/* Header: Origen → Destino */}
      <div className="flex items-center justify-center gap-2 lg:gap-4">
        <p className={`${textSize} text-text-default font-medium`}>
          {origin}
        </p>
        <ArrowRightIcon size={20} className="text-icon-lighter" />
        <p className={`${textSize} text-text-default font-medium`}>
          {destination}
        </p>
      </div>

      {/* Opciones de vuelos */}
      <div className="flex flex-col gap-2 lg:max-w-1/2 mx-auto">
        {flights.slice(0, 2).map((flight, index) => (
          <FlightOption key={index} flight={flight} variant="list" />
        ))}
      </div>
    </div>
  );
}