import { ArrowRightIcon, ArrowDownIcon } from '@phosphor-icons/react';
import FlightOption from './FlightOption';

/**
 * FlightRoute Component
 * Card de ruta de vuelo inicial (Origen → Destino) con opciones de vuelos
 * Usado en el template de Itinerarios
 */
export default function FlightRoute({ origin, destination, flights, size = 'default', background = 'default' }) {
  const textSize = size === 'small' ? 'text-sm' : 'text-sm lg:text-xl';
  const bgColor = background === 'dark' ? 'bg-brand-darkening' : 'bg-white';

  return (
    <div className={`${bgColor} border border-border-primary rounded-xl p-4 flex flex-col gap-2 mx-auto max-w-[360px] lg:max-w-[792px]`}>
      {/* Header: Origen ↓/→ Destino - columna en mobile, fila en desktop */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-0 lg:gap-4">
        <p className={`${textSize} text-text-default text-center lg:text-left`}>
          {origin}
        </p>
        
        {/* Flecha: abajo en mobile, derecha en desktop */}
        <ArrowDownIcon 
          size={20} 
          className="text-icon-lighter lg:hidden" 
          weight="regular"
        />
        <ArrowRightIcon 
          size={20} 
          className="text-icon-lighter hidden lg:block" 
          weight="regular"
        />
        
        <p className={`${textSize} text-text-default text-center lg:text-left`}>
          {destination}
        </p>
      </div>

      {/* Opciones de vuelos */}
      <table className="w-full lg:w-auto lg:mx-auto">
        <tbody>
          {flights.slice(0, 2).map((flight, index) => (
            <tr key={index} className="text-sm">
              <td className="py-1 pr-2">
                <img src={flight.logo} alt={flight.airline} className="w-6 h-6" />
              </td>
              <td className="py-1 pr-2 text-text-default">
                {flight.airline}
              </td>
              <td className="py-1 pr-2 text-text-lighter">
                {flight.duration}
              </td>
              <td className="py-1 pr-2 text-text-lighter">
                {flight.type}
              </td>
              <td className="py-1 text-text-default">
                {flight.price}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}