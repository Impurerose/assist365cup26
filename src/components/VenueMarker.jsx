import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { SoccerBall } from '@phosphor-icons/react';

const VenueMarker = ({ venue, onClick }) => {
  return (
    <AdvancedMarker position={venue.coordinates} onClick={onClick}>
      <div className="flex flex-col items-center gap-2 cursor-pointer">
        {/* Pin con icono de pelota */}
        <div className="relative">
          {/* Cuerpo del pin con gradiente */}
          <div className="w-14 h-14 rounded-full flex items-center justify-center border-3 border-white shadow-lg bg-gradient-to-b from-[#59D3C2] to-[#006FE8]">
            <SoccerBall size={28} weight="duotone" className="text-white" />
          </div>
          {/* Punta del pin */}
          <div 
            className="absolute left-1/2 -translate-x-1/2" 
            style={{ 
              top: '52px',
              width: 0,
              height: 0,
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: '12px solid #006FE8',
            }}
          />
        </div>
        
        {/* Label con nombre de la ciudad */}
        <div className="bg-white px-3 py-1 rounded-lg shadow-md">
          <span className="text-[#0059BA] font-bold text-sm whitespace-nowrap">
            {venue.name}
          </span>
        </div>
      </div>
    </AdvancedMarker>
  );
};

export default VenueMarker;
