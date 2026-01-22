/**
 * WeatherInfoItem Component
 * Item individual con icono para información de clima
 */
function WeatherInfoItem({ Icon, label, value, alignTop = false }) {
  return (
    <div className={`flex gap-2 ${alignTop ? 'items-start' : 'items-center'}`}>
      <Icon 
        size={20} 
        weight="duotone" 
        className="text-icon-lighter flex-shrink-0" 
      />
      {label && <p className="text-base text-text-lighter">{label}</p>}
      <p className="text-base text-text-default">{value}</p>
    </div>
  );
}

export default WeatherInfoItem;
