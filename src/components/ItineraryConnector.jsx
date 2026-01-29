import { AirplaneIcon } from '@phosphor-icons/react';

/**
 * ItineraryConnector Component
 * Conector vertical con puntos y avión
 * Usado entre los MapPin en la columna de markers del itinerario
 */
export default function ItineraryConnector() {
  return (
    <div className="flex flex-col items-center gap-[8px]">
      {/* 4 círculos superiores */}
      {[...Array(4)].map((_, i) => (
        <div 
          key={`top-${i}`} 
          className="w-1 h-1 rounded-full bg-icon-lighter"
        />
      ))}
      
      {/* Avión rotado 180° */}
      <AirplaneIcon size={16} weight="fill" className="text-icon-lighter rotate-180" />
      
      {/* 4 círculos inferiores */}
      {[...Array(4)].map((_, i) => (
        <div 
          key={`bottom-${i}`} 
          className="w-1 h-1 rounded-full bg-icon-lighter"
        />
      ))}
    </div>
  );
}
