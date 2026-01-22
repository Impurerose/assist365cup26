import { Star } from '@phosphor-icons/react';

export default function HotelCard({ name, image, rating, reviews, priceLevel }) {
  // Calcular estrellas llenas (redondeando al entero más cercano)
  const fullStars = Math.round(rating);
  
  return (
    <div className="bg-white rounded-xl p-3 flex flex-col gap-3 min-w-[184px]">
      {/* Imagen del hotel */}
      <img
        src={image}
        alt={name}
        className="w-[160px] h-[84px] rounded-xl object-cover"
      />
      
      {/* Información del hotel */}
      <div className="flex flex-col gap-2">
        {/* Nombre */}
        <p className="text-base font-semibold text-text-default">
          {name}
        </p>
        
        {/* Rating y estrellas */}
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 items-center">
            <p className="text-base text-text-lighter">
              {rating}
            </p>
            <div className="flex gap-0.5 items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  weight={star <= fullStars ? "fill" : "regular"}
                  className="text-warning-primary"
                />
              ))}
            </div>
          </div>
          
          {/* Reviews */}
          <p className="text-sm text-text-lighter">
            ({reviews})
          </p>
        </div>
        
        {/* Nivel de precio */}
        <p className="text-base font-semibold text-text-lighter">
          {priceLevel}
        </p>
      </div>
    </div>
  );
}
