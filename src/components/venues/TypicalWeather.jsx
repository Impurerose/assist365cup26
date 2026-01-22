import VenueCard from "./VenueCard";
import WeatherInfoItem from "./WeatherInfoItem";

/**
 * TypicalWeather Component
 * Card de clima habitual con recomendaciones
 */
function TypicalWeather({ items, className = "" }) {
  return (
    <VenueCard className={className}>
      <p className="text-base font-semibold text-text-default">
        Clima habitual en Junio - Julio
      </p>

      <div className="flex flex-col gap-2 mt-4">
        {items.map((item, index) => (
          <WeatherInfoItem key={index} {...item} />
        ))}
      </div>
    </VenueCard>
  );
}

export default TypicalWeather;
