import { useState } from 'react';
import HeaderBar from '../components/HeaderBar';
import Button from '../dsys/Button';
import PhaseFilters from '../components/PhaseFilters';
import ItineraryMapView from '../components/ItineraryMapView';
import FlightRoute from '../components/FlightRoute';
import ItineraryMatchCard from '../components/ItineraryMatchCard';
import CountryRequirementsCard from '../components/CountryRequirementsCard';
import VenuesCityGrid from '../components/VenuesCityGrid';
import Assist365BannersWidget from '../components/Assist365BannersWidget';
import { AirplaneTiltIcon, CaretLeftIcon, MapPinIcon, SoccerBallIcon } from '@phosphor-icons/react';

/**
 * Itineraries Template
 * Template de itinerarios camino a la final
 * Output vanilla: itineraries.html
 */
function ItinerariesTemplate() {
  const [activePhase, setActivePhase] = useState('Fase final como 1ros');
  const [selectedCity, setSelectedCity] = useState(null);

  // Datos de fases
  const phases = [
    'Grupos',
    'Fase final como 1ros',
    'Fase final como 2dos',
    'Fase final como 3ros?'
  ];

  // Datos del mapa con ciudades numeradas
  const cities = [
    { 
      name: 'Miami (USA)', 
      shortName: 'Miami',
      number: 1,
      mapPosition: { x: '75%', y: '65%' }
    },
    { 
      name: 'Atlanta (USA)', 
      shortName: 'Atlanta',
      number: 2,
      mapPosition: { x: '72%', y: '52%' }
    },
    { 
      name: 'Kansas city (USA)', 
      shortName: 'Kansas city',
      number: 3,
      mapPosition: { x: '52%', y: '42%' }
    },
    { 
      name: 'Atlanta (USA)', 
      shortName: 'Atlanta',
      number: 4,
      mapPosition: { x: '72%', y: '52%' }
    },
    { 
      name: 'Nueva York (USA)', 
      shortName: 'Nueva York',
      number: 5,
      mapPosition: { x: '80%', y: '38%' }
    }
  ];

  // Datos del vuelo inicial
  const initialFlight = {
    origin: 'Ministro Pistarini Ezeiza (EZE)',
    destination: 'Aeropuerto Internacional de Miami (MIA)',
    flights: [
      {
        airline: 'Aerolinea',
        logo: 'https://www.figma.com/api/mcp/asset/c8f98591-ffd7-4846-9d97-65ea101be8e0',
        duration: '16h 30min',
        type: 'Directo',
        price: 'desde USD XXX'
      },
      {
        airline: 'Aerolinea2',
        logo: 'https://www.figma.com/api/mcp/asset/c8f98591-ffd7-4846-9d97-65ea101be8e0',
        duration: '14h 32min',
        type: 'Directo',
        price: 'desde USD XXX'
      }
    ]
  };

  // Datos de los partidos del itinerario
  const itineraryMatches = [
    {
      match: {
        team1: { name: 'Argentina', flag: '🇦🇷' },
        team2: { name: 'A definir', flag: null },
        date: 'Viernes 3 de julio',
        city: 'Miami',
        time: { local: '18:00 h (AR)', venue: '16:00 h (MIA)' }
      },
      phase: 'Octavos',
      city: { name: 'Miami (USA)', number: 1 },
      flights: [
        {
          airline: 'Aerolinea',
          logo: 'https://www.figma.com/api/mcp/asset/c8f98591-ffd7-4846-9d97-65ea101be8e0',
          duration: '16h 30min',
          type: 'Directo',
          price: 'desde USD XXX'
        },
        {
          airline: 'Aerolinea2',
          logo: 'https://www.figma.com/api/mcp/asset/c8f98591-ffd7-4846-9d97-65ea101be8e0',
          duration: '14h 32min',
          type: 'Directo',
          price: 'desde USD XXX'
        }
      ]
    },
    {
      match: {
        team1: { name: 'Argentina', flag: '🇦🇷' },
        team2: { name: 'A definir', flag: null },
        date: 'Martes 7 de julio',
        city: 'Atlanta',
        time: { local: '12:00 h (AR)', venue: '10:00 h (ATL)' }
      },
      phase: 'Cuartos',
      city: { name: 'Atlanta (USA)', number: 2 },
      flights: [
        {
          airline: 'Aerolinea',
          logo: 'https://www.figma.com/api/mcp/asset/c8f98591-ffd7-4846-9d97-65ea101be8e0',
          duration: '16h 30min',
          type: 'Directo',
          price: 'desde USD XXX'
        },
        {
          airline: 'Aerolinea2',
          logo: 'https://www.figma.com/api/mcp/asset/c8f98591-ffd7-4846-9d97-65ea101be8e0',
          duration: '14h 32min',
          type: 'Directo',
          price: 'desde USD XXX'
        }
      ]
    },
    {
      match: {
        team1: { name: 'Argentina', flag: '🇦🇷' },
        team2: { name: 'A definir', flag: null },
        date: 'Sábado 11 de julio',
        city: 'Kansas city',
        time: { local: '21:00 h (AR)', venue: '19:00 h (KSK)' }
      },
      phase: 'Semi',
      city: { name: 'Kansas city (USA)', number: 3 },
      flights: [
        {
          airline: 'Aerolinea',
          logo: 'https://www.figma.com/api/mcp/asset/c8f98591-ffd7-4846-9d97-65ea101be8e0',
          duration: '16h 30min',
          type: 'Directo',
          price: 'desde USD XXX'
        },
        {
          airline: 'Aerolinea2',
          logo: 'https://www.figma.com/api/mcp/asset/c8f98591-ffd7-4846-9d97-65ea101be8e0',
          duration: '14h 32min',
          type: 'Directo',
          price: 'desde USD XXX'
        }
      ]
    },
    {
      match: {
        team1: { name: 'Argentina', flag: '🇦🇷' },
        team2: { name: 'A definir', flag: null },
        date: 'Miércoles 15 de julio',
        city: 'Atlanta',
        time: { local: '12:00 h (AR)', venue: '10:00 h (ATL)' }
      },
      phase: '3ro',
      city: { name: 'Atlanta (USA)', number: 4 },
      flights: [
        {
          airline: 'Aerolinea',
          logo: 'https://www.figma.com/api/mcp/asset/c8f98591-ffd7-4846-9d97-65ea101be8e0',
          duration: '16h 30min',
          type: 'Directo',
          price: 'desde USD XXX'
        },
        {
          airline: 'Aerolinea2',
          logo: 'https://www.figma.com/api/mcp/asset/c8f98591-ffd7-4846-9d97-65ea101be8e0',
          duration: '14h 32min',
          type: 'Directo',
          price: 'desde USD XXX'
        }
      ]
    },
    {
      match: {
        team1: { name: 'Argentina', flag: '🇦🇷' },
        team2: { name: 'A definir', flag: null },
        date: 'Domingo 19 de julio',
        city: 'Nueva York',
        time: { local: '15:00 h (AR)', venue: '13:00 h (NY)' }
      },
      phase: 'Final',
      city: { name: 'Nueva York (USA)', number: 5 },
      flights: [
        {
          airline: 'Aerolinea',
          logo: 'https://www.figma.com/api/mcp/asset/c8f98591-ffd7-4846-9d97-65ea101be8e0',
          duration: '16h 30min',
          type: 'Directo',
          price: 'desde USD XXX'
        },
        {
          airline: 'Aerolinea2',
          logo: 'https://www.figma.com/api/mcp/asset/c8f98591-ffd7-4846-9d97-65ea101be8e0',
          duration: '14h 32min',
          type: 'Directo',
          price: 'desde USD XXX'
        }
      ]
    }
  ];

  // Datos de normativas por país
  const countryRequirements = [
    {
      countryName: 'Estados Unidos',
      requirements: [
        'Pasaporte vigente',
        'Visa o ESTA (según nacionalidad)',
        'Ticket de salida del país',
        'Seguro médico de viaje recomendado'
      ],
      linkText: 'Más info US gov',
      linkUrl: 'https://travel.state.gov/'
    },
    {
      countryName: 'Canadá',
      requirements: [
        'Pasaporte vigente',
        'Visa o eTA (según nacionalidad)',
        'Ticket de salida del país',
        'Seguro médico de viaje recomendado'
      ],
      linkText: 'Más info Canada.gov',
      linkUrl: 'https://www.canada.ca/'
    },
    {
      countryName: 'México',
      requirements: [
        'Pasaporte vigente',
        'Visa o exención (según nacionalidad)',
        'FMM (Tarjeta de turista)',
        'Ticket de salida del país'
      ],
      linkText: 'Más info Mexico.gob',
      linkUrl: 'https://www.gob.mx/'
    }
  ];

  return (
    <div className="w-full min-h-screen flex flex-col bg-bg-secondary pb-10">
      <HeaderBar />
      
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

          {/* Botones de navegación (desktop) */}
          <div className="hidden lg:flex items-center justify-between mb-6">
            <Button
              variant="default"
              color="tertiary"
              size="large"
              onClick={() => window.history.back()}
            >
              <CaretLeftIcon size={20} weight="bold" />
              Volver
            </Button>
            
            <div className="flex gap-4">
              <Button
                variant="default"
                color="secondary"
                size="large"
                onClick={() => window.location.href = 'mainpage.html'}
              >
                <SoccerBallIcon size={20} weight="duotone" />
                Explorar partidos
              </Button>

              <Button
                variant="default"
                color="secondary"
                size="large"
                onClick={() => window.location.href = 'venuesSelection.html'}
              >
                <MapPinIcon size={20} weight="duotone" />
                Explorar sedes
              </Button>
            </div>
          </div>

          {/* Container con mismo ancho que el mapa */}
          <div className="max-w-[792px] mx-auto">
            
            {/* Título principal */}
            <h1 className="text-text-default text-2xl lg:text-3xl font-semibold pt-4 lg:pt-8 pb-4">
              Cómo moverte entre sedes durante el Mundial
            </h1>

            {/* Subtítulo */}
            <p className="text-text-default text-lg lg:text-xl pb-6">
              Mirá cómo sería el camino a la final en cada fase:
            </p>

            {/* Filtros de fase */}
            <div className="mb-6">
              <PhaseFilters 
                phases={phases}
                activePhase={activePhase}
                onPhaseChange={setActivePhase}
              />
            </div>

            {/* Mapa */}
            <div className="mb-6">
              <ItineraryMapView 
                selectedCity={selectedCity}
                onCitySelect={setSelectedCity}
              />
            </div>

            {/* Vuelo inicial */}
            <div className="mb-6">
              <FlightRoute 
                background="dark"
                size="small"
                origin={initialFlight.origin}
                destination={initialFlight.destination}
                flights={initialFlight.flights}
              />
            </div>

            {/* Lista de partidos del itinerario */}
            <div className="flex flex-col gap-6 gap-y-0 mb-10">
              {itineraryMatches.map((item, index) => (
                <ItineraryMatchCard
                  key={index}
                  match={item.match}
                  phase={item.phase}
                  city={item.city}
                  flights={item.flights}
                  showConnection={index < itineraryMatches.length - 1}
                />
              ))}
            </div>

            {/* Normativas de ingreso - Grid 3 columnas */}
            <div className="bg-white border border-border-primary rounded-3xl p-4 lg:p-6 mb-10">
              <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
                {countryRequirements.map((country, index) => (
                  <CountryRequirementsCard
                    key={index}
                    countryName={country.countryName}
                    requirements={country.requirements}
                    linkText={country.linkText}
                    linkUrl={country.linkUrl}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Banner promocional */}
        <div className="w-full max-w-[548px] lg:max-w-full mx-auto mt-10">
          <Assist365BannersWidget />
        </div>

        {/* Grid de ciudades */}
        <div className="w-full max-w-[548px] lg:max-w-[996px] mx-auto mt-10 lg:mt-28">
          <VenuesCityGrid />
        </div>
      </div>
    </div>
  );
}

export default ItinerariesTemplate;
