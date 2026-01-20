import { AdvancedMarker } from '@vis.gl/react-google-maps';

const VenueMarker = ({ venue, onClick }) => {
  return (
    <AdvancedMarker position={venue.coordinates} onClick={onClick}>
      <div className="flex flex-col items-center gap-2 cursor-pointer">
        {/* Pin SVG marker */}
        <img 
          src="https://assistcdn.s3.us-west-1.amazonaws.com/assets/wc2026/a365pin.svg" 
          alt={venue.name}
          className="w-auto h-auto"
        />
        
        {/* Label con nombre de la ciudad */}
        <div className="px-3 py-1">
          <span className="text-text-decorative-darker font-bold text-sm whitespace-nowrap">
            {venue.name}
          </span>
        </div>
      </div>
    </AdvancedMarker>
  );
};

export default VenueMarker;
