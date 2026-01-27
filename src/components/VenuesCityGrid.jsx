import { ArrowRightIcon, MapPinLineIcon } from "@phosphor-icons/react";
import Button from "../dsys/Button";

/**
 * VenuesCityGrid Component
 * Grid de ciudades sedes para explorar
 */
function VenuesCityGrid() {
  const cities = [
    {
      id: 1,
      country: "Estados Unidos",
      city: "Atlanta",
      image: null, // Placeholder
    },
    {
      id: 2,
      country: "Estados Unidos",
      city: "Atlanta",
      image: null, // Placeholder
    },
  ];

return (
    <div
        className="
            grid 
            lg:grid-cols-[282px_282px_1fr] 
            grid-cols-1 
            gap-y-4 
            lg:gap-y-0 
            lg:gap-x-6 
            gap-x-0
        "
    >
        {cities.map((city, idx) => (
            <div
                key={city.id}
                className="bg-bg-primary rounded-2xl p-4 flex items-center gap-4 flex-1"
            >
                <div className="overflow-hidden rounded-2xl flex-shrink-0">
                    <img src="https://placehold.co/80x80" alt="Ciudad placeholder" />
                </div>
                <div className="flex flex-col">
                    <span className="text-text-secondary text-sm">{city.country}</span>
                    <span className="text-text-default text-xl font-semibold">
                        {city.city}
                    </span>
                </div>
            </div>
        ))}

        {/* Card de acción - Explorar todas las sedes */}
        <div className="bg-bg-primary rounded-2xl p-4 flex items-center gap-y-4 flex-1">
            <div className="w-20 h-20 bg-brand-comp-lightblue rounded-2xl flex items-center justify-center flex-shrink-0">
                <MapPinLineIcon
                    size={32}
                    weight="duotone"
                    className="text-icon-default"
                />
            </div>
            <div className="flex flex-col gap-2">
                <Button
                    color="tertiary"
                    iconPosition="right"
                    icon={<ArrowRightIcon size={16} weight="bold" />}
                    onClick={() => {
                        if (typeof window !== "undefined") {
                            const isVanilla = !document.getElementById("root");
                            if (isVanilla) {
                                window.location.href = "venuesSelection.html";
                            }
                        }
                    }}
                >
                    Explorar todas las sedes
                </Button>
            </div>
        </div>
    </div>
);
}

export default VenuesCityGrid;
