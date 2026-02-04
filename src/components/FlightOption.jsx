/**
 * FlightOption Component
 * Opción individual de vuelo - Usado tanto en tabla (FlightsWidget) como en lista (ItineraryMatchCard)
 * Soporta dos variantes: 'table' (default) y 'list'
 */
export default function FlightOption({ flight, variant = "table" }) {
  if (variant === "list") {
    return (
      <div className="flex items-start lg:items-center gap-2 w-ful flex-col lg:flex-row ">
        {/* Logo + Aerolínea + Duración */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <img
              src={flight.logo}
              alt={flight.airline}
              className="w-6 h-6 object-cover"
            />
            <span className="text-sm text-text-default leading-5">
              {flight.airline}
            </span>
          </div>
          <span className="text-sm text-text-lighter leading-5">
            {flight.duration}
          </span>
        </div>

        <div className="gap-2 flex flex-row">
          {/* Tipo */}
          <span className="text-sm text-text-lighter leading-5">
            {flight.type}
          </span>

          {/* Precio */}
          <span className="text-sm text-text-default leading-5">
            {flight.price}
          </span>
        </div>
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
      <td className="py-1 text-sm text-text-lighter">{flight.type}</td>
      <td className="py-1 text-sm text-text-default text-right">
        {flight.price}
      </td>
    </tr>
  );
}
