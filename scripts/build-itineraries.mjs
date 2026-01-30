import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🗺️  Generando Itineraries Template (HTML + CSS + JS)...\n');

const distPath = path.join(__dirname, '..', 'dist-vanilla');

// Crear carpetas
if (!fs.existsSync(distPath)) fs.mkdirSync(distPath, { recursive: true });
if (!fs.existsSync(path.join(distPath, 'assets'))) fs.mkdirSync(path.join(distPath, 'assets'));

console.log('📝 Generando itineraries.html...\n');

// ============================================================================
// DATOS DEL ITINERARIO
// ============================================================================
const ITINERARY_DATA = {
  phases: ['Grupos', 'Llave como 1ros', 'Llave como 2dos', 'Llave como 3ros'],
  
  initialFlight: {
    origin: 'Ministro Pistarini Ezeiza (EZE)',
    destination: 'Aeropuerto Internacional de Miami (MIA)',
    flights: [
      {
        airline: 'Aerolínea',
        logo: 'https://www.figma.com/api/mcp/asset/c8f98591-ffd7-4846-9d97-65ea101be8e0',
        duration: '16h 30min',
        type: 'Directo',
        price: 'desde USD XXX'
      },
      {
        airline: 'Aerolínea 2',
        logo: 'https://www.figma.com/api/mcp/asset/c8f98591-ffd7-4846-9d97-65ea101be8e0',
        duration: '14h 32min',
        type: 'Directo',
        price: 'desde USD XXX'
      }
    ]
  },
  
  matches: [
    {
      phase: 'Octavos',
      city: { name: 'Miami (USA)', number: 1, lat: 25.7617, lng: -80.1918 },
      match: {
        team1: { name: 'Argentina', flag: '🇦🇷' },
        team2: { name: 'A definir', flag: null },
        date: 'Viernes 3 de julio',
        time: { local: '18:00 h (AR)', venue: '16:00 h (MIA)' }
      },
      flights: [
        {
          airline: 'Aerolínea',
          logo: 'https://www.figma.com/api/mcp/asset/c8f98591-ffd7-4846-9d97-65ea101be8e0',
          duration: '16h 30min',
          type: 'Directo',
          price: 'desde USD XXX'
        },
        {
          airline: 'Aerolínea 2',
          logo: 'https://www.figma.com/api/mcp/asset/c8f98591-ffd7-4846-9d97-65ea101be8e0',
          duration: '14h 32min',
          type: 'Directo',
          price: 'desde USD XXX'
        }
      ]
    },
    {
      phase: 'Cuartos',
      city: { name: 'Atlanta (USA)', number: 2, lat: 33.7490, lng: -84.3880 },
      match: {
        team1: { name: 'Argentina', flag: '🇦🇷' },
        team2: { name: 'A definir', flag: null },
        date: 'Martes 7 de julio',
        time: { local: '12:00 h (AR)', venue: '10:00 h (ATL)' }
      },
      flights: [
        {
          airline: 'Aerolínea',
          logo: 'https://www.figma.com/api/mcp/asset/c8f98591-ffd7-4846-9d97-65ea101be8e0',
          duration: '2h 15min',
          type: 'Directo',
          price: 'desde USD XXX'
        },
        {
          airline: 'Aerolínea 2',
          logo: 'https://www.figma.com/api/mcp/asset/c8f98591-ffd7-4846-9d97-65ea101be8e0',
          duration: '3h 45min',
          type: '1 escala',
          price: 'desde USD XXX'
        }
      ]
    },
    {
      phase: 'Semi',
      city: { name: 'Kansas city (USA)', number: 3, lat: 39.0997, lng: -94.5786 },
      match: {
        team1: { name: 'Argentina', flag: '🇦🇷' },
        team2: { name: 'A definir', flag: null },
        date: 'Sábado 11 de julio',
        time: { local: '21:00 h (AR)', venue: '19:00 h (KSK)' }
      },
      flights: [
        {
          airline: 'Aerolínea',
          logo: 'https://www.figma.com/api/mcp/asset/c8f98591-ffd7-4846-9d97-65ea101be8e0',
          duration: '2h 15min',
          type: 'Directo',
          price: 'desde USD XXX'
        },
        {
          airline: 'Aerolínea 2',
          logo: 'https://www.figma.com/api/mcp/asset/c8f98591-ffd7-4846-9d97-65ea101be8e0',
          duration: '3h 45min',
          type: '1 escala',
          price: 'desde USD XXX'
        }
      ]
    },
    {
      phase: '3ro',
      city: { name: 'Atlanta (USA)', number: 4, lat: 33.7490, lng: -84.3880 },
      match: {
        team1: { name: 'Argentina', flag: '🇦🇷' },
        team2: { name: 'A definir', flag: null },
        date: 'Miércoles 15 de julio',
        time: { local: '12:00 h (AR)', venue: '10:00 h (ATL)' }
      },
      flights: [
        {
          airline: 'Aerolínea',
          logo: 'https://www.figma.com/api/mcp/asset/c8f98591-ffd7-4846-9d97-65ea101be8e0',
          duration: '2h 15min',
          type: 'Directo',
          price: 'desde USD XXX'
        },
        {
          airline: 'Aerolínea 2',
          logo: 'https://www.figma.com/api/mcp/asset/c8f98591-ffd7-4846-9d97-65ea101be8e0',
          duration: '3h 45min',
          type: '1 escala',
          price: 'desde USD XXX'
        }
      ]
    },
    {
      phase: 'Final',
      city: { name: 'Nueva York (USA)', number: 5, lat: 40.7128, lng: -74.0060 },
      match: {
        team1: { name: 'Argentina', flag: '🇦🇷' },
        team2: { name: 'A definir', flag: null },
        date: 'Domingo 19 de julio',
        time: { local: '15:00 h (AR)', venue: '13:00 h (NY)' }
      },
      flights: [
        {
          airline: 'Aerolínea',
          logo: 'https://www.figma.com/api/mcp/asset/c8f98591-ffd7-4846-9d97-65ea101be8e0',
          duration: '2h 15min',
          type: 'Directo',
          price: 'desde USD XXX'
        },
        {
          airline: 'Aerolínea 2',
          logo: 'https://www.figma.com/api/mcp/asset/c8f98591-ffd7-4846-9d97-65ea101be8e0',
          duration: '3h 45min',
          type: '1 escala',
          price: 'desde USD XXX'
        }
      ]
    }
  ],
  
  flightsBetweenCities: [
    {
      airline: 'Aerolínea',
      logo: 'https://www.figma.com/api/mcp/asset/c8f98591-ffd7-4846-9d97-65ea101be8e0',
      duration: '2h 15min',
      type: 'Directo',
      price: 'desde USD XXX'
    },
    {
      airline: 'Aerolínea 2',
      logo: 'https://www.figma.com/api/mcp/asset/c8f98591-ffd7-4846-9d97-65ea101be8e0',
      duration: '3h 45min',
      type: '1 escala',
      price: 'desde USD XXX'
    }
  ]
};

// ============================================================================
// FUNCIONES GENERADORAS
// ============================================================================

function generateHeaderBar() {
  return `
    <!-- Header Bar -->
    <header class="w-full bg-white border-b border-border-primary">
      <div class="flex items-center justify-between w-full max-w-[358px] sm:max-w-[548px] lg:max-w-[1200px] mx-auto py-3 px-0 md:px-4">
        <!-- Flecha volver (mobile/tablet) -->
        <i class="ph-bold ph-arrow-left text-action-default block lg:hidden" style="font-size: 24px;"></i>

        <!-- Logo + Soccer Ball + Title (siempre visible, responsive) -->
        <div class="flex w-fit items-center">
          <!-- Logo A365 desktop -->
          <img src="https://assistcdn.s3.us-west-1.amazonaws.com/assets/site/home/img/brand/a365_logo_xa.svg" alt="A365 Logo" class="hidden lg:block" />
          
          <!-- Logo Assist mobile/tablet -->
          <img src="https://assistcdn.s3.us-west-1.amazonaws.com/assets/site/home/img/brand/Assist-logo.svg" alt="" class="block lg:hidden" />

          <!-- Gradiente para Soccer Ball -->
          <svg width="0" height="0" class="absolute">
            <defs>
              <linearGradient id="soccerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#59D3C2" stop-opacity="1" />
                <stop offset="100%" stop-color="#006FE8" stop-opacity="1" />
              </linearGradient>
            </defs>
          </svg>

          <!-- Soccer Ball responsive (mobile: 24px, desktop: 32px) -->
          <i class="ph-duotone ph-soccer-ball block lg:hidden flex-shrink-0" style="background: linear-gradient(180deg, #59D3C2 0%, #006FE8 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-size: 24px;"></i>
          <i class="ph-duotone ph-soccer-ball hidden lg:block flex-shrink-0" style="background: linear-gradient(180deg, #59D3C2 0%, #006FE8 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-size: 32px;"></i>

          <!-- Título responsive -->
          <h1 class="text-base lg:text-xl font-semibold text-text-decorative-darker">
            World Cup Map 2026
          </h1>
        </div>

        <!-- Share button with tooltip -->
        <div class="relative">
          <!-- Tooltip mobile/tablet - debajo del botón -->
          <div class="block lg:hidden absolute top-[calc(100%+14px)] left-1/2 -translate-x-1/2 bg-[#CDE9FF] text-[#31363A] px-4 py-3 rounded-xl text-base font-normal whitespace-nowrap shadow-lg z-10 leading-6">
            ¡Enlace copiado!
            <!-- Arrow pointing up -->
            <div class="absolute -top-[14px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[14px] border-b-[#CDE9FF]"></div>
          </div>
          
          <!-- Tooltip desktop - a la izquierda del botón -->
          <div class="hidden lg:block absolute right-[calc(100%+14px)] top-1/2 -translate-y-1/2 bg-[#CDE9FF] text-[#31363A] px-4 py-3 rounded-xl text-base font-normal whitespace-nowrap shadow-lg z-10 leading-6">
            ¡Enlace copiado!
            <!-- Arrow pointing right -->
            <div class="absolute -right-[14px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[14px] border-l-[#CDE9FF]"></div>
          </div>
          
          <!-- Button responsive: small en mobile, large en desktop -->
          <button class="inline-flex items-center justify-center gap-2 px-2 lg:px-4 py-[6px] lg:py-[10px] h-[36px] lg:h-[48px] text-base lg:text-lg font-semibold rounded-xl bg-brand-primary text-white hover:bg-bg-alt-secondary transition-colors">
            <span class="hidden lg:inline pl-1">Compartir</span>
            <i class="ph ph-paper-plane-tilt" style="font-size: 16px; font-weight: bold;"></i>
          </button>
        </div>
      </div>
    </header>
  `;
}

function generateNavigationButtons() {
  return `
    <div class="lg:flex items-center justify-between mb-6 max-w-[548px] lg:max-w-full mt-4 lg:mt-0 mx-auto lg:mx-0">
      <div class="flex items-center gap-x-8">
        <!-- Botón Volver (desktop) -->
        <button 
          onclick="window.history.back()"
          class="hidden lg:flex items-center justify-center gap-2 px-4 py-2 h-12 text-lg font-semibold rounded-xl text-brand-primary hover:text-bg-alt-secondary active:text-action-pressed focus:outline-none focus:ring-4 focus:ring-border-primary transition-all duration-300"
        >
          <i class="ph-bold ph-caret-left" style="font-size: 20px;"></i>
          Volver
        </button>

        <!-- Select de equipo -->
        <div class="relative pt-1 min-w-[200px] mx-auto w-full lg:w-auto">
          <select id="team-select" placeholder="Seleccioná tu equipo"></select>
        </div>
      </div>

      <!-- Botones de exploración (desktop) -->
      <div class="hidden lg:flex gap-4">
        <button 
          onclick="window.location.href='index.html'"
          class="inline-flex items-center justify-center gap-2 px-4 py-2 h-10 text-base font-semibold rounded-xl border-2 border-brand-primary text-brand-primary hover:border-bg-alt-secondary hover:text-bg-alt-secondary active:border-action-pressed active:text-action-pressed focus:outline-none focus:ring-4 focus:ring-border-primary transition-all duration-300"
        >
          <i class="ph-duotone ph-soccer-ball" style="font-size: 20px;"></i>
          Explorar partidos
        </button>

        <button 
          onclick="window.location.href='venues.html'"
          class="inline-flex items-center justify-center gap-2 px-4 py-2 h-10 text-base font-semibold rounded-xl border-2 border-brand-primary text-brand-primary hover:border-bg-alt-secondary hover:text-bg-alt-secondary active:border-action-pressed active:text-action-pressed focus:outline-none focus:ring-4 focus:ring-border-primary transition-all duration-300"
        >
          <i class="ph-duotone ph-map-pin" style="font-size: 20px;"></i>
          Explorar sedes
        </button>
      </div>
    </div>
  `;
}

function generatePhaseFilters(phases) {
  return `
    <div class="flex flex-wrap gap-2 lg:gap-4 mb-6">
      ${phases.map((phase, index) => `
        <button 
          class="phase-filter px-4 py-2 border-2 rounded-full font-semibold text-lg transition-all ${
            index === 1 
              ? 'border-brand-primary text-text-default' 
              : 'border-border-primary text-text-lighter hover:border-brand-primary hover:text-text-default'
          }"
          data-phase="${phase}"
        >
          ${phase === 'Llave como 1ros' ? 'Fase final como 1ros' : 
            phase === 'Llave como 2dos' ? 'Fase final como 2dos' : 
            phase === 'Llave como 3ros' ? 'Fase final como 3ros?' : phase}
        </button>
      `).join('')}
    </div>
  `;
}

function generateItineraryMap(cities) {
  return `
    <div id="itinerary-map" class="mb-6 rounded-3xl overflow-hidden h-[400px] lg:h-[448px] bg-bg-primary"></div>
  `;
}

function generateFlightRoute(origin, destination, flights, background = 'white') {
  const bgClass = background === 'dark' ? 'bg-brand-darkening' : 'bg-white';
  const borderClass = background === 'dark' ? '' : 'border border-border-primary';
  const textSize = 'text-sm';
  
  return `
    <div class="${bgClass} ${borderClass} rounded-xl p-4 flex flex-col gap-2 mx-auto max-w-[360px] lg:max-w-[792px]">
      <!-- Origen ↓/→ Destino - columna en mobile, fila en desktop -->
      <div class="flex flex-col lg:flex-row items-center justify-center gap-0 lg:gap-4">
        <p class="${textSize} lg:text-xl text-text-default text-center lg:text-left">${origin}</p>
        
        <!-- Flecha: abajo en mobile, derecha en desktop -->
        <i class="ph-bold ph-arrow-down text-icon-lighter lg:hidden" style="font-size: 20px;"></i>
        <i class="ph-bold ph-arrow-right text-icon-lighter hidden lg:block" style="font-size: 20px;"></i>
        
        <p class="${textSize} lg:text-xl text-text-default text-center lg:text-left">${destination}</p>
      </div>
      
      <!-- Tabla de vuelos -->
      <table class="w-full lg:w-auto lg:mx-auto">
        <tbody>
          ${flights.slice(0, 2).map(flight => `
            <tr class="text-sm">
              <td class="py-1 pr-2">
                <img src="${flight.logo}" alt="${flight.airline}" class="w-6 h-6" />
              </td>
              <td class="py-1 pr-2 text-text-default">
                ${flight.airline}
              </td>
              <td class="py-1 pr-2 text-text-lighter">
                ${flight.duration}
              </td>
              <td class="py-1 pr-2 text-text-lighter">
                ${flight.type}
              </td>
              <td class="py-1 text-text-default">
                ${flight.price}
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function generateItineraryConnector(topCircles = 4, bottomCircles = 4) {
  let topDots = Array.from({length: topCircles}).map(() => 
    '<div class="w-1 h-1 rounded-full bg-icon-lighter"></div>'
  ).join('\n              ');
  
  let bottomDots = Array.from({length: bottomCircles}).map(() => 
    '<div class="w-1 h-1 rounded-full bg-icon-lighter"></div>'
  ).join('\n              ');

  return `
    <div class="flex flex-col items-center gap-2">
      ${topDots}
      <i class="ph-fill ph-airplane text-icon-lighter rotate-180" style="font-size: 16px;"></i>
      ${bottomDots}
    </div>
  `;
}

function generateItineraryMatchCard(matchData, index, isLast) {
  const { phase, city, match, flights } = matchData;
  
  return `
    <div class="flex flex-col gap-4 max-w-[360px] lg:max-w-full mx-auto">
      <!-- Grid de 3 columnas en desktop, 2 en mobile -->
      <div class="grid grid-cols-[auto_1fr] lg:grid-cols-[368px_auto_1fr] gap-0 lg:gap-6">
        <!-- Columna 1: Match Card - SOLO DESKTOP -->
        <div class="hidden lg:block w-full overflow-visible">
          <div class="w-[350px] bg-white border border-border-primary rounded-xl px-3 py-4 flex flex-col gap-4 relative overflow-visible">
            <!-- Badge de fase -->
            <div class="absolute right-8 -top-[6px]">
              <div class="bg-[#0059BA] text-white text-sm font-normal px-2 py-1 rounded-full whitespace-nowrap" style="font-family: 'Titillium Web', sans-serif; line-height: 20px;">
                ${phase}
              </div>
            </div>

            <!-- Equipos -->
            <div class="flex items-center gap-2">
              ${match.team1.flag ? `<span class="text-xl">${match.team1.flag}</span>` : ''}
              <p class="text-base font-semibold text-text-default" style="font-family: 'Titillium Web', sans-serif;">
                ${match.team1.name} - ${match.team2.name}
              </p>
              ${match.team2.flag ? `<span class="text-xl">${match.team2.flag}</span>` : ''}
            </div>

            <!-- Información del partido -->
            <div class="flex flex-col gap-2">
              <!-- Fecha y ubicación -->
              <div class="flex items-start gap-4">
                <!-- Fecha con SVG duotone -->
                <div class="flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="3.125" y="3.125" width="13.75" height="13.75" rx="1.25" fill="#7BD0C2" opacity="0.2"/>
                    <path d="M15.625 6.25H4.375C3.68464 6.25 3.125 6.80964 3.125 7.5V15.625C3.125 16.3154 3.68464 16.875 4.375 16.875H15.625C16.3154 16.875 16.875 16.3154 16.875 15.625V7.5C16.875 6.80964 16.3154 6.25 15.625 6.25Z" stroke="#7BD0C2" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M13.125 3.75V6.25" stroke="#7BD0C2" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6.875 3.75V6.25" stroke="#7BD0C2" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <p class="text-base text-text-default" style="font-family: 'Titillium Web', sans-serif;">
                    ${match.date}
                  </p>
                </div>

                <!-- Ubicación con SVG duotone -->
                <div class="flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="8.125" r="2.5" fill="#7BD0C2" opacity="0.2"/>
                    <path d="M10 17.5C10 17.5 15.625 13.125 15.625 8.125C15.625 5.01675 13.1083 2.5 10 2.5C6.89175 2.5 4.375 5.01675 4.375 8.125C4.375 13.125 10 17.5 10 17.5Z" stroke="#7BD0C2" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="10" cy="8.125" r="2.5" stroke="#7BD0C2" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <p class="text-base text-text-default" style="font-family: 'Titillium Web', sans-serif;">
                    ${match.city}
                  </p>
                </div>
              </div>

              <!-- Horarios con SVG duotone -->
              <div class="flex items-center gap-2 text-sm">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="6.25" fill="#7BD0C2" opacity="0.2"/>
                  <circle cx="10" cy="10" r="7.5" stroke="#7BD0C2" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M10 6.25V10L12.5 12.5" stroke="#7BD0C2" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <p class="text-text-default" style="font-family: 'Titillium Web', sans-serif;">
                  ${match.time.local}
                </p>
                <p class="text-base text-text-default" style="font-family: 'Titillium Web', sans-serif;">
                  -
                </p>
                <p class="text-base text-text-default" style="font-family: 'Titillium Web', sans-serif;">
                  ${match.time.venue}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Columna 2: MapPin + Conector - SIEMPRE VISIBLE -->
        <div class="flex flex-col items-center gap-2">
          <div class="relative flex-shrink-0">
            <i class="ph-duotone ph-map-pin text-icon-lighter" style="font-size: 32px;"></i>
            ${city.number === 1 ? '<i class="ph-fill ph-number-circle-one text-brand-primary absolute top-[13px] -right-[6px]" style="font-size: 20px;"></i>' : ''}
            ${city.number === 2 ? '<i class="ph-fill ph-number-circle-two text-brand-primary absolute top-[13px] -right-[6px]" style="font-size: 20px;"></i>' : ''}
            ${city.number === 3 ? '<i class="ph-fill ph-number-circle-three text-brand-primary absolute top-[13px] -right-[6px]" style="font-size: 20px;"></i>' : ''}
            ${city.number === 4 ? '<i class="ph-fill ph-number-circle-four text-brand-primary absolute top-[13px] -right-[6px]" style="font-size: 20px;"></i>' : ''}
            ${city.number === 5 ? '<i class="ph-fill ph-number-circle-five text-brand-primary absolute top-[13px] -right-[6px]" style="font-size: 20px;"></i>' : ''}
          </div>
          ${!isLast ? `
            <!-- Connector mobile -->
            <div class="lg:hidden">
              ${generateItineraryConnector(12, 4)}
            </div>
            <!-- Connector desktop -->
            <div class="hidden lg:block">
              ${generateItineraryConnector(4, 4)}
            </div>
          ` : ''}
        </div>

        <!-- Columna 3: Cards apiladas -->
        <div class="flex flex-col gap-2 min-w-0">
          <!-- Match card - SOLO MOBILE/TABLET -->
          <div class="lg:hidden">
            <span class="pt-2 text-text-default text-xl font-semibold pl-5 mb-3 block">${city.name}</span>
            <div class="w-[350px] bg-white border border-border-primary rounded-xl px-3 py-4 flex flex-col gap-x-4 gap-y-1 relative overflow-visible">
              <!-- Badge de fase -->
              <div class="absolute right-8 -top-[6px]">
                <div class="bg-[#0059BA] text-white text-sm font-normal px-2 py-1 rounded-full whitespace-nowrap" style="font-family: 'Titillium Web', sans-serif; line-height: 20px;">
                  ${phase}
                </div>
              </div>

              <!-- Equipos -->
              <div class="flex items-center gap-2">
                ${match.team1.flag ? `<span class="text-xl">${match.team1.flag}</span>` : ''}
                <p class="text-base font-semibold text-text-default" style="font-family: 'Titillium Web', sans-serif;">
                  ${match.team1.name} - ${match.team2.name}
                </p>
                ${match.team2.flag ? `<span class="text-xl">${match.team2.flag}</span>` : ''}
              </div>

              <!-- Información del partido -->
              <div class="flex flex-col gap-2">
                <!-- Fecha y ubicación -->
                <div class="flex items-start gap-4">
                  <!-- Fecha con SVG duotone -->
                  <div class="flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <rect x="3.125" y="3.125" width="13.75" height="13.75" rx="1.25" fill="#7BD0C2" opacity="0.2"/>
                      <path d="M15.625 6.25H4.375C3.68464 6.25 3.125 6.80964 3.125 7.5V15.625C3.125 16.3154 3.68464 16.875 4.375 16.875H15.625C16.3154 16.875 16.875 16.3154 16.875 15.625V7.5C16.875 6.80964 16.3154 6.25 15.625 6.25Z" stroke="#7BD0C2" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M13.125 3.75V6.25" stroke="#7BD0C2" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M6.875 3.75V6.25" stroke="#7BD0C2" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <p class="text-base text-text-default" style="font-family: 'Titillium Web', sans-serif;">
                      ${match.date}
                    </p>
                  </div>

                  <!-- Ubicación con SVG duotone -->
                  <div class="flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="8.125" r="2.5" fill="#7BD0C2" opacity="0.2"/>
                      <path d="M10 17.5C10 17.5 15.625 13.125 15.625 8.125C15.625 5.01675 13.1083 2.5 10 2.5C6.89175 2.5 4.375 5.01675 4.375 8.125C4.375 13.125 10 17.5 10 17.5Z" stroke="#7BD0C2" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                      <circle cx="10" cy="8.125" r="2.5" stroke="#7BD0C2" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <p class="text-base text-text-default" style="font-family: 'Titillium Web', sans-serif;">
                      ${match.city}
                    </p>
                  </div>
                </div>

                <!-- Horarios con SVG duotone -->
                <div class="flex items-center gap-2 text-sm">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="6.25" fill="#7BD0C2" opacity="0.2"/>
                    <circle cx="10" cy="10" r="7.5" stroke="#7BD0C2" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10 6.25V10L12.5 12.5" stroke="#7BD0C2" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <p class="text-text-default" style="font-family: 'Titillium Web', sans-serif;">
                    ${match.time.local}
                  </p>
                  <p class="text-base text-text-default" style="font-family: 'Titillium Web', sans-serif;">
                    -
                  </p>
                  <p class="text-base text-text-default" style="font-family: 'Titillium Web', sans-serif;">
                    ${match.time.venue}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Nombre de ciudad - SOLO DESKTOP -->
          <div class="hidden lg:flex items-center gap-2">
            <span class="text-text-default text-xl font-semibold">${city.name}</span>
          </div>

          <!-- Card de vuelos con bg-brand-darkening -->
          ${flights && flights.length > 0 ? `
            <div class="w-[350px] rounded-xl p-4 flex flex-col gap-2" style="background-color: rgba(81, 90, 96, 0.06);">
              ${flights.slice(0, 2).map(flight => `
                <div class="flex items-center gap-2 w-full">
                  <!-- Logo + Aerolínea + Duración -->
                  <div class="flex items-center gap-2">
                    <div class="flex items-center gap-1">
                      <img src="${flight.logo}" alt="${flight.airline}" class="w-6 h-6 object-cover" />
                      <span class="text-sm text-text-default leading-5" style="font-family: 'Titillium Web', sans-serif;">
                        ${flight.airline}
                      </span>
                    </div>
                    <span class="text-sm text-text-lighter leading-5" style="font-family: 'Titillium Web', sans-serif;">
                      ${flight.duration}
                    </span>
                  </div>

                  <!-- Tipo -->
                  <span class="text-sm text-text-lighter leading-5" style="font-family: 'Titillium Web', sans-serif;">
                    ${flight.type}
                  </span>

                  <!-- Precio -->
                  <span class="text-sm text-text-default leading-5" style="font-family: 'Titillium Web', sans-serif;">
                    ${flight.price}
                  </span>
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}

function generateCountryRequirements() {
  const countries = [
    {
      name: 'Estados Unidos',
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
      name: 'Canadá',
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
      name: 'México',
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

  return `
    <div class="mt-14 bg-white border border-border-primary rounded-3xl p-4 lg:px-6 lg:py-6 mb-10 lg:mb-6 max-w-[548px] lg:max-w-[996px] mx-auto">
      <div class="grid lg:grid-cols-3 gap-6 lg:gap-8">
        ${countries.map(country => `
          <div class="flex flex-col gap-2">
            <p class="text-xl font-semibold text-text-default">Normativas de Ingreso a ${country.name}</p>
            <ul class="flex flex-col gap-1 list-disc ml-6">
              ${country.requirements.map(req => `
                <li class="text-base text-text-default">${req}</li>
              `).join('')}
            </ul>
            <a href="${country.linkUrl}" target="_blank" class="flex gap-1 items-center text-base font-semibold text-action-default hover:underline px-4 py-2 w-fit">
              ${country.linkText}
              <i class="ph ph-arrow-square-out" style="font-size: 16px;"></i>
            </a>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function generateAssist365Banners() {
  return `
    <div class="w-full max-w-[548px] lg:max-w-full mx-auto mt-10">
      <div class="flex gap-6 items-center justify-center">
        <!-- 1. Icono amarillo - Maleta (hidden en mobile) -->
        <div class="hidden lg:flex bg-brand-comp-yellow rounded-full w-[176px] h-[280px] items-center justify-center px-[27px] py-[78px]">
          <i class="ph-duotone ph-suitcase-rolling text-white" style="font-size: 123px;"></i>
        </div>
        
        <!-- 2. Card lila - Worldcup Care -->
        <div class="bg-brand-comp-lilac rounded-2xl w-full lg:w-[486px] lg:h-[280px] p-4 lg:p-6 flex flex-col gap-6 justify-center relative overflow-hidden">
          <img src="https://assistcdn.s3.us-west-1.amazonaws.com/assets/site/banner/shape3.svg" alt="" class="absolute right-0 top-1/2 -translate-y-1/2 w-[143px] h-[300px]" />
          <div class="flex flex-col gap-1 relative z-10">
            <p class="text-2xl font-bold text-white">Worldcup Care</p>
            <p class="text-base text-white">Viajá al mundial con la tranquilidad de Assist 365</p>
          </div>
          <button class="bg-action-default hover:bg-action-hover active:bg-action-pressed text-white font-semibold px-4 py-2 rounded-xl flex items-center gap-1 w-fit h-[36px] transition-colors relative z-10">
            Contratar ahora
            <i class="ph-bold ph-arrow-right text-white" style="font-size: 16px;"></i>
          </button>
        </div>
        
        <!-- 3. Card verde - Pelota -->
        <div class="bg-brand-comp-green rounded-xl w-[278px] h-[280px] items-center justify-center p-[62px] hidden lg:flex">
          <i class="ph-duotone ph-soccer-ball text-icon-darker" style="font-size: 123px;"></i>
        </div>
        
        <!-- 4. Icono celeste - Avión -->
        <div class="bg-brand-comp-lightblue rounded-full w-[280px] h-[280px] hidden lg:flex items-center justify-center p-[62px]">
          <i class="ph-duotone ph-airplane-tilt text-white" style="font-size: 156px;"></i>
        </div>
      </div>
    </div>
  `;
}

function generateVenuesCityGrid() {
  return `
    <div class="w-full max-w-[548px] lg:max-w-[996px] mx-auto mt-10 lg:mt-6">
      <div class="grid lg:grid-cols-[282px_282px_1fr] grid-cols-1 gap-y-4 lg:gap-y-0 lg:gap-x-6 gap-x-0">
        <!-- Ciudad 1 -->
        <div class="bg-bg-primary rounded-2xl p-4 flex items-center gap-4 flex-1">
          <div class="overflow-hidden rounded-2xl flex-shrink-0">
            <img src="https://placehold.co/80x80" alt="Ciudad" />
          </div>
          <div class="flex flex-col">
            <span class="text-text-secondary text-sm">Estados Unidos</span>
            <span class="text-text-default text-xl font-semibold">Miami</span>
          </div>
        </div>
        
        <!-- Ciudad 2 -->
        <div class="bg-bg-primary rounded-2xl p-4 flex items-center gap-4 flex-1">
          <div class="overflow-hidden rounded-2xl flex-shrink-0">
            <img src="https://placehold.co/80x80" alt="Ciudad" />
          </div>
          <div class="flex flex-col">
            <span class="text-text-secondary text-sm">Estados Unidos</span>
            <span class="text-text-default text-xl font-semibold">Atlanta</span>
          </div>
        </div>
        
        <!-- Card de acción -->
        <div class="bg-bg-primary rounded-2xl p-4 flex items-center gap-4 flex-1">
          <div class="w-20 h-20 bg-brand-comp-lightblue rounded-2xl flex items-center justify-center flex-shrink-0">
            <i class="ph-duotone ph-map-pin-line text-icon-default" style="font-size: 32px;"></i>
          </div>
          <div class="flex flex-col gap-2">
            <button 
              onclick="window.location.href='venues.html'"
              class="whitespace-nowrap overflow-hidden text-ellipsis font-semibold rounded-xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-offset-0 text-lg py-[10px] h-[48px] px-4 w-fit text-brand-primary hover:text-bg-alt-secondary active:text-action-pressed focus:border-bg-alt-secondary focus:text-bg-alt-secondary focus:border-transparent focus:ring-border-primary focus:ring-opacity-100 flex items-center justify-center gap-2"
            >
              <span>Explorar todas las sedes</span>
              <i class="ph-bold ph-arrow-right" style="font-size: 20px;"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ============================================================================
// HTML TEMPLATE COMPLETO
// ============================================================================
const htmlTemplate = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Itinerarios - World Cup Map 2026</title>
  
  <!-- Styles -->
  <link rel="stylesheet" href="assets/styles.css">
  
  <!-- Tom Select CSS -->
  <link href="https://cdn.jsdelivr.net/npm/tom-select@2.3.1/dist/css/tom-select.css" rel="stylesheet">
  
  <!-- Phosphor Icons -->
  <script src="https://unpkg.com/@phosphor-icons/web@2.1.1"></script>
  
  <!-- Leaflet CSS -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  
  <!-- Titillium Web Font -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300;400;600;700&display=swap" rel="stylesheet">
</head>
<body class="bg-bg-secondary">
  ${generateHeaderBar()}
  
  <main class="w-full max-w-[1366px] mx-auto lg:mt-4 pb-10">
    <div class="max-w-[1200px] mx-auto px-4 lg:px-0">
      
      ${generateNavigationButtons()}

      <!-- Container con ancho del mapa -->
      <div class="max-w-[548px] lg:max-w-[792px] mx-auto">
        <!-- Título principal -->
        <h1 class="text-text-default text-2xl lg:text-3xl font-semibold pt-4 lg:pt-8 pb-4">
          Cómo moverte entre sedes durante el Mundial
        </h1>

        <!-- Subtítulo -->
        <p class="text-text-default text-lg lg:text-xl pb-4">
          Mirá cómo sería el camino a la final en cada fase:
        </p>

        <!-- Filtros de fase (chips) -->
        ${generatePhaseFilters(ITINERARY_DATA.phases)}
      </div>

      <div class="lg:max-w-[792px] mx-auto">
        <!-- Mapa -->
        ${generateItineraryMap(ITINERARY_DATA.matches.map(m => m.city))}

        <!-- Vuelo inicial -->
        <div class="mb-6">
          ${generateFlightRoute(
            ITINERARY_DATA.initialFlight.origin,
            ITINERARY_DATA.initialFlight.destination,
            ITINERARY_DATA.initialFlight.flights,
            'dark'
          )}
        </div>

        <!-- Lista de partidos del itinerario -->
        <div class="-left-4 lg:left-0 relative flex flex-col gap-6 gap-y-0 mb-14 lg:mb-20 max-w-[792px] pt-3 mx-auto">
          ${ITINERARY_DATA.matches.map((match, index) => 
            generateItineraryMatchCard(match, index, index === ITINERARY_DATA.matches.length - 1)
          ).join('\n')}
        </div>
      </div>

      <!-- Normativas de ingreso -->
      ${generateCountryRequirements()}
    </div>

    <!-- Grid de ciudades -->
    ${generateVenuesCityGrid()}
  </main>

  <!-- Leaflet JS -->
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  
  <!-- Tom Select JS -->
  <script src="https://cdn.jsdelivr.net/npm/tom-select@2.3.1/dist/js/tom-select.complete.min.js"></script>
  
  <!-- App JavaScript -->
  <script>
    // ========================================================================
    // DATOS
    // ========================================================================
    const TEAMS = [
      { id: 'argentina', name: 'Argentina', flag: '🇦🇷' },
      { id: 'brasil', name: 'Brasil', flag: '🇧🇷' },
      { id: 'uruguay', name: 'Uruguay', flag: '🇺🇾' },
      { id: 'chile', name: 'Chile', flag: '🇨🇱' },
      { id: 'colombia', name: 'Colombia', flag: '🇨🇴' }
    ];

    const CITIES = ${JSON.stringify(ITINERARY_DATA.matches.map(m => m.city))};

    // ========================================================================
    // INICIALIZACIÓN
    // ========================================================================
    document.addEventListener('DOMContentLoaded', () => {
      // Tom Select para equipos
      const teamSelect = new TomSelect('#team-select', {
        options: TEAMS.map(team => ({
          value: team.id,
          text: team.flag + ' ' + team.name
        })),
        placeholder: 'Seleccioná tu equipo',
        render: {
          option: function(data, escape) {
            return '<div>' + data.text + '</div>';
          },
          item: function(data, escape) {
            return '<div>' + data.text + '</div>';
          }
        }
      });

      // Filtros de fase
      const phaseFilters = document.querySelectorAll('.phase-filter');
      phaseFilters.forEach(filter => {
        filter.addEventListener('click', () => {
          phaseFilters.forEach(f => {
            f.classList.remove('border-brand-primary', 'text-text-default');
            f.classList.add('border-border-primary', 'text-text-lighter');
          });
          filter.classList.remove('border-border-primary', 'text-text-lighter');
          filter.classList.add('border-brand-primary', 'text-text-default');
          
          console.log('Fase seleccionada:', filter.dataset.phase);
        });
      });

      // Mapa Leaflet
      const map = L.map('itinerary-map').setView([37.0902, -95.7129], 4);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      // Agregar marcadores numerados
      CITIES.forEach((city, index) => {
        const marker = L.marker([city.lat, city.lng]).addTo(map);
        
        const divIcon = L.divIcon({
          html: \`
            <div style="background: #006FE8; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">
              \${city.number}
            </div>
          \`,
          className: '',
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });
        
        marker.setIcon(divIcon);
        marker.bindPopup(\`<b>\${city.name}</b>\`);
      });

      // Conectar ciudades con líneas
      for (let i = 0; i < CITIES.length - 1; i++) {
        const latlngs = [
          [CITIES[i].lat, CITIES[i].lng],
          [CITIES[i + 1].lat, CITIES[i + 1].lng]
        ];
        L.polyline(latlngs, {
          color: '#006FE8',
          weight: 3,
          opacity: 0.6,
          dashArray: '10, 5'
        }).addTo(map);
      }

      console.log('✅ Itineraries Template cargado');
    });
  </script>
</body>
</html>`;

// ============================================================================
// ESCRIBIR ARCHIVOS
// ============================================================================
fs.writeFileSync(path.join(distPath, 'itineraries.html'), htmlTemplate);
console.log('✅ HTML generado\n');

// Compilar CSS
console.log('🎨 Compilando Tailwind CSS...\n');
try {
  execSync(
    `npx tailwindcss -i ./src/index.css -o ${distPath}/assets/styles.css --minify`,
    { stdio: 'inherit' }
  );
  console.log('✅ CSS compilado\n');
} catch (error) {
  console.error('❌ Error compilando CSS:', error.message);
  process.exit(1);
}

// Resumen
console.log('📦 Archivos generados:');
console.log('  📝 itineraries.html');
console.log('  🎨 assets/styles.css\n');
console.log(`✅ Build Itineraries completado en: ${distPath}/itineraries.html\n`);
console.log('💡 Para ver: npm run dev o abrí dist-vanilla/itineraries.html\n');
