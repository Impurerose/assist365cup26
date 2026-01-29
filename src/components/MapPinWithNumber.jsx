import { 
  MapPinIcon,
  NumberCircleOne,
  NumberCircleTwo,
  NumberCircleThree,
  NumberCircleFour,
  NumberCircleFive
} from '@phosphor-icons/react';

/**
 * MapPinWithNumber Component
 * Ícono de MapPin con badge de número circular (1-5)
 * Usado en la columna de markers del itinerario
 */
export default function MapPinWithNumber({ number }) {
  const NumberIcon = [
    NumberCircleOne,
    NumberCircleTwo,
    NumberCircleThree,
    NumberCircleFour,
    NumberCircleFive
  ][number - 1];

  return (
    <div className="relative flex-shrink-0">
      <MapPinIcon size={32} weight="duotone" className="text-icon-lighter" />
      {NumberIcon && (
        <NumberIcon 
          size={20} 
          weight="fill" 
          className="absolute top-[13px] -right-[6px] text-brand-primary"
        />
      )}
    </div>
  );
}
