import { useState } from "react";
import HeaderBar from "../components/HeaderBar";
import MapContainer from "../components/MapContainer";
import MatchCard from "../components/MatchCard";
import Button from "../dsys/Button";
import VenueCard from "../components/VenueCard";
import VenueInfo from "../components/VenueInfo";
import CurrentWeather from "../components/CurrentWeather";
import TypicalWeather from "../components/TypicalWeather";
import FlightsWidget from "../components/FlightsWidget";
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

  // Datos de la ciudad
  const cityData = {
    name: "Kansas City, Missouri, Estados Unidos",
    description:
      "Famosa por su cultura deportiva, su hospitalidad y su legendaria barbacoa, ofrece una experiencia cómoda y amigable para el viajero internacional.",
  };

  // Datos del estadio
  const venueData = {
    image:
      "https://assistcdn.s3.us-west-1.amazonaws.com/assets/img/affiliates/venue.png",
    name: "Arrowhead Stadium",
    address: "1 Arrowhead Dr, Kansas City, MO 64129",
    capacity: "67,513",
  };

  // Datos de vuelos
  const flightsData = {
    origin: "Ministro Pistarini Ezeiza (EZE)",
    destination: "Kansas City International (MCI)",
    period: "Junio - Julio",
    flights: [
      {
        airline: "Aerolinea",
        logo: "https://www.figma.com/api/mcp/asset/c8f98591-ffd7-4846-9d97-65ea101be8e0",
        duration: "16h 30min",
        type: "Directo",
        price: "desde USD XXX",
      },
      {
        airline: "Aerolinea2",
        logo: "https://www.figma.com/api/mcp/asset/c8f98591-ffd7-4846-9d97-65ea101be8e0",
        duration: "14h 32min",
        type: "Directo",
        price: "desde USD XXX",
      },
      {
        airline: "Aerolinea3",
        logo: "https://www.figma.com/api/mcp/asset/c8f98591-ffd7-4846-9d97-65ea101be8e0",
        duration: "17h 42min",
        type: "Conexión",
        price: "desde USD XXX",
      },
      {
        airline: "Aerolinea4",
        logo: "https://www.figma.com/api/mcp/asset/c8f98591-ffd7-4846-9d97-65ea101be8e0",
        duration: "22h 7min",
        type: "Conexión",
        price: "desde USD XXX",
      },
    ],
  };

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
    <div className="w-full min-h-screen flex flex-col bg-bg-secondary mb-10">
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
            {cityData.name}
          </div>

          <div className="grid grid-cols-2 gap-6 max-w-[996px] mb-6">
            <div className="w-[486px] flex flex-col">
              <VenueCard>{cityData.description}</VenueCard>

              <VenueCard className="mt-4">
                <VenueInfo
                  image={venueData.image}
                  name={venueData.name}
                  address={venueData.address}
                  capacity={venueData.capacity}
                />
              </VenueCard>

              <div className="rounded-3xl overflow-hidden w-[486px] h-[242px] mt-4">
                <MapContainer
                  selectedTeam={selectedTeam}
                  selectedCity={selectedCity}
                  setSelectedCity={setSelectedCity}
                />
              </div>

              <VenueCard className="mt-4">
                <CurrentWeather />
              </VenueCard>

              <VenueCard className="mt-4">
                <FlightsWidget
                  origin={flightsData.origin}
                  destination={flightsData.destination}
                  period={flightsData.period}
                  flights={flightsData.flights}
                />
              </VenueCard>
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

              <VenueCard className="mt-4 min-h-[224px]">
                <TypicalWeather />
              </VenueCard>

              <VenueCard className="mt-4">

                
              </VenueCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VenuesTemplate;
