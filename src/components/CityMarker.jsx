import { 
  MapPinIcon, 
  NumberCircleOne, 
  NumberCircleTwo, 
  NumberCircleThree, 
  NumberCircleFour, 
  NumberCircleFive 
} from '@phosphor-icons/react';

/**
 * CityMarker Component
 * Badge de ciudad con MapPin y número circular (1-5)
 * Usado en el template de Itinerarios
 */
export default function CityMarker({ cityName, number }) {
  const NumberIcon = [
    NumberCircleOne,
    NumberCircleTwo,
    NumberCircleThree,
    NumberCircleFour,
    NumberCircleFive
  ][number - 1];

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <MapPinIcon size={32} weight="duotone" className="text-icon-lighter" />
        {NumberIcon && (
          <NumberIcon 
            size={18} 
            weight="fill" 
            className="absolute top-[12px] -right-[3px] text-brand-primary"
          />
        )}
      </div>
      <span className="text-text-default text-lg font-medium">
        {cityName}
      </span>
    </div>
  );
}
