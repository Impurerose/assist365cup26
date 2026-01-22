export default function FlightOption({ airline, logo, duration, type, price }) {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex gap-10 items-center">
        {/* Aerolínea con logo */}
        <div className="flex gap-2 items-center">
          <img 
            src={logo} 
            alt={airline}
            className="w-6 h-6 object-cover"
          />
          <p className="text-sm text-text-default">
            {airline}
          </p>
        </div>
        
        {/* Duración */}
        <p className="text-sm text-text-lighter">
          {duration}
        </p>
        
        {/* Tipo (Directo/Conexión) */}
        <p className="text-sm text-text-lighter">
          {type}
        </p>
      </div>
      
      {/* Precio */}
      <p className="text-sm text-text-default">
        {price}
      </p>
    </div>
  );
}
