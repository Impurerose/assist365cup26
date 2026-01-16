import { useEffect } from 'react';
import { APIProvider, Map, useMap } from '@vis.gl/react-google-maps';
import { 
  MAP_CONFIG, 
  MAP_RESTRICTIONS, 
  MAP_STYLES_LOW_ZOOM,
  MAP_STYLES_HIGH_ZOOM,
  ZOOM_THRESHOLD,
  VENUES 
} from '../config/mapConfig';
import VenueMarker from './VenueMarker';

function MapContent({ selectedCity, setSelectedCity }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const handleZoomChange = () => {
      const zoom = map.getZoom();
      const styles = zoom > ZOOM_THRESHOLD ? MAP_STYLES_HIGH_ZOOM : MAP_STYLES_LOW_ZOOM;
      map.setOptions({ styles });
    };

    const listener = map.addListener('zoom_changed', handleZoomChange);

    // Cleanup: remover listener cuando el componente se desmonte
    return () => {
      if (listener) {
        google.maps.event.removeListener(listener);
      }
    };
  }, [map]);

  const handleMarkerClick = (venue) => {
    setSelectedCity(venue);
  };

  return (
    <>
      {VENUES.map((venue) => (
        <VenueMarker
          key={venue.id}
          venue={venue}
          onClick={() => handleMarkerClick(venue)}
        />
      ))}
    </>
  );
}

export default function MapContainer({ selectedTeam, selectedCity, setSelectedCity }) {
  return (
    <div className="rounded-2xl overflow-hidden w-[790px] h-[640px]">
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <Map
          className="w-full h-full"
          restriction={MAP_RESTRICTIONS}
          styles={MAP_STYLES_LOW_ZOOM}
          {...MAP_CONFIG}
        >
          <MapContent selectedCity={selectedCity} setSelectedCity={setSelectedCity} />
        </Map>
      </APIProvider>
    </div>
  );
}
