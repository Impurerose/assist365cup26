import MapContainer from './MapContainer';

/**
 * ItineraryMapView Component
 * Mapa para el template de Itinerarios
 * Usa el mapa base sin markers adicionales
 */
export default function ItineraryMapView({ selectedCity, onCitySelect }) {
  return (
    <div className="w-full max-w-[792px] mx-auto h-[448px] rounded-3xl overflow-hidden">
      <MapContainer
        selectedTeam={null}
        selectedCity={selectedCity}
        setSelectedCity={onCitySelect}
      />
    </div>
  );
}
