import { CaretRight, CaretLeft } from '@phosphor-icons/react';
import { useRef, useState, useEffect } from 'react';
import RestaurantCard from './RestaurantCard';

export default function GastronomyWidget({ restaurants }) {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Detectar si puede hacer scroll en ambas direcciones
  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScroll);
      }
      window.removeEventListener('resize', checkScroll);
    };
  }, [restaurants]);

  const scrollTo = (direction) => {
    if (!scrollContainerRef.current) return;
    
    // Scroll por "página" (ancho visible del container)
    const scrollAmount = scrollContainerRef.current.clientWidth;
    
    scrollContainerRef.current.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth'
    });
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
        {/* Botón de navegación izquierda */}
        {canScrollLeft && (
          <button
            className="absolute left-1.5 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow z-10"
            onClick={() => scrollTo('left')}
            aria-label="Scroll izquierda"
          >
            <CaretLeft size={20} weight="bold" className="text-action-default" />
          </button>
        )}

        <div 
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
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
        {canScrollRight && (
          <button
            className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow z-10"
            onClick={() => scrollTo('right')}
            aria-label="Scroll derecha"
          >
            <CaretRight size={20} weight="bold" className="text-action-default" />
          </button>
        )}
      </div>
    </div>
  );
}
