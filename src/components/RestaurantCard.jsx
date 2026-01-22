import { Star, ForkKnife } from '@phosphor-icons/react';

export default function RestaurantCard({ name, image, rating, reviews, cuisine, priceRange }) {
  // Determinar cuántas estrellas llenar basado en el rating redondeado
  const filledStars = Math.round(rating);

  return (
    <div className="bg-white rounded-xl p-3 flex flex-col gap-3 min-w-[184px] snap-start" style={{ scrollSnapAlign: 'start' }}>
      {/* Imagen del restaurante */}
      <img 
        src={image} 
        alt={name}
        className="w-[160px] h-[84px] rounded-xl object-cover"
      />
      
      {/* Información del restaurante */}
      <div className="flex flex-col gap-1">
        {/* Nombre */}
        <p className="text-base font-semibold text-text-default">
          {name}
        </p>
        
        {/* Rating y estrellas */}
        <div className="flex gap-2 items-center">
          <p className="text-base text-text-lighter">
            {rating}
          </p>
          <div className="flex gap-0.5 items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={16}
                weight={star <= filledStars ? "fill" : "regular"}
                className="text-warning-primary"
              />
            ))}
          </div>
        </div>
        
        {/* Reviews */}
        <p className="text-sm text-text-lighter">
          ({reviews})
        </p>
        
        {/* Tipo de cocina */}
        <div className="flex gap-1 items-center">
          <ForkKnife size={16} weight="fill" className="text-icon-default" />
          <p className="text-sm text-text-lighter">
            {cuisine}
          </p>
        </div>
        
        {/* Rango de precio */}
        <div className="flex gap-2 items-center text-sm text-text-lighter">
          <p className="font-semibold">
            {priceRange.min}
          </p>
          <p className="font-normal">
            -
          </p>
          <p className="font-semibold">
            {priceRange.max}
          </p>
        </div>
      </div>
    </div>
  );
}
