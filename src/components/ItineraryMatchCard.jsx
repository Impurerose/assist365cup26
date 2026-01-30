import MatchCard from "./MatchCard";
import CityMarker from "./CityMarker";
import FlightOption from "./FlightOption";
import MapPinWithNumber from "./MapPinWithNumber";
import ItineraryConnector from "./ItineraryConnector";

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
  showConnection = true,
}) {
  return (
    <div className="grid grid-cols-[auto_1fr] lg:grid-cols-[368px_auto_1fr] gap-4 lg:gap-6 w-full max-w-[360px] lg:max-w-full mx-auto">
      {/* Columna 1: Match Card - SOLO DESKTOP */}
      <div className="hidden lg:block w-full overflow-visible">
        <MatchCard match={{ ...match, phase }} showMatchNumber={false} />
      </div>

      {/* Columna 2: MapPin + Conector - SIEMPRE VISIBLE */}
      <div className="flex flex-col items-center gap-2">
        <MapPinWithNumber number={city.number} />
        {showConnection && <ItineraryConnector />}
      </div>

      {/* Columna 3: Cards apiladas */}
      <div className="flex flex-col gap-2 min-w-0">
        {/* Match card - SOLO MOBILE/TABLET */}
        <div className="lg:hidden">
          <MatchCard match={{ ...match, phase }} showMatchNumber={false} />
        </div>

        {/* Nombre de ciudad - SOLO DESKTOP */}
        <div className="hidden lg:flex items-center gap-2">
          <span className="text-text-default text-xl font-semibold">
            {city.name}
          </span>
        </div>

        {/* Card de vuelos */}
        {flights && flights.length > 0 && (
          <div className="bg-brand-darkening rounded-xl p-4 flex flex-col gap-2 max-w-[350px]">
            {flights.slice(0, 2).map((flight, index) => (
              <FlightOption key={index} flight={flight} variant="list" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
