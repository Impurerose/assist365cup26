import MatchCard from './MatchCard';
import CityMarker from './CityMarker';
import FlightOption from './FlightOption';
import Chip from '../dsys/Chip';
import { AirplaneIcon } from '@phosphor-icons/react';

/**
 * ItineraryMatchCard Component
 * Card completa de itinerario que combina:
 * - Match card con badge de fase
 * - City marker con número
 * - Línea de conexión (avión + puntos)
 * - Opciones de vuelos
 */
export default function ItineraryMatchCard({ 
  match, 
  phase, 
  city, 
  flights,
  showConnection = true 
}) {
  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 w-full">
      {/* Columna izquierda: Match Card */}
      <div className="w-full lg:w-[368px] flex-shrink-0">
        <MatchCard match={{ ...match, phase }} showMatchNumber={false} />
      </div>

      {/* Columna derecha: City Marker + Connection + Flights */}
      <div className="flex flex-col gap-4 flex-1">
        {/* City Marker */}
        <div className="pt-2">
          <CityMarker cityName={city.name} number={city.number} />
        </div>

        {/* Línea de conexión con avión (solo desktop) */}
        {showConnection && (
          <div className="hidden lg:flex flex-col items-start gap-3 pl-2">
            {/* 4 círculos superiores */}
            {[...Array(4)].map((_, i) => (
              <div 
                key={`top-${i}`} 
                className="w-1 h-1 rounded-full bg-icon-lighter"
              />
            ))}
            {/* Avión en el medio, rotado 90° */}
            <AirplaneIcon size={16} weight="fill" className="text-icon-lighter rotate-180" />
            {/* 4 círculos inferiores */}
            {[...Array(4)].map((_, i) => (
              <div 
                key={`bottom-${i}`} 
                className="w-1 h-1 rounded-full bg-icon-lighter"
              />
            ))}
          </div>
        )}

        {/* Opciones de vuelos */}
        {flights && flights.length > 0 && (
          <div className="bg-white border border-border-primary rounded-xl p-4 flex flex-col gap-2">
            {flights.slice(0, 2).map((flight, index) => (
              <FlightOption key={index} flight={flight} variant="list" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
