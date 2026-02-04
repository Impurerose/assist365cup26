import { useState } from "react";
import HeaderBar from "../components/HeaderBar";
import Sidebar from "../components/Sidebar";
import MapContainer from "../components/MapContainer";
import MatchCard from "../components/MatchCard";
import Button from "../dsys/Button";
import VenueCard from "../components/VenueCard";
import VenueInfo from "../components/VenueInfo";
import CurrentWeather from "../components/CurrentWeather";
import TypicalWeather from "../components/TypicalWeather";
import FlightsWidget from "../components/FlightsWidget";
import AirportInfo from "../components/AirportInfo";
import TransportInfo from "../components/TransportInfo";
import USEntryRequirements from "../components/USEntryRequirements";
import AccommodationsWidget from "../components/AccommodationsWidget";
import GastronomyWidget from "../components/GastronomyWidget";
import SafetyWidget from "../components/SafetyWidget";
import PreventionWidget from "../components/PreventionWidget";
import Assist365BannersWidget from "../components/Assist365BannersWidget";
import VenuesCityGrid from "../components/VenuesCityGrid";
import Spinner from "../components/Spinner";
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
  ShareFat,
} from "@phosphor-icons/react";

/**
 * Venues Template
 * Template de exploración de sedes (placeholder)
 * Output vanilla: venues.html
 */
function VenuesTemplate() {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  // Datos de la ciudad
  const cityData = {
    name: "Kansas City, Missouri, Estados Unidos",
    description:
      "Famosa por su cultura deportiva, su hospitalidad y su legendaria barbacoa, ofrece una experiencia cómoda y amigable para el viajero internacional.",
  };

  // Datos del estadio
  const venueData = {
    image:
      "https://assistcdn.s3.us-west-1.amazonaws.com/assets/wc2026/venues/ArrowheadStadium_Kansas_EEUU.jpeg",
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

  // Datos del aeropuerto
  const airportData = {
    name: "Kansas City International (MCI)",
    description: "Kansas City International (MCI) es el principal.",
    features: [
      "Vuelos nacionales e internacionales",
      "A 30–35 minutos del centro",
    ],
    officialLink: "https://www.flykci.com/",
  };

  // Datos de traslados
  const transportData = {
    description:
      "Kansas City no cuenta con un sistema de transporte público muy extenso, el traslado en auto es clave.",
    recommendations: [
      "Uber / Lyft (muy disponibles y confiables)",
      "Alquiler de auto (ideal si te alojas fuera del centro)",
      "Servicios especiales de transporte al estadio en días de partido",
    ],
  };

  // Datos de normativas de ingreso a Estados Unidos
  const usEntryData = {
    requirements: [
      "Pasaporte vigente",
      "Visa o ESTA (según nacionalidad)",
      "Ticket de salida del país",
      "Seguro médico de viaje recomendado",
    ],
    officialLink: "https://travel.state.gov/",
  };

  // Datos de alojamientos
  const accommodationsData = [
    {
      name: "Sheraton Hotel",
      image:
        "https://www.figma.com/api/mcp/asset/ab043acf-c0ad-4656-ad5a-a118d3c9f470",
      rating: 4.3,
      reviews: "X reviews",
      priceLevel: "$$$$$",
    },
    {
      name: "Nombre Hotel",
      image:
        "https://www.figma.com/api/mcp/asset/ab043acf-c0ad-4656-ad5a-a118d3c9f470",
      rating: 4.3,
      reviews: "X reviews",
      priceLevel: "$$$",
    },
    {
      name: "Nombre Hotel",
      image:
        "https://www.figma.com/api/mcp/asset/ab043acf-c0ad-4656-ad5a-a118d3c9f470",
      rating: 4.3,
      reviews: "X reviews",
      priceLevel: "$",
    },
    {
      name: "Hilton Garden Inn",
      image:
        "https://www.figma.com/api/mcp/asset/ab043acf-c0ad-4656-ad5a-a118d3c9f470",
      rating: 4.5,
      reviews: "250 reviews",
      priceLevel: "$$$",
    },
    {
      name: "Marriott Marquis",
      image:
        "https://www.figma.com/api/mcp/asset/ab043acf-c0ad-4656-ad5a-a118d3c9f470",
      rating: 4.7,
      reviews: "1200 reviews",
      priceLevel: "$$$$",
    },
    {
      name: "Holiday Inn Express",
      image:
        "https://www.figma.com/api/mcp/asset/ab043acf-c0ad-4656-ad5a-a118d3c9f470",
      rating: 4.2,
      reviews: "300 reviews",
      priceLevel: "$$",
    },
  ];

  // Datos de gastronomía
  const gastronomyData = [
    {
      name: "La Trattoria",
      image:
        "https://www.figma.com/api/mcp/asset/ec478964-b6ac-42fd-afb8-1ab0f2cfd236",
      rating: 4.6,
      reviews: "150 reviews",
      cuisine: "Italiana, pizzería",
      priceRange: { min: "$$", max: "$$$" },
    },
    {
      name: "Sushi Haven",
      image:
        "https://www.figma.com/api/mcp/asset/ec478964-b6ac-42fd-afb8-1ab0f2cfd236",
      rating: 4.8,
      reviews: "200 reviews",
      cuisine: "Japonesa, sushi bar",
      priceRange: { min: "$", max: "$$" },
    },
    {
      name: "Café de Paris",
      image:
        "https://www.figma.com/api/mcp/asset/ec478964-b6ac-42fd-afb8-1ab0f2cfd236",
      rating: 4.2,
      reviews: "80 reviews",
      cuisine: "Francesa, brasserie",
      priceRange: { min: "$$$", max: "$$$$" },
    },
    {
      name: "Taco Fiesta",
      image:
        "https://www.figma.com/api/mcp/asset/ec478964-b6ac-42fd-afb8-1ab0f2cfd236",
      rating: 4.5,
      reviews: "120 reviews",
      cuisine: "Mexicana, taquería",
      priceRange: { min: "$", max: "$$" },
    },
    {
      name: "The Spice Route",
      image:
        "https://www.figma.com/api/mcp/asset/ec478964-b6ac-42fd-afb8-1ab0f2cfd236",
      rating: 4.7,
      reviews: "95 reviews",
      cuisine: "India, curry house",
      priceRange: { min: "$$", max: "$$$" },
    },
    {
      name: "Burger Joint",
      image:
        "https://www.figma.com/api/mcp/asset/ec478964-b6ac-42fd-afb8-1ab0f2cfd236",
      rating: 4.3,
      reviews: "300 reviews",
      cuisine: "Americana, hamburguesería",
      priceRange: { min: "$", max: "$$" },
    },
  ];

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
    <div className="w-full min-h-screen flex flex-col bg-bg-secondary pb-10">
      <HeaderBar showHamburger={true} onHamburgerClick={handleToggleSidebar} />
      <Sidebar isOpen={sidebarOpen} onClose={handleCloseSidebar} />

      {/* Overlay fijo en el bottom con degradado y blur */}
      <div
        className="fixed bottom-0 left-0 right-0 max-h-[750px] h-[750px] z-40 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(242, 242, 242, 1) 0%, rgba(242, 242, 242, 1) 33%, rgba(242, 242, 242, 0.5) 100%)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
        }}
      />

      <div className="w-full max-w-[1366px] mx-auto lg:mt-4 px-4">
        <div className="max-w-[1200px] mx-auto">
          {/* Botón Volver (solo mobile) */}
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-action-default mb-4 lg:hidden"
          >
            <CaretLeftIcon size={20} weight="regular" />
            <span className="text-base font-semibold">Volver</span>
          </button>

          {/* Botones de navegación (Desktop only) */}
          <div className="hidden lg:flex mx-auto w-full items-center justify-between">
            <Button
              variant="default"
              color="tertiary"
              iconPosition="right"
              onClick={() => (window.location.href = "mainpage.html")}
            >
              <CaretLeftIcon size={20} weight="bold" className="pr-1" />
              Volver a partidos
            </Button>
            <Button
              variant="default"
              color="secondary"
              size="large"
              onClick={() => (window.location.href = "itineraries.html")}
              icon={<AirplaneTiltIcon size={20} weight="bold" />}
              iconPosition="right"
            >
              Explorar itinerarios
            </Button>
          </div>

          <div className="max-w-[548px] lg:max-w-[996px] mx-auto">
            <div className="text-text-default text-2xl font-semibold pt-8 pb-6 flex gap-x-2">
              <MapPinLineIcon
                className="text-icon-default"
                size={32}
                weight="duotone"
              />
              {cityData.name}
            </div>

            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-x-6 gap-y-4 mb-6">
              {/* Descripción - Tablet: 1, Desktop: col izq (1) */}
              <VenueCard className="order-1 lg:order-1">
                {cityData.description}
              </VenueCard>

              {/* Partidos - Tablet: 4 (después mapa), Desktop: col der arriba (2) */}
              <div className="order-4 lg:order-2 bg-brand-darkening rounded-xl py-6 px-4 lg:px-10 flex flex-col lg:h-[836px] mt-4 lg:mt-0 lg:row-span-3">
                <span className="text-text-default text-base font-semibold block pb-3 flex-shrink-0">
                  Partidos en Kansas City
                </span>
                <div className="flex-1 overflow-y-auto min-h-0 flex flex-col gap-4 w-full max-w-[548px] lg:max-w-[368px] venues-scrollbar pr-2">
                  {kansasCityMatches.map((match, index) => (
                    <MatchCard
                      key={index}
                      match={match}
                      showMatchNumber={false}
                    />
                  ))}
                </div>
              </div>

              {/* Info Estadio - Tablet: 2, Desktop: col izq (3) */}
              <VenueCard className="order-2 lg:oaca esta ocultorder-3">
                <VenueInfo
                  image={venueData.image}
                  name={venueData.name}
                  address={venueData.address}
                  capacity={venueData.capacity}
                />
              </VenueCard>

              {/* Mapa - Tablet: 3, Desktop: col izq (5) */}
              <div className="order-3 lg:order-5 rounded-3xl overflow-hidden lg:w-[486px] h-[242px] mt-4">
                <MapContainer
                  selectedTeam={selectedTeam}
                  selectedCity={selectedCity}
                  setSelectedCity={setSelectedCity}
                />
              </div>

              {/* Clima Actual - Tablet: 5, Desktop: col izq (7) */}
              <VenueCard className="relative order-5 lg:order-7 min-h-[228px] lg:mt-4">
                <Spinner />
                <CurrentWeather />
              </VenueCard>

              {/* Clima Típico - Tablet: 8, Desktop: col der (8) */}
              <VenueCard className="order-6 lg:order-8 min-h-[228px] lg:mt-4">
                <TypicalWeather />
              </VenueCard>

              {/* Vuelos - Tablet: 6, Desktop: col izq (9) */}
              <VenueCard className="order-7 lg:order-9 min-h-[260px] lg:mt-4">
                <FlightsWidget
                  origin={flightsData.origin}
                  destination={flightsData.destination}
                  period={flightsData.period}
                  flights={flightsData.flights}
                />
              </VenueCard>

              {/* Aeropuerto - Tablet: 9, Desktop: col der (10) */}
              <VenueCard className="order-7 lg:order-10 min-h-[260px] lg:mt-4">
                <AirportInfo
                  name={airportData.name}
                  description={airportData.description}
                  features={airportData.features}
                  officialLink={airportData.officialLink}
                />
              </VenueCard>

              {/* Transporte - Tablet: 7, Desktop: col izq (11) */}
              <VenueCard className="order-8 lg:order-11 min-h-[248px] lg:mt-4">
                <TransportInfo
                  description={transportData.description}
                  recommendations={transportData.recommendations}
                />
              </VenueCard>

              {/* Requisitos USA - Tablet: 10, Desktop: col der (12) */}
              <VenueCard className="order-10 lg:order-12 min-h-[248px] lg:mt-4">
                <USEntryRequirements
                  requirements={usEntryData.requirements}
                  officialLink={usEntryData.officialLink}
                />
              </VenueCard>
            </div>

            <div className="bg-brand-darkening p-4 lg:p-6 rounded-3xl mt-4 lg:mt-10 mx-auto">
              <AccommodationsWidget hotels={accommodationsData} />
            </div>

            <div className="bg-brand-darkening p-4 lg:p-6 rounded-3xl mt-6 mx-auto">
              <GastronomyWidget restaurants={gastronomyData} />
            </div>

            <div className="grid lg:grid-cols-2 gap-4 lg:gap-6 mb-6 mt-4 lg:mt-10">
              <div className="lg:w-[486px] flex flex-col">
                <VenueCard>
                  <SafetyWidget />
                </VenueCard>
              </div>
              <div className="lg:w-[486px] self-stretch bg-bg-primary rounded-3xl">
                <VenueCard>
                  <PreventionWidget />
                </VenueCard>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full max-w-[548px] lg:max-w-full mx-auto mt-10">
          <Assist365BannersWidget />
        </div>
        <div className="w-full max-w-[548px] lg:max-w-[996px] mx-auto mt-10 lg:mt-28">
          <VenuesCityGrid />
        </div>
      </div>
    </div>
  );
}

export default VenuesTemplate;
