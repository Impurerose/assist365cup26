/**
 * ForecastDay Component
 * Día de pronóstico del clima
 */
function ForecastDay({ day, Icon, tempMin, tempMax, description, iconColor = "text-text-lighter" }) {
  return (
    <div className="flex gap-4 items-center">
      <div className="flex gap-4 items-center">
        <p className="text-sm text-text-default">{day}</p>
        <div className="flex gap-3 items-center">
          <Icon 
            size={24} 
            weight="duotone" 
            className={iconColor} 
          />
          <div className="flex gap-1 items-center text-sm">
            <p className="text-text-lighter">{tempMin}°</p>
            <p className="text-text-default">{tempMax}°</p>
          </div>
        </div>
      </div>
      <p className="text-sm text-text-lighter">{description}</p>
    </div>
  );
}

export default ForecastDay;
