import { CaretRight } from '@phosphor-icons/react';
import { useRef } from 'react';
import RestaurantCard from './RestaurantCard';

export default function GastronomyWidget({ restaurants }) {
  const scrollContainerRef = useRef(null);

  const scrollToNext = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 184 + 16; // ancho de card + gap
      scrollContainerRef.current.scrollBy({ 
        left: cardWidth, 
        behavior: 'smooth' 
      });
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Header con título e icono de Tripadvisor */}
      <div className="flex gap-3 items-center">
        <p className="text-xl font-semibold text-text-default">
          Gastronomía
        </p>
        <img
          src="https://www.figma.com/api/mcp/asset/3060ac03-c769-4735-a92e-a66647d4b7d2"
          alt="Tripadvisor"
          className="w-10 h-10 mix-blend-multiply"
        />
      </div>

      {/* Carousel de restaurantes */}
      <div className="relative">
        <div 
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {restaurants.map((restaurant, index) => (
            <RestaurantCard
              key={index}
              name={restaurant.name}
              image={restaurant.image}
              rating={restaurant.rating}
              reviews={restaurant.reviews}
              cuisine={restaurant.cuisine}
              priceRange={restaurant.priceRange}
            />
          ))}
        </div>
        
        {/* Botón de navegación derecha */}
        <button
          className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
          onClick={scrollToNext}
        >
          <CaretRight size={20} className="text-action-default" />
        </button>
      </div>
    </div>
  );
}
