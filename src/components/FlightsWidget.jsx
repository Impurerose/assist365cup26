import { CalendarBlank, ArrowRight } from '@phosphor-icons/react';

export default function FlightsWidget({ origin, destination, period, flights }) {
  return (
    <div className="flex flex-col gap-4">
      {/* Header: Título y fecha */}
      <div className="flex items-center justify-between">
        <p className="text-xl font-semibold text-text-default">
          Vuelos
        </p>
        <div className="flex gap-2 items-center">
          <CalendarBlank
            size={20}
            weight="duotone"
            className="text-icon-lighter"
          />
          <p className="text-base text-text-default">
            {period}
          </p>
        </div>
      </div>

      {/* Ruta: Origen -> Destino */}
      <div className="flex items-center justify-between">
        <p className="text-base text-text-default">
          {origin}
        </p>
        <ArrowRight
          size={20}
          className="text-icon-lighter"
        />
        <p className="text-base text-text-default">
          {destination}
        </p>
      </div>

      {/* Lista de opciones de vuelos - tabla */}
      <table className="w-full">
        <tbody>
          {flights.map((flight, index) => (
            <tr key={index}>
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
          ))}
        </tbody>
      </table>
    </div>
  );
}
