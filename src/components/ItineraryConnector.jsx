import { AirplaneIcon } from '@phosphor-icons/react';

/**
 * ItineraryConnector Component
 * Conector vertical con puntos y avión
 * Usado entre los MapPin en la columna de markers del itinerario
 */
export default function ItineraryConnector({ topCircles = 4, bottomCircles = 4 }) {
  return (
    <div className="flex flex-col items-center gap-[8px]">
      {/* Círculos superiores */}
      {[...Array(topCircles)].map((_, i) => (
        <div 
          key={`top-${i}`} 
          className="w-1 h-1 rounded-full bg-icon-lighter"
        />
      ))}
      
      {/* Avión rotado 180° */}
      <AirplaneIcon size={16} weight="fill" className="text-icon-lighter rotate-180" />
      
      {/* Círculos inferiores */}
      {[...Array(bottomCircles)].map((_, i) => (
        <div 
          key={`bottom-${i}`} 
          className="w-1 h-1 rounded-full bg-icon-lighter"
        />
      ))}
    </div>
  );
}
