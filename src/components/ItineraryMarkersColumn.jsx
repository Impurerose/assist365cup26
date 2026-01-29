import MapPinWithNumber from './MapPinWithNumber';
import ItineraryConnector from './ItineraryConnector';

/**
 * ItineraryMarkersColumn Component
 * Columna continua de MapPins con conectores verticales
 * Renderiza todos los markers y conectores de forma continua (sin gaps)
 */
export default function ItineraryMarkersColumn({ items }) {
  return (
    <div className="hidden lg:flex flex-col items-center gap-2">
      {items.map((item, index) => (
        <div key={index} className="flex flex-col items-center gap-2">
          {/* MapPin con número */}
          <MapPinWithNumber number={item.city.number} />
          
          {/* Conector (excepto después del último item) */}
          {index < items.length - 1 && <ItineraryConnector />}
        </div>
      ))}
    </div>
  );
}
