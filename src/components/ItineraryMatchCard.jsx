import MatchCard from "./MatchCard";
import CityMarker from "./CityMarker";
import FlightOption from "./FlightOption";
import MapPinWithNumber from "./MapPinWithNumber";
import ItineraryConnector from "./ItineraryConnector";
import { MapPinIcon } from "@phosphor-icons/react";
import SimpleMatchCard from "./SimpleMatchCard";

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
    <div className="flex flex-col gap-4 max-w-[360px] lg:max-w-full mx-auto">
      {/* Título con MapPin grande - SOLO MOBILE/TABLET */}
      {/* <div className="lg:hidden flex items-center gap-2">
        <MapPinIcon size={32} weight="duotone" className="text-brand-primary" />
        <span className="text-text-default text-xl font-semibold">
          {city.name}
        </span>
      </div> */}

      {/* Grid de columnas */}
      <div className="grid grid-cols-[auto_1fr] lg:grid-cols-[368px_auto_1fr] gap-0 lg:gap-6">
        {/* Columna 1: Match Card - SOLO DESKTOP */}
        <div className="hidden lg:block w-full overflow-visible">
          <MatchCard match={{ ...match, phase }} showMatchNumber={false} />
        </div>

        {/* Columna 2: MapPin + Conector - SIEMPRE VISIBLE */}
        <div className="flex flex-col items-center gap-2">
          <MapPinWithNumber number={city.number} />
          {showConnection && (
            <>
              <div className="lg:hidden">
                <ItineraryConnector topCircles={12} />
              </div>
              <div className="hidden lg:block">
                <ItineraryConnector topCircles={5} />
              </div>
            </>
          )}
        </div>

        {/* Columna 3: Cards apiladas */}
        <div className="flex flex-col gap-2 min-w-0">
          {/* Match card - SOLO MOBILE/TABLET */}
          <div className="lg:hidden">
            <span className="pt-2 text-text-default text-xl font-semibold pl-5 mb-3 block">
              {city.name}
            </span>
            <SimpleMatchCard
              match={{ ...match, phase }}
              showMatchNumber={false}
            />
          </div>

          {/* Nombre de ciudad - SOLO DESKTOP */}
          <div className="hidden lg:flex items-center gap-2">
            <span className="text-text-default text-xl font-semibold">
              {city.name}
            </span>
          </div>

          {/* Card de vuelos */}
          {flights && flights.length > 0 && (
            <div className="w-[360px] bg-brand-darkening rounded-xl p-4 flex flex-col gap-2 relative lg:-left-4">
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
