import { useState } from "react";
import HeaderBar from "../components/HeaderBar";
import Button from "../dsys/Button";
import { CaretLeftIcon } from "@phosphor-icons/react";
import { VENUES } from "../config/mapConfig";

/**
 * VenuesSelection Template
 * Template para selección de sedes del Mundial
 * Output vanilla: venuesSelection.html
 */
function VenuesSelectionTemplate() {
  const [selectedVenue, setSelectedVenue] = useState(null);

  // Formatear país según el diseño
  const getCountryDisplay = (country) => {
    if (country === "USA") return "Estados Unidos";
    if (country === "México") return "México";
    if (country === "Canadá") return "Canadá";
    return country;
  };

  const handleVenueClick = (venue) => {
    setSelectedVenue(venue);
    // En desarrollo React: cambiar a VenuesTemplate con la sede seleccionada
    // En vanilla: navegar a venues.html?city={venue.id}
    if (typeof window !== "undefined") {
      const isVanilla = !document.getElementById("root");
      if (isVanilla) {
        window.location.href = `venues.html?city=${venue.id}`;
      } else {
        // En React, cambiar al template venues
        window.history.pushState({}, "", `?template=venues&city=${venue.id}`);
        window.dispatchEvent(new PopStateEvent("popstate"));
      }
    }
  };

  const handleBackClick = () => {
    // Volver a la página de partidos (mainpage)
    if (typeof window !== "undefined") {
      const isVanilla = !document.getElementById("root");
      if (isVanilla) {
        window.location.href = "mainpage.html";
      } else {
        // En React, volver a mainpage
        window.history.pushState({}, "", "?template=mainpage");
        window.dispatchEvent(new PopStateEvent("popstate"));
      }
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-bg-secondary">
      <HeaderBar />

      {/* Contenido principal */}
      <div className="w-full max-w-[1366px] mx-auto px-4  md:px-0 lg:px-[64px]">
        {/* Botón volver - Desktop */}
        <div className="hidden lg:block pt-4 pb-6">
          <Button
            classes="text-action-default"
            color="tertiary"
            iconPosition="left"
            icon={<CaretLeftIcon />}
            onClick={handleBackClick}
          >
            Volver a partidos
          </Button>
        </div>

        {/* Título */}
        <h1 className="text-text-default text-xl font-semibold font-titillium leading-7 mb-6 mt-6 lg:mt-0 max-w-[358px] md:max-w-[548px] lg:max-w-[511px] w-full mx-auto lg:ml-0">
          Elegí una sede y explorá el Mundial desde adentro
        </h1>

        {/* Grid de sedes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-32 max-w-[358px] md:max-w-[548px] lg:max-w-none mx-auto lg:ml-0">
          {VENUES.map((venue) => (
            <button
              key={venue.id}
              onClick={() => handleVenueClick(venue)}
              className="bg-bg-primary rounded-xl p-4 md:py-2 md:px-4 flex items-center gap-4 hover:shadow-md transition-shadow text-left w-full"
            >
              {/* Imagen de la ciudad */}
              <div className="w-[60px] h-[60px] md:w-[60px] md:h-[60px] lg:w-20 lg:h-20 rounded-xl bg-bg-secondary flex-shrink-0 overflow-hidden">
                <img
                  src="https://www.figma.com/api/mcp/asset/d572076a-02db-4aa8-86e5-8eb7985c131b"
                  alt={venue.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Información */}
              <div className="flex flex-col gap-0 flex-1 min-w-0">
                <span className="text-text-default text-sm font-normal font-titillium leading-5">
                  {getCountryDisplay(venue.country)}
                </span>
                <span className="text-text-default text-xl font-semibold font-titillium leading-7">
                  {venue.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VenuesSelectionTemplate;
