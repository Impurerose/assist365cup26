import { CaretRight } from '@phosphor-icons/react';
import HotelCard from './HotelCard';

export default function AccommodationsWidget({ hotels }) {
  return (
    <div className="flex flex-col gap-3">
      {/* Header con título e icono de Tripadvisor */}
      <div className="flex gap-3 items-center">
        <p className="text-xl font-semibold text-text-default">
          Alojamientos
        </p>
        <img
          src="https://www.figma.com/api/mcp/asset/4c00910f-dc59-45ea-a2c4-99c5ffc8c166"
          alt="Tripadvisor"
          className="w-10 h-10 mix-blend-multiply"
        />
      </div>

      {/* Carousel de hoteles */}
      <div className="relative">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
          {hotels.map((hotel, index) => (
            <HotelCard
              key={index}
              name={hotel.name}
              image={hotel.image}
              rating={hotel.rating}
              reviews={hotel.reviews}
              priceLevel={hotel.priceLevel}
            />
          ))}
        </div>
        
        {/* Botón de navegación derecha */}
        <button
          className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
          onClick={() => {
            // Scroll hacia la derecha
            const container = document.querySelector('.overflow-x-auto');
            if (container) {
              container.scrollBy({ left: 200, behavior: 'smooth' });
            }
          }}
        >
          <CaretRight size={20} className="text-action-default" />
        </button>
      </div>
    </div>
  );
}
