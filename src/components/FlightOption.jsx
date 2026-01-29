/**
 * FlightOption Component
 * Opción individual de vuelo - Usado tanto en tabla (FlightsWidget) como en lista (ItineraryMatchCard)
 * Soporta dos variantes: 'table' (default) y 'list'
 */
export default function FlightOption({ flight, variant = 'table' }) {
  if (variant === 'list') {
    return (
      <div className="flex items-center w-full gap-2">
        {/* Aerolínea con logo */}
        <div className="flex gap-2 items-center w-32">
          <img 
            src={flight.logo} 
            alt={flight.airline}
            className="w-6 h-6 object-cover"
          />
          <p className="text-sm text-text-default">
            {flight.airline}
          </p>
        </div>
        
        {/* Duración */}
        <p className="text-sm text-text-lighter w-24">
          {flight.duration}
        </p>
        
        {/* Tipo (Directo/Conexión) */}
        <p className="text-sm text-text-lighter flex-1">
          {flight.type}
        </p>
        
        {/* Precio */}
        <p className="text-sm text-text-default text-right w-32">
          {flight.price}
        </p>
      </div>
    );
  }

  // Variante 'table' (default)
  return (
    <tr>
      <td className="py-1">
        <div className="flex gap-2 items-center">
          <img 
            src={flight.logo} 
            alt={flight.airline}
            className="w-6 h-6 object-cover"
          />
          <p className="text-sm text-text-default whitespace-nowrap">
            {flight.airline}
          </p>
        </div>
      </td>
      <td className="py-1 text-sm text-text-lighter text-center">
        {flight.duration}
      </td>
      <td className="py-1 text-sm text-text-lighter">
        {flight.type}
      </td>
      <td className="py-1 text-sm text-text-default text-right">
        {flight.price}
      </td>
    </tr>
  );
}

