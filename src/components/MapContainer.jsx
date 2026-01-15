import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { MAP_CONFIG, MAP_RESTRICTIONS, MAP_STYLES, VENUES } from '../config/mapConfig';

export default function MapContainer({ selectedTeam, selectedCity, setSelectedCity }) {
  return (
    <div className="rounded-2xl overflow-hidden w-[790px] h-[640px]">
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <Map
          className="w-full h-full"
          restriction={MAP_RESTRICTIONS}
          styles={MAP_STYLES}
          {...MAP_CONFIG}
        >
          {VENUES.map((venue) => (
            <Marker
              key={venue.id}
              position={venue.coordinates}
              title={venue.name}
            />
          ))}
        </Map>
      </APIProvider>
    </div>
  );
}
