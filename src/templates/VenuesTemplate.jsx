import { useState } from "react";
import HeaderBar from "../components/HeaderBar";
import MapContainer from "../components/MapContainer";
import MatchCard from "../components/MatchCard";
import Button from "../dsys/Button";
import VenueCard from "../components/venues/VenueCard";
import CurrentWeather from "../components/venues/CurrentWeather";
import TypicalWeather from "../components/venues/TypicalWeather";
import {
  AirplaneTiltIcon,
  CaretLeftIcon,
  CloudSun,
  Cloud,
  CloudRain,
  CloudLightning,
  Sun,
  Thermometer,
  WarningCircle,
  MapPinAreaIcon,
  MapPinIcon,
  MapPinLineIcon,
  SoccerBallIcon,
  UsersFourIcon,
} from "@phosphor-icons/react";

/**
 * Venues Template
 * Template de exploración de sedes (placeholder)
 * Output vanilla: venues.html
 */
function VenuesTemplate() {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  // Datos de clima actual
  const currentWeather = {
    temp: "17° C",
    description: "Nubes dispersas",
  };

  // Pronóstico de 4 días
  const forecastDays = [
    {
      day: "Mié",
      Icon: Cloud,
      tempMin: "13",
      tempMax: "26",
      description: "Nubes",
    },
    {
      day: "Jue",
      Icon: CloudRain,
      tempMin: "11",
      tempMax: "24",
      description: "Lluvia ligera",
    },
    {
      day: "Vie",
      Icon: Cloud,
      tempMin: "9",
      tempMax: "20",
      description: "Nubes",
    },
    {
      day: "Sáb",
      Icon: Sun,
      tempMin: "13",
      tempMax: "26",
      description: "Soleado",
      iconColor: "text-warning-primary",
    },
  ];

  // Clima habitual
  const typicalWeatherItems = [
    { Icon: Thermometer, label: "Temperaturas:", value: "22°C a 32°C" },
    { Icon: Sun, value: "Días calurosos y húmedos" },
    { Icon: CloudLightning, value: "Posibles tormentas eléctricas aisladas" },
    {
      Icon: WarningCircle,
      value:
        "Lleva ropa liviana, gorra, protector solar y botella reutilizable.",
      alignTop: true,
    },
  ];

  const kansasCityMatches = [
    {
      team1: { name: "Jordania", flag: "🇯🇴" },
      team2: { name: "Argentina", flag: "🇦🇷" },
      date: "Sábado 27 de junio",
      city: "Dallas",
      time: { local: "22:00 h (AR)", venue: "19:00 h (DL)" },
    },
    {
      team1: { name: "Argentina", flag: "🇦🇷" },
      team2: { name: "Austria", flag: "🇦🇹" },
      date: "Lunes 22 de junio",
      city: "Dallas",
      time: { local: "13:00 h (AR)", venue: "10:00 h (DL)" },
    },
    {
      team1: { name: "Argentina", flag: "🇦🇷" },
      team2: { name: "A definir", flag: null },
      date: "Martes 16 de junio",
      city: "Kansas city",
      time: { local: "21:00 h (AR)", venue: "18:00 h (KCK)" },
    },
    {
      team1: { name: "Jordania", flag: "🇯🇴" },
      team2: { name: "Argentina", flag: "🇦🇷" },
      date: "Sábado 27 de junio",
      city: "Dallas",
      time: { local: "22:00 h (AR)", venue: "19:00 h (DL)" },
    },
    {
      team1: { name: "Argentina", flag: "🇦🇷" },
      team2: { name: "Austria", flag: "🇦🇹" },
      date: "Lunes 22 de junio",
      city: "Dallas",
      time: { local: "13:00 h (AR)", venue: "10:00 h (DL)" },
    },
    {
      team1: { name: "Argentina", flag: "🇦🇷" },
      team2: { name: "A definir", flag: null },
      date: "Martes 16 de junio",
      city: "Kansas city",
      time: { local: "21:00 h (AR)", venue: "18:00 h (KCK)" },
    },
  ];

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

          <div className="grid grid-cols-2 gap-6 max-w-[996px] mb-6">
            <div className="w-[486px] flex flex-col">
              <div className="bg-bg-primary rounded-3xl text-base text-text-default p-6">
                Famosa por su cultura deportiva, su hospitalidad y su legendaria
                barbacoa, ofrece una experiencia cómoda y amigable para el
                viajero internacional.
              </div>

              <div className="bg-bg-primary rounded-3xl text-base text-text-default p-6 mt-4">
                <img
                  src="https://assistcdn.s3.us-west-1.amazonaws.com/assets/img/affiliates/venue.png"
                  alt="Venue"
                  className="w-full h-auto rounded-2xl mb-4"
                />

                <div className="flex flex-col gap-y-4 text-base text-text-default">
                  <span className="font-semibold text-xl">
                    Arrowhead Stadium
                  </span>
                  <div className="gap-y-2 flex flex-col">
                    <span>
                      <MapPinIcon
                        className="inline-block mr-2 text-icon-lighter"
                        size={20}
                        weight="duotone"
                      />
                      1 Arrowhead Dr, Kansas City, MO 64129
                    </span>
                    <span>
                      <UsersFourIcon
                        size={20}
                        weight="duotone"
                        className="inline-block mr-2 text-icon-lighter"
                      />
                      Capacidad: 67,513
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl overflow-hidden w-[486px] h-[242px] mt-4">
                <MapContainer
                  selectedTeam={selectedTeam}
                  selectedCity={selectedCity}
                  setSelectedCity={setSelectedCity}
                />
              </div>

              <div className="bg-bg-primary rounded-3xl text-base text-text-default p-6 mt-4">
                <div className="flex flex-col gap-1">
                  <p className="text-xl font-semibold text-text-default">
                    Clima actual
                  </p>
                </div>

                <div className="flex gap-10 mt-4">
                  {/* Clima de hoy - izquierda */}
                  <div className="flex gap-2 items-center pl-4">
                    <CloudSun
                      size={40}
                      weight="duotone"
                      className="text-text-lighter"
                    />
                    <div className="flex flex-col gap-1.5 w-[98px]">
                      <p className="text-sm text-text-default">Hoy</p>
                      <div className="flex flex-col gap-1.5">
                        <p className="text-4xl font-semibold text-text-default leading-10">
                          17° C
                        </p>
                        <p className="text-sm text-text-lighter">
                          Nubes dispersas
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Pronóstico 4 días - derecha */}
                  <div className="flex flex-col gap-3 border-l border-border-primary w-full _w-[209px] pl-4">
                    {/* Miércoles */}
                    <div className="flex gap-4 items-center">
                      <div className="flex gap-4 items-center">
                        <p className="text-sm text-text-default">Mié</p>
                        <div className="flex gap-3 items-center">
                          <Cloud
                            size={24}
                            weight="duotone"
                            className="text-text-lighter"
                          />
                          <div className="flex gap-1 items-center text-sm">
                            <p className="text-text-lighter">13°</p>
                            <p className="text-text-default">26°</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-text-lighter">Nubes</p>
                    </div>

                    {/* Jueves */}
                    <div className="flex gap-4 items-center">
                      <div className="flex gap-4 items-center">
                        <p className="text-sm text-text-default">Jue</p>
                        <div className="flex gap-3 items-center">
                          <CloudRain
                            size={24}
                            weight="duotone"
                            className="text-text-lighter"
                          />
                          <div className="flex gap-1 items-center text-sm">
                            <p className="text-text-lighter">11°</p>
                            <p className="text-text-default">24°</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-text-lighter">Lluvia ligera</p>
                    </div>

                    {/* Viernes */}
                    <div className="flex gap-4 items-center">
                      <div className="flex gap-4 items-center">
                        <p className="text-sm text-text-default">Vie</p>
                        <div className="flex gap-3 items-center">
                          <Cloud
                            size={24}
                            weight="duotone"
                            className="text-text-lighter"
                          />
                          <div className="flex gap-1 items-center text-sm w-[52px] justify-end">
                            <p className="text-text-lighter">9°</p>
                            <p className="text-text-default">20°</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-text-lighter">Nubes</p>
                    </div>

                    {/* Sábado */}
                    <div className="flex gap-4 items-center">
                      <div className="flex gap-4 items-center">
                        <p className="text-sm text-text-default">Sáb</p>
                        <div className="flex gap-3 items-center">
                          <Sun
                            size={24}
                            weight="duotone"
                            className="text-warning-primary"
                          />
                          <div className="flex gap-1 items-center text-sm">
                            <p className="text-text-lighter">13°</p>
                            <p className="text-text-default">26°</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-text-lighter">Soleado</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[486px] h-[824px] self-stretch">
              <div className="bg-brand-darkening rounded-xl py-6 px-10 flex flex-col h-full">
                <span className="text-text-default text-base font-semibold block pb-3 flex-shrink-0">
                  Partidos en Kansas City
                </span>
                <div className="flex-1 overflow-y-auto min-h-0 flex flex-col gap-4">
                  {kansasCityMatches.map((match, index) => (
                    <MatchCard
                      key={index}
                      match={match}
                      showMatchNumber={false}
                    />
                  ))}
                </div>
              </div>

              <div className="bg-bg-primary rounded-3xl text-base text-text-default p-6 mt-4 min-h-[224px]">
                <p className="text-base font-semibold text-text-default">
                  Clima habitual en Junio - Julio
                </p>

                <div className="flex flex-col gap-2 mt-4">
                  {/* Temperaturas */}
                  <div className="flex gap-2 items-center">
                    <Thermometer
                      size={20}
                      weight="duotone"
                      className="text-icon-lighter"
                    />
                    <p className="text-base text-text-lighter">Temperaturas:</p>
                    <p className="text-base text-text-default">22°C a 32°C</p>
                  </div>

                  {/* Días calurosos */}
                  <div className="flex gap-2 items-center">
                    <Sun
                      size={20}
                      weight="duotone"
                      className="text-icon-lighter"
                    />
                    <p className="text-base text-text-default">
                      Días calurosos y húmedos
                    </p>
                  </div>

                  {/* Tormentas */}
                  <div className="flex gap-2 items-center">
                    <CloudLightning
                      size={20}
                      weight="duotone"
                      className="text-icon-lighter"
                    />
                    <p className="text-base text-text-default">
                      Posibles tormentas eléctricas aisladas
                    </p>
                  </div>

                  {/* Recomendación */}
                  <div className="flex gap-2 items-start">
                    <WarningCircle
                      size={20}
                      weight="duotone"
                      className="text-icon-lighter flex-shrink-0"
                    />
                    <p className="text-base text-text-default">
                      Lleva ropa liviana, gorra, protector solar y botella
                      reutilizable.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VenuesTemplate;
