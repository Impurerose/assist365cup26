import MatchCard from './MatchCard';
import CityMarker from './CityMarker';
import FlightOption from './FlightOption';
import MapPinWithNumber from './MapPinWithNumber';
import ItineraryConnector from './ItineraryConnector';

/**
 * ItineraryMatchCard Component
 * Card de itinerario con 3 secciones:
 * 1. Match card (izquierda)
 * 2. MapPin + Conector (medio)
 * 3. Nombre + Vuelos (derecha)
 */
export default function ItineraryMatchCard({ 
  match, 
  phase, 
  city, 
  flights,
  showConnection = true
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[368px_auto_1fr] gap-4 lg:gap-6 w-full">
      {/* Columna 1: Match Card */}
      <div className="w-full">
        <MatchCard match={{ ...match, phase }} showMatchNumber={false} />
      </div>

      {/* Columna 2: MapPin + Conector (solo desktop) */}
      <div className="hidden lg:flex flex-col items-center gap-2">
        <MapPinWithNumber number={city.number} />
        {showConnection && <ItineraryConnector />}
      </div>

      {/* Columna 3: Nombre + Card de vuelos */}
      <div className="flex flex-col gap-2">
        {/* Nombre de la ciudad (con CityMarker en mobile) */}
        <div className="flex items-center gap-2">
          {/* CityMarker solo en mobile */}
          <div className="lg:hidden">
            <CityMarker cityName={city.name} number={city.number} />
          </div>
          
          {/* Nombre solo en desktop */}
          <span className="hidden lg:block text-text-default text-xl font-semibold">
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
  );
}
