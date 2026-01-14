import React from 'react';
import {APIProvider, Map} from '@vis.gl/react-google-maps';

export default function MapContainer({
  selectedTeam,
  selectedCity,
  setSelectedCity,
}) {
  return (
    <div className="rounded-xl overflow-hidden" style={{ width: '790px', height: '640px' }}>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <Map
          style={{ width: "100%", height: "100%" }}
          defaultCenter={{ lat: 45.5, lng: -100 }}
          defaultZoom={4}
          gestureHandling="greedy"
          disableDefaultUI
        />
      </APIProvider>
    </div>
  );
}
