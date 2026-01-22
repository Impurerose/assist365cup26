import HeaderBar from "../components/HeaderBar";
import Button from "../dsys/Button";
import {
  AirplaneTiltIcon,
  CaretLeftIcon,
  MapPinAreaIcon,
  MapPinIcon,
  MapPinLineIcon,
  SoccerBallIcon,
} from "@phosphor-icons/react";

/**
 * Venues Template
 * Template de exploración de sedes (placeholder)
 * Output vanilla: venues.html
 */
function VenuesTemplate() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-bg-secondary">
      <HeaderBar />
      <div className="w-full max-w-[1366px] mx-auto mt-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="mx-auto w-full flex items-center justify-between">
            <Button
              color="tertiary"
              iconPosition="left"
              classes="w-fit"
              icon={<CaretLeftIcon />}
              onClick={() => {
                // En desarrollo React: cambiar template
                // En vanilla: navegar a mainpage.html
                if (typeof window !== "undefined") {
                  const isVanilla = !document.getElementById("root");
                  if (isVanilla) {
                    window.location.href = "mainpage.html";
                  }
                }
              }}
            >
              Volver a partidos
            </Button>
            <Button
              color="secondary"
              iconPosition="left"
              icon={<AirplaneTiltIcon />}
              onClick={() => {
                // En desarrollo React: cambiar template
                // En vanilla: navegar a venues.html
                if (typeof window !== "undefined") {
                  const isVanilla = !document.getElementById("root");
                  if (isVanilla) {
                    window.location.href = "venues.html";
                  }
                }
              }}
            >
              Explorar itinerarios
            </Button>
          </div>

          <div className="text-text-default text-2xl font-semibold pt-8 pb-6 flex gap-x-2">
            <MapPinLineIcon
              className="text-icon-default"
              size={32}
              weight="duotone"
            />
            Kansas City, Missouri, Estados Unidos
          </div>
        </div>
      </div>
    </div>
  );
}

export default VenuesTemplate;
