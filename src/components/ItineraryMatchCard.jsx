import MatchCard from './MatchCard';
import CityMarker from './CityMarker';
import FlightOption from './FlightOption';
import Chip from '../dsys/Chip';
import { 
  AirplaneIcon, 
  MapPinIcon,
  NumberCircleOne,
  NumberCircleTwo,
  NumberCircleThree,
  NumberCircleFour,
  NumberCircleFive
} from '@phosphor-icons/react';

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

      {/* Columna derecha: Grid con (MapPin + Conector) + (Nombre + Vuelos) */}
      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-2 lg:gap-4 flex-1">
        {/* Columna 1: MapPin + Conector vertical (solo desktop) */}
        <div className="hidden lg:flex flex-col items-center gap-2">
          {/* MapPin con número */}
          <div className="relative flex-shrink-0">
            <MapPinIcon size={32} weight="duotone" className="text-icon-lighter" />
            {city.number && (() => {
              const NumberIcon = [
                NumberCircleOne,
                NumberCircleTwo,
                NumberCircleThree,
                NumberCircleFour,
                NumberCircleFive
              ][city.number - 1];
              return NumberIcon ? (
                <NumberIcon 
                  size={18} 
                  weight="fill" 
                  className="absolute top-[12px] -right-[3px] text-brand-primary"
                />
              ) : null;
            })()}
          </div>
          
          {/* Conector vertical */}
          {showConnection && (
            <>
              {/* 4 círculos superiores */}
              {[...Array(4)].map((_, i) => (
                <div 
                  key={`top-${i}`} 
                  className="w-1 h-1 rounded-full bg-icon-lighter"
                />
              ))}
              {/* Avión rotado 180° */}
              <AirplaneIcon size={14} weight="fill" className="text-icon-lighter rotate-180" />
              {/* 4 círculos inferiores */}
              {[...Array(4)].map((_, i) => (
                <div 
                  key={`bottom-${i}`} 
                  className="w-1 h-1 rounded-full bg-icon-lighter"
                />
              ))}
            </>
          )}
        </div>
        
        {/* Columna 2: Nombre de ciudad + Card de vuelos */}
        <div className="flex flex-col gap-2">
          {/* Nombre de la ciudad */}
          <div className="flex items-center gap-2 lg:pt-[2px]">
            {/* MapPin en mobile */}
            <div className="lg:hidden relative">
              <MapPinIcon size={32} weight="duotone" className="text-icon-lighter" />
              {city.number && (() => {
                const NumberIcon = [
                  NumberCircleOne,
                  NumberCircleTwo,
                  NumberCircleThree,
                  NumberCircleFour,
                  NumberCircleFive
                ][city.number - 1];
                return NumberIcon ? (
                  <NumberIcon 
                    size={18} 
                    weight="fill" 
                    className="absolute top-[12px] -right-[3px] text-brand-primary"
                  />
                ) : null;
              })()}
            </div>
            <span className="text-text-default text-xl font-semibold">
              {city.name}
            </span>
          </div>
          
          {/* Card de vuelos */}
          {flights && flights.length > 0 && (
            <div className="bg-brand-darkening rounded-xl p-3 flex flex-col gap-2">
              {flights.slice(0, 2).map((flight, index) => (
                <FlightOption key={index} flight={flight} variant="list" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
