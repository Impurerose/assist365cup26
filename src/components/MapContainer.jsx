import React from 'react';
import {APIProvider, Map} from '@vis.gl/react-google-maps';

export default function MapContainer({
  selectedTeam,
  selectedCity,
  setSelectedCity,
}) {
  return (
    <div className="flex-1 overflow-auto bg-sky-200 p-4">
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <Map
          style={{ width: "790px", height: "640px" }}
          defaultCenter={{ lat: 45.5, lng: -100 }}
          defaultZoom={4}
          gestureHandling="greedy"
          disableDefaultUI
        />
      </APIProvider>
    </div>
  );
}
