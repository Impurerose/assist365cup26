import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🗺️  Generando Venues Template (HTML + CSS)...\n');

const distPath = path.join(__dirname, '..', 'dist-vanilla');

// 1. Crear carpeta si no existe
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath, { recursive: true });
}
if (!fs.existsSync(path.join(distPath, 'assets'))) {
  fs.mkdirSync(path.join(distPath, 'assets'));
}

console.log('📝 Generando venues.html...\n');

// ============================================================================
// DATOS MOCK (extraídos de VenuesTemplate.jsx)
// ============================================================================

const cityData = {
  name: "Kansas City, Missouri, Estados Unidos",
  description: "Famosa por su cultura deportiva, su hospitalidad y su legendaria barbacoa, ofrece una experiencia cómoda y amigable para el viajero internacional."
};

const venueData = {
  image: "https://assistcdn.s3.us-west-1.amazonaws.com/assets/img/affiliates/venue.png",
  name: "Arrowhead Stadium",
  address: "1 Arrowhead Dr, Kansas City, MO 64129",
  capacity: "67,513"
};

const flightsData = {
  origin: "Ministro Pistarini Ezeiza (EZE)",
  destination: "Kansas City International (MCI)",
  period: "Junio - Julio",
  flights: [
    { airline: "Aerolinea", logo: "https://www.figma.com/api/mcp/asset/c8f98591-ffd7-4846-9d97-65ea101be8e0", duration: "16h 30min", type: "Directo", price: "desde USD XXX" },
    { airline: "Aerolinea2", logo: "https://www.figma.com/api/mcp/asset/c8f98591-ffd7-4846-9d97-65ea101be8e0", duration: "14h 32min", type: "Directo", price: "desde USD XXX" },
    { airline: "Aerolinea3", logo: "https://www.figma.com/api/mcp/asset/c8f98591-ffd7-4846-9d97-65ea101be8e0", duration: "17h 42min", type: "Conexión", price: "desde USD XXX" },
    { airline: "Aerolinea4", logo: "https://www.figma.com/api/mcp/asset/c8f98591-ffd7-4846-9d97-65ea101be8e0", duration: "22h 7min", type: "Conexión", price: "desde USD XXX" }
  ]
};

const airportData = {
  name: "Kansas City International (MCI)",
  description: "Kansas City International (MCI) es el principal.",
  features: [
    "Vuelos nacionales e internacionales",
    "A 30–35 minutos del centro"
  ],
  officialLink: "https://www.flykci.com/"
};

const transportData = {
  description: "Kansas City no cuenta con un sistema de transporte público muy extenso, el traslado en auto es clave.",
  recommendations: [
    "Uber / Lyft (muy disponibles y confiables)",
    "Alquiler de auto (ideal si te alojas fuera del centro)",
    "Servicios especiales de transporte al estadio en días de partido"
  ]
};

const usEntryData = {
  requirements: [
    "Pasaporte vigente",
    "Visa o ESTA (según nacionalidad)",
    "Ticket de salida del país",
    "Seguro médico de viaje recomendado"
  ],
  officialLink: "https://travel.state.gov/"
};

const accommodationsData = [
  { name: "Sheraton Hotel", image: "https://www.figma.com/api/mcp/asset/ab043acf-c0ad-4656-ad5a-a118d3c9f470", rating: 4.3, reviews: "X reviews", priceLevel: "$$$$$" },
  { name: "Nombre Hotel", image: "https://www.figma.com/api/mcp/asset/ab043acf-c0ad-4656-ad5a-a118d3c9f470", rating: 4.3, reviews: "X reviews", priceLevel: "$$$" },
  { name: "Nombre Hotel", image: "https://www.figma.com/api/mcp/asset/ab043acf-c0ad-4656-ad5a-a118d3c9f470", rating: 4.3, reviews: "X reviews", priceLevel: "$" },
  { name: "Hilton Garden Inn", image: "https://www.figma.com/api/mcp/asset/ab043acf-c0ad-4656-ad5a-a118d3c9f470", rating: 4.5, reviews: "250 reviews", priceLevel: "$$$" },
  { name: "Marriott Marquis", image: "https://www.figma.com/api/mcp/asset/ab043acf-c0ad-4656-ad5a-a118d3c9f470", rating: 4.7, reviews: "1200 reviews", priceLevel: "$$$$" },
  { name: "Holiday Inn Express", image: "https://www.figma.com/api/mcp/asset/ab043acf-c0ad-4656-ad5a-a118d3c9f470", rating: 4.2, reviews: "300 reviews", priceLevel: "$$" }
];

const gastronomyData = [
  { name: "La Trattoria", image: "https://www.figma.com/api/mcp/asset/ec478964-b6ac-42fd-afb8-1ab0f2cfd236", rating: 4.6, reviews: "150 reviews", cuisine: "Italiana, pizzería", priceRange: { min: "$$", max: "$$$" } },
  { name: "Sushi Haven", image: "https://www.figma.com/api/mcp/asset/ec478964-b6ac-42fd-afb8-1ab0f2cfd236", rating: 4.8, reviews: "200 reviews", cuisine: "Japonesa, sushi bar", priceRange: { min: "$", max: "$$" } },
  { name: "Café de Paris", image: "https://www.figma.com/api/mcp/asset/ec478964-b6ac-42fd-afb8-1ab0f2cfd236", rating: 4.2, reviews: "80 reviews", cuisine: "Francesa, brasserie", priceRange: { min: "$$$", max: "$$$$" } },
  { name: "Taco Fiesta", image: "https://www.figma.com/api/mcp/asset/ec478964-b6ac-42fd-afb8-1ab0f2cfd236", rating: 4.5, reviews: "120 reviews", cuisine: "Mexicana, taquería", priceRange: { min: "$", max: "$$" } },
  { name: "The Spice Route", image: "https://www.figma.com/api/mcp/asset/ec478964-b6ac-42fd-afb8-1ab0f2cfd236", rating: 4.7, reviews: "95 reviews", cuisine: "India, curry house", priceRange: { min: "$$", max: "$$$" } },
  { name: "Burger Joint", image: "https://www.figma.com/api/mcp/asset/ec478964-b6ac-42fd-afb8-1ab0f2cfd236", rating: 4.3, reviews: "300 reviews", cuisine: "Americana, hamburguesería", priceRange: { min: "$", max: "$$" } }
];

const currentWeather = {
  temp: "17° C",
  description: "Nubes dispersas"
};

const forecastDays = [
  { day: "Mié", icon: "cloud", tempMin: "13", tempMax: "26", description: "Nubes" },
  { day: "Jue", icon: "cloud-rain", tempMin: "11", tempMax: "24", description: "Lluvia ligera" },
  { day: "Vie", icon: "cloud", tempMin: "9", tempMax: "20", description: "Nubes" },
  { day: "Sáb", icon: "sun", tempMin: "13", tempMax: "26", description: "Soleado", iconColor: "text-warning-primary" }
];

const typicalWeatherItems = [
  { icon: "thermometer", label: "Temperaturas:", value: "22°C a 32°C" },
  { icon: "sun", value: "Días calurosos y húmedos" },
  { icon: "cloud-lightning", value: "Posibles tormentas eléctricas aisladas" },
  { icon: "warning-circle", value: "Lleva ropa liviana, gorra, protector solar y botella reutilizable.", alignTop: true }
];

const kansasCityMatches = [
  { team1: { name: "Jordania", flag: "🇯🇴" }, team2: { name: "Argentina", flag: "🇦🇷" }, date: "Sábado 27 de junio", city: "Dallas", time: { local: "22:00 h (AR)", venue: "19:00 h (DL)" } },
  { team1: { name: "Argentina", flag: "🇦🇷" }, team2: { name: "Austria", flag: "🇦🇹" }, date: "Lunes 22 de junio", city: "Dallas", time: { local: "13:00 h (AR)", venue: "10:00 h (DL)" } },
  { team1: { name: "Argentina", flag: "🇦🇷" }, team2: { name: "A definir", flag: null }, date: "Martes 16 de junio", city: "Kansas city", time: { local: "21:00 h (AR)", venue: "18:00 h (KCK)" } },
  { team1: { name: "Jordania", flag: "🇯🇴" }, team2: { name: "Argentina", flag: "🇦🇷" }, date: "Sábado 27 de junio", city: "Dallas", time: { local: "22:00 h (AR)", venue: "19:00 h (DL)" } },
  { team1: { name: "Argentina", flag: "🇦🇷" }, team2: { name: "Austria", flag: "🇦🇹" }, date: "Lunes 22 de junio", city: "Dallas", time: { local: "13:00 h (AR)", venue: "10:00 h (DL)" } },
  { team1: { name: "Argentina", flag: "🇦🇷" }, team2: { name: "A definir", flag: null }, date: "Martes 16 de junio", city: "Kansas city", time: { local: "21:00 h (AR)", venue: "18:00 h (KCK)" } }
];

// ============================================================================
// FUNCIONES HELPER PARA GENERAR HTML
// ============================================================================

function generateFlightOption(flight) {
  return `
    <tr>
      <td class="py-1">
        <div class="flex gap-2 items-center">
          <img src="${flight.logo}" alt="${flight.airline}" class="w-6 h-6 object-cover" />
          <p class="text-sm text-text-default whitespace-nowrap">${flight.airline}</p>
        </div>
      </td>
      <td class="py-1 text-sm text-text-lighter text-center">${flight.duration}</td>
      <td class="py-1 text-sm text-text-lighter">${flight.type}</td>
      <td class="py-1 text-sm text-text-default text-right">${flight.price}</td>
    </tr>
  `;
}

function generateMatchCard(match) {
  const team1FlagHtml = match.team1.flag 
    ? `<span class="text-xl">${match.team1.flag}</span>`
    : `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="15" viewBox="0 0 21 15" fill="none">
        <path d="M19 0.5H2C1.17157 0.5 0.5 1.17157 0.5 2V13C0.5 13.8284 1.17157 14.5 2 14.5H19C19.8284 14.5 20.5 13.8284 20.5 13V2C20.5 1.17157 19.8284 0.5 19 0.5Z" fill="#DDDDDD" stroke="black" stroke-opacity="0.1"/>
      </svg>`;
  
  const team2FlagHtml = match.team2.flag
    ? `<span class="text-xl">${match.team2.flag}</span>`
    : `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="15" viewBox="0 0 21 15" fill="none">
        <path d="M19 0.5H2C1.17157 0.5 0.5 1.17157 0.5 2V13C0.5 13.8284 1.17157 14.5 2 14.5H19C19.8284 14.5 20.5 13.8284 20.5 13V2C20.5 1.17157 19.8284 0.5 19 0.5Z" fill="#DDDDDD" stroke="black" stroke-opacity="0.1"/>
      </svg>`;

  return `
    <div class="bg-white border border-border-primary rounded-xl px-3 py-4 flex flex-col gap-4 relative overflow-visible">
      <div class="flex items-center gap-2">
        ${team1FlagHtml}
        <p class="text-base font-semibold text-[#31363A]" style="font-family: 'Titillium Web', sans-serif;">
          ${match.team1.name} - ${match.team2.name}
        </p>
        ${team2FlagHtml}
      </div>
      <div class="flex flex-col gap-2">
        <div class="flex items-start gap-4">
          <div class="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="3.125" y="3.125" width="13.75" height="13.75" rx="1.25" fill="#7BD0C2" opacity="0.2"/>
              <path d="M15.625 6.25H4.375C3.68464 6.25 3.125 6.80964 3.125 7.5V15.625C3.125 16.3154 3.68464 16.875 4.375 16.875H15.625C16.3154 16.875 16.875 16.3154 16.875 15.625V7.5C16.875 6.80964 16.3154 6.25 15.625 6.25Z" stroke="#7BD0C2" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M13.125 3.75V6.25" stroke="#7BD0C2" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M6.875 3.75V6.25" stroke="#7BD0C2" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p class="text-base text-[#31363A]" style="font-family: 'Titillium Web', sans-serif;">
              ${match.date}
            </p>
          </div>
          <div class="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="8.125" r="2.5" fill="#7BD0C2" opacity="0.2"/>
              <path d="M10 17.5C10 17.5 15.625 13.125 15.625 8.125C15.625 5.01675 13.1083 2.5 10 2.5C6.89175 2.5 4.375 5.01675 4.375 8.125C4.375 13.125 10 17.5 10 17.5Z" stroke="#7BD0C2" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="10" cy="8.125" r="2.5" stroke="#7BD0C2" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p class="text-base text-[#31363A]" style="font-family: 'Titillium Web', sans-serif;">
              ${match.city}
            </p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="6.25" fill="#7BD0C2" opacity="0.2"/>
            <circle cx="10" cy="10" r="7.5" stroke="#7BD0C2" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10 6.25V10L12.5 12.5" stroke="#7BD0C2" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <p class="text-base text-[#31363A]" style="font-family: 'Titillium Web', sans-serif;">
            ${match.time.local}
          </p>
          <p class="text-base text-[#31363A]" style="font-family: 'Titillium Web', sans-serif;">
            -
          </p>
          <p class="text-base text-[#31363A]" style="font-family: 'Titillium Web', sans-serif;">
            ${match.time.venue}
          </p>
        </div>
      </div>
    </div>
  `;
}

function generateHotelCard(hotel) {
  const fullStars = Math.round(hotel.rating);
  const starsHtml = [1, 2, 3, 4, 5].map(star => 
    `<i class="ph${star <= fullStars ? '-fill' : ''} ph-star text-warning-primary" style="font-size: 16px;"></i>`
  ).join('');
  
  return `
    <div class="bg-white rounded-xl p-3 flex flex-col gap-3 min-w-[184px] snap-start" style="scroll-snap-align: start;">
      <!-- Imagen del hotel -->
      <img src="${hotel.image}" alt="${hotel.name}" class="w-[160px] h-[84px] rounded-xl object-cover" />
      <!-- Información del hotel -->
      <div class="flex flex-col gap-2">
        <!-- Nombre -->
        <p class="text-base font-semibold text-text-default">${hotel.name}</p>
        <!-- Rating y estrellas -->
        <div class="flex flex-col gap-1">
          <div class="flex gap-2 items-center">
            <p class="text-base text-text-lighter">${hotel.rating}</p>
            <div class="flex gap-0.5 items-center">${starsHtml}</div>
          </div>
          <!-- Reviews -->
          <p class="text-sm text-text-lighter">(${hotel.reviews})</p>
        </div>
        <!-- Nivel de precio -->
        <p class="text-base font-semibold text-text-lighter">${hotel.priceLevel}</p>
      </div>
    </div>
  `;
}

function generateRestaurantCard(restaurant) {
  const filledStars = Math.round(restaurant.rating);
  const starsHtml = [1, 2, 3, 4, 5].map(star => 
    `<i class="ph${star <= filledStars ? '-fill' : ''} ph-star text-warning-primary" style="font-size: 16px;"></i>`
  ).join('');
  
  return `
    <div class="bg-white rounded-xl p-3 flex flex-col gap-3 min-w-[184px] snap-start" style="scroll-snap-align: start;">
      <!-- Imagen del restaurante -->
      <img src="${restaurant.image}" alt="${restaurant.name}" class="w-[160px] h-[84px] rounded-xl object-cover" />
      <!-- Información del restaurante -->
      <div class="flex flex-col gap-1">
        <!-- Nombre -->
        <p class="text-base font-semibold text-text-default">${restaurant.name}</p>
        <!-- Rating y estrellas -->
        <div class="flex gap-2 items-center">
          <p class="text-base text-text-lighter">${restaurant.rating}</p>
          <div class="flex gap-0.5 items-center">${starsHtml}</div>
        </div>
        <!-- Reviews -->
        <p class="text-sm text-text-lighter">(${restaurant.reviews})</p>
        <!-- Tipo de cocina -->
        <div class="flex gap-1 items-center">
          <i class="ph-fill ph-fork-knife text-icon-default" style="font-size: 16px;"></i>
          <p class="text-sm text-text-lighter">${restaurant.cuisine}</p>
        </div>
        <!-- Rango de precio -->
        <div class="flex gap-2 items-center text-sm text-text-lighter">
          <p class="font-semibold">${restaurant.priceRange.min}</p>
          <p class="font-normal">-</p>
          <p class="font-semibold">${restaurant.priceRange.max}</p>
        </div>
      </div>
    </div>
  `;
}

function generateForecastDay(day) {
  const iconColor = day.iconColor || "text-text-lighter";
  return `
    <div class="flex items-center gap-2">
      <span class="text-sm font-semibold text-text-default w-10">${day.day}</span>
      <i class="ph-duotone ph-${day.icon} ${iconColor}" style="font-size: 20px;"></i>
      <span class="text-sm text-text-lighter">${day.tempMin}° - ${day.tempMax}°</span>
      <span class="text-xs text-text-lighter ml-auto">${day.description}</span>
    </div>
  `;
}

// ============================================================================
// GENERAR HTML COMPLETO
// ============================================================================

const html = `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- World Cup 2026 Map - Venues -->
    <!-- Generated: ${new Date().toISOString()} -->
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link 
      href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400;600;700&display=swap" 
      rel="stylesheet" 
    />
    
    <!-- Favicons -->
    <link
      rel="icon"
      href="https://assistcdn.s3.us-west-1.amazonaws.com/assets/site/favicon/FaviconA365.ico"
      sizes="48x48"
      type="image/x-icon"
    />
    <link
      rel="icon"
      href="https://assistcdn.s3.us-west-1.amazonaws.com/assets/site/favicon/FaviconA365.svg"
      type="image/svg+xml"
    />
    <link
      rel="apple-touch-icon"
      href="https://assistcdn.s3.us-west-1.amazonaws.com/assets/site/favicon/apple-touch-icon.png"
      sizes="180x180"
    />
    
    <!-- Phosphor Icons -->
    <script src="https://unpkg.com/@phosphor-icons/web@2.1.1"></script>
    
    <!-- Micromodal -->
    <script src="https://unpkg.com/micromodal/dist/micromodal.min.js"></script>
    
    <title>Kansas City - Sedes Mundial 2026</title>
    
    <!-- Styles -->
    <link rel="stylesheet" href="assets/styles.css" />
  </head>
  
  <body class="bg-bg-secondary">
    <div class="w-full min-h-screen flex flex-col bg-bg-secondary pb-10">
      
      <!-- Header -->
      <header class="bg-white w-full">
        <div class="flex items-center justify-between w-full max-w-[358px] md:max-w-[548px] lg:max-w-[1200px] mx-auto py-3">
          <!-- Flecha de regreso (mobile/tablet only) -->
          <button 
            onclick="window.location.href='mainpage.html'" 
            class="text-action-default block lg:hidden"
            aria-label="Volver a partidos"
          >
            <i class="ph ph-arrow-left" style="font-size: 24px; font-weight: bold;"></i>
          </button>

          <!-- Logo + Soccer Ball + Título -->
          <div class="flex w-fit items-center">
            <!-- Logo desktop -->
            <img
              class="hidden lg:block"
              src="https://assistcdn.s3.us-west-1.amazonaws.com/assets/site/home/img/brand/a365_logo_xa.svg"
              alt="A365 Logo"
            />
            
            <!-- Logo mobile/tablet -->
            <img
              class="block lg:hidden"
              src="https://assistcdn.s3.us-west-1.amazonaws.com/assets/site/home/img/brand/Assist-logo.svg"
              alt="Assist365"
            />

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
            <i class="ph-duotone ph-soccer-ball block lg:hidden" style="font-size: 24px; background: linear-gradient(180deg, #59D3C2 0%, #006FE8 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;"></i>
            <i class="ph-duotone ph-soccer-ball hidden lg:block" style="font-size: 32px; background: linear-gradient(180deg, #59D3C2 0%, #006FE8 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;"></i>
            
            <!-- Título responsive -->
            <h1 class="text-base lg:text-xl font-semibold text-text-decorative-darker">
              World Cup Map 2026
            </h1>
          </div>

          <!-- Botón Compartir con texto responsive -->
          <button class="inline-flex items-center justify-center gap-2 px-4 py-2 h-10 text-base font-semibold rounded-xl bg-brand-primary text-white hover:bg-bg-alt-secondary transition-colors">
            <span class="hidden lg:inline">Compartir</span>
            <i class="ph ph-paper-plane-tilt" style="font-size: 16px; font-weight: bold;"></i>
          </button>
        </div>
      </header>

      <!-- Main Content -->
      <div class="w-full max-w-[1366px] mx-auto lg:mt-4 px-4">
        <div class="max-w-[1200px] mx-auto">
          
          <!-- Botones de navegación (Desktop only) -->
          <div class="hidden lg:flex mx-auto w-full items-center justify-between">
            <button 
              type="button"
              onclick="window.location.href='mainpage.html'"
              class="whitespace-nowrap overflow-hidden text-ellipsis font-semibold rounded-xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-offset-0 text-lg py-[10px] h-[48px] px-4 w-fit text-brand-primary hover:text-bg-alt-secondary active:text-action-pressed focus:border-bg-alt-secondary focus:text-bg-alt-secondary focus:border-transparent focus:ring-border-primary focus:ring-opacity-100 flex items-center justify-center gap-2"
            >
              <i class="ph ph-caret-left flex-shrink-0" style="font-size: 20px; font-weight: bold;"></i>
              Volver a partidos
            </button>
            <button 
              type="button"
              onclick="window.location.href='venues.html'"
              class="whitespace-nowrap overflow-hidden text-ellipsis font-semibold rounded-xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-offset-0 text-lg py-[10px] h-[48px] px-4 w-fit border-2 border-brand-primary text-brand-primary hover:border-bg-alt-secondary hover:text-bg-alt-secondary active:border-action-pressed active:text-action-pressed focus:border-bg-alt-secondary focus:text-bg-alt-secondary focus:border-transparent focus:ring-brand-primary focus:ring-opacity-100 flex items-center justify-center gap-2"
            >
              <i class="ph ph-airplane-tilt flex-shrink-0" style="font-size: 20px; font-weight: bold;"></i>
              Explorar itinerarios
            </button>
          </div>

          <div class="max-w-[548px] lg:max-w-[996px] mx-auto">
            <!-- Título ciudad -->
            <div class="text-text-default text-2xl font-semibold pt-8 pb-6 flex gap-x-2">
              <i class="ph-duotone ph-map-pin-line text-icon-default" style="font-size: 32px;"></i>
              ${cityData.name}
            </div>

            <!-- Grid principal con sistema de orders responsivo -->
            <div class="flex flex-col lg:grid lg:grid-cols-2 gap-x-6 gap-y-4 mb-6">
              
              <!-- 1. Descripción - order-1 lg:order-1 -->
              <div class="order-1 lg:order-1 bg-bg-primary rounded-3xl text-base text-text-default p-6">
                ${cityData.description}
              </div>

              <!-- 2. Partidos - order-4 lg:order-2 (con row-span-3) -->
              <div class="order-4 lg:order-2 bg-brand-darkening rounded-xl py-6 px-4 lg:px-10 flex flex-col lg:h-[836px] mt-4 lg:mt-0 lg:row-span-3">
                <span class="text-text-default text-base font-semibold block pb-3 flex-shrink-0">
                  Partidos en Kansas City
                </span>
                <div class="flex-1 overflow-y-auto min-h-0 flex flex-col gap-4 w-full max-w-[548px] lg:max-w-[368px] venues-scrollbar pr-2">
                  ${kansasCityMatches.map(match => generateMatchCard(match)).join('')}
                </div>
              </div>

              <!-- 3. Info Estadio - order-2 lg:order-3 -->
              <div class="order-2 lg:order-3 bg-bg-primary rounded-3xl text-base text-text-default p-6">
                <img src="${venueData.image}" alt="${venueData.name}" class="w-full h-auto rounded-2xl mb-4" />
                <div class="flex flex-col gap-y-4 text-base text-text-default">
                  <span class="font-semibold text-xl">${venueData.name}</span>
                  <div class="gap-y-2 flex flex-col">
                    <span>
                      <i class="ph-duotone ph-map-pin inline-block mr-2 text-icon-lighter" style="font-size: 20px;"></i>
                      ${venueData.address}
                    </span>
                    <span>
                      <i class="ph-duotone ph-users-four inline-block mr-2 text-icon-lighter" style="font-size: 20px;"></i>
                      Capacidad: ${venueData.capacity}
                    </span>
                  </div>
                </div>
              </div>

              <!-- 4. Mapa - order-3 lg:order-5 -->
              <div class="order-3 lg:order-5 rounded-3xl overflow-hidden lg:w-[486px] h-[242px] mt-4">
                <div id="venueMap" class="w-full h-full"></div>
              </div>

              <!-- 5. Clima Actual - order-5 lg:order-7 -->
              <div class="order-5 lg:order-7 bg-bg-primary rounded-3xl text-base text-text-default p-6 min-h-[228px] lg:mt-4">
                <p class="text-xl font-semibold text-text-default">Clima actual</p>
                <div class="flex gap-10 mt-4">
                  <!-- Clima actual - izquierda -->
                  <div class="flex gap-2 items-center pl-4">
                    <i class="ph-duotone ph-cloud-sun text-text-lighter" style="font-size: 40px;"></i>
                    <div class="flex flex-col gap-1.5 w-[98px]">
                      <p class="text-sm text-text-default">Hoy</p>
                      <div class="flex flex-col gap-1.5">
                        <p class="text-4xl font-semibold text-text-default leading-10">${currentWeather.temp}</p>
                        <p class="text-sm text-text-lighter">${currentWeather.description}</p>
                      </div>
                    </div>
                  </div>
                  <!-- Pronóstico 4 días - derecha -->
                  <div class="flex flex-col gap-3 border-l border-border-primary w-full pl-4">
                    ${forecastDays.map(day => generateForecastDay(day)).join('')}
                  </div>
                </div>
              </div>

              <!-- 6. Clima Típico - order-6 lg:order-8 -->
              <div class="order-6 lg:order-8 bg-bg-primary rounded-3xl text-base text-text-default p-6 min-h-[228px] lg:mt-4">
                <p class="text-base font-semibold text-text-default">Clima habitual en Junio - Julio</p>
                <div class="flex flex-col gap-2 mt-4">
                  <!-- Temperaturas -->
                  <div class="flex gap-2 items-center">
                    <i class="ph-duotone ph-thermometer text-icon-lighter" style="font-size: 20px;"></i>
                    <p class="text-base text-text-lighter">Temperaturas:</p>
                    <p class="text-base text-text-default">22°C a 32°C</p>
                  </div>
                  <!-- Días calurosos -->
                  <div class="flex gap-2 items-center">
                    <i class="ph-duotone ph-sun text-icon-lighter" style="font-size: 20px;"></i>
                    <p class="text-base text-text-default">Días calurosos y húmedos</p>
                  </div>
                  <!-- Tormentas -->
                  <div class="flex gap-2 items-center">
                    <i class="ph-duotone ph-cloud-lightning text-icon-lighter" style="font-size: 20px;"></i>
                    <p class="text-base text-text-default">Posibles tormentas eléctricas aisladas</p>
                  </div>
                  <!-- Recomendación -->
                  <div class="flex gap-2 items-start">
                    <i class="ph-duotone ph-warning-circle text-icon-lighter flex-shrink-0" style="font-size: 20px;"></i>
                    <p class="text-base text-text-default">Lleva ropa liviana, gorra, protector solar y botella reutilizable.</p>
                  </div>
                </div>
              </div>

              <!-- 7. Vuelos - order-7 lg:order-9 -->
              <div class="order-7 lg:order-9 bg-bg-primary rounded-3xl text-base text-text-default p-6 min-h-[260px] lg:mt-4">
                <div class="flex flex-col gap-4">
                  <!-- Header: Título y fecha -->
                  <div class="flex items-center justify-between">
                    <p class="text-xl font-semibold text-text-default">Vuelos</p>
                    <div class="flex gap-2 items-center">
                      <i class="ph-duotone ph-calendar-blank text-icon-lighter" style="font-size: 20px;"></i>
                      <p class="text-base text-text-default">${flightsData.period}</p>
                    </div>
                  </div>
                  <!-- Ruta: Origen -> Destino -->
                  <div class="flex items-center justify-between">
                    <p class="text-base text-text-default">${flightsData.origin}</p>
                    <i class="ph ph-arrow-right text-icon-lighter" style="font-size: 20px;"></i>
                    <p class="text-base text-text-default">${flightsData.destination}</p>
                  </div>
                  <!-- Lista de opciones de vuelos - tabla -->
                  <table class="w-full">
                    <tbody>
                      ${flightsData.flights.map(flight => generateFlightOption(flight)).join('')}
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- 8. Aeropuerto - order-7 lg:order-10 -->
              <div class="order-7 lg:order-10 bg-bg-primary rounded-3xl text-base text-text-default p-6 min-h-[260px] lg:mt-4">
                <div class="flex flex-col gap-2">
                  <!-- Icono + Título -->
                  <div class="flex flex-col gap-1">
                    <i class="ph-duotone ph-airplane-takeoff text-icon-lighter" style="font-size: 32px;"></i>
                    <p class="text-base font-semibold text-text-default">Aeropuerto</p>
                  </div>
                  <!-- Descripción -->
                  <p class="text-base text-text-default">${airportData.description}</p>
                  <!-- Lista de características -->
                  <ul class="flex flex-col gap-1 list-disc ml-5">
                    ${airportData.features.map(feature => `<li class="text-sm text-text-default">${feature}</li>`).join('')}
                  </ul>
                  <!-- Enlace a info oficial -->
                  <a href="${airportData.officialLink}" target="_blank" rel="noopener noreferrer" 
                    class="flex gap-1 items-center text-base font-semibold text-action-default hover:underline">
                    Más info oficial
                    <i class="ph ph-arrow-square-out" style="font-size: 16px;"></i>
                  </a>
                </div>
              </div>

              <!-- 9. Transporte - order-8 lg:order-11 -->
              <div class="order-8 lg:order-11 bg-bg-primary rounded-3xl text-base text-text-default p-6 min-h-[248px] lg:mt-4">
                <div class="flex flex-col">
                  <!-- Título -->
                  <p class="text-xl font-semibold text-text-default pb-4">Traslados</p>
                  <div class="flex flex-col gap-y-2">
                    <!-- Descripción -->
                    <p class="text-base text-text-default">${transportData.description}</p>
                    <!-- Subtítulo con icono -->
                    <div class="flex gap-2 items-center">
                      <i class="ph-duotone ph-car text-icon-lighter" style="font-size: 20px;"></i>
                      <p class="text-base text-text-default">Recomendados:</p>
                    </div>
                    <!-- Lista de recomendaciones -->
                    <ul class="flex flex-col gap-1 list-disc ml-5">
                      ${transportData.recommendations.map(rec => `<li class="text-sm text-text-default">${rec}</li>`).join('')}
                    </ul>
                  </div>
                </div>
              </div>

              <!-- 10. Requisitos USA - order-10 lg:order-12 -->
              <div class="order-10 lg:order-12 bg-bg-primary rounded-3xl text-base text-text-default p-6 min-h-[248px] lg:mt-4">
                <div class="flex flex-col gap-2">
                  <!-- Título -->
                  <p class="text-xl font-semibold text-text-default">Normativas de Ingreso a Estados Unidos</p>
                  <!-- Lista de requisitos -->
                  <ul class="flex flex-col gap-1 list-disc ml-6">
                    ${usEntryData.requirements.map(req => `<li class="text-base text-text-default">${req}</li>`).join('')}
                  </ul>
                  <!-- Enlace a info oficial -->
                  <a href="${usEntryData.officialLink}" target="_blank" rel="noopener noreferrer"
                    class="flex gap-1 items-center text-base font-semibold text-action-default hover:underline px-4 py-2 w-fit">
                    Más info US gov
                    <i class="ph ph-arrow-square-out" style="font-size: 16px;"></i>
                  </a>
                </div>
              </div>

            </div>

            <!-- 11. AccommodationsWidget -->
            <div class="bg-brand-darkening p-4 lg:p-6 rounded-3xl mt-4 lg:mt-10 mx-auto">
              <div class="flex flex-col gap-3">
                <!-- Header con título e icono de Tripadvisor -->
                <div class="flex gap-3 items-center">
                  <p class="text-xl font-semibold text-text-default">Alojamientos</p>
                  <img src="https://www.figma.com/api/mcp/asset/4c00910f-dc59-45ea-a2c4-99c5ffc8c166" alt="Tripadvisor" class="w-10 h-10 mix-blend-multiply" />
                </div>
                <!-- Carousel de hoteles -->
                <div class="relative">
                  <div class="flex gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory" style="scroll-snap-type: x mandatory;">
                    ${accommodationsData.map(hotel => generateHotelCard(hotel)).join('')}
                  </div>
                  <!-- Botón de navegación derecha -->
                  <button class="absolute right-1.5 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow">
                    <i class="ph ph-caret-right text-action-default" style="font-size: 20px;"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- 12. GastronomyWidget -->
            <div class="bg-brand-darkening p-4 lg:p-6 rounded-3xl mt-6 mx-auto">
              <div class="flex flex-col gap-3">
                <!-- Header con título e icono de Tripadvisor -->
                <div class="flex gap-3 items-center">
                  <p class="text-xl font-semibold text-text-default">Gastronomía</p>
                  <img src="https://www.figma.com/api/mcp/asset/3060ac03-c769-4735-a92e-a66647d4b7d2" alt="Tripadvisor" class="w-10 h-10 mix-blend-multiply" />
                </div>
                <!-- Carousel de restaurantes -->
                <div class="relative">
                  <div class="flex gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory" style="scroll-snap-type: x mandatory;">
                    ${gastronomyData.map(restaurant => generateRestaurantCard(restaurant)).join('')}
                  </div>
                  <!-- Botón de navegación derecha -->
                  <button class="absolute right-1.5 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow">
                    <i class="ph ph-caret-right text-action-default" style="font-size: 20px;"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- 13 y 14. Seguridad y Prevención (Grid 2 columnas) -->
            <div class="grid lg:grid-cols-2 gap-4 lg:gap-6 mb-6 mt-4 lg:mt-10">
              
              <!-- 13. SafetyWidget -->
              <div class="lg:w-[486px] flex flex-col">
                <div class="bg-bg-primary rounded-3xl text-base text-text-default p-6">
                  <div class="flex flex-col gap-2">
                    <!-- Título -->
                    <h3 class="text-xl font-semibold text-text-default">Seguridad</h3>
                    <!-- Descripción -->
                    <p class="text-base text-text-default">Kansas City es una ciudad relativamente segura, especialmente en zonas turísticas.</p>
                    <!-- Consejos con icono -->
                    <div class="flex gap-2 items-center mt-2">
                      <i class="ph-duotone ph-shield text-icon-lighter" style="font-size: 20px;"></i>
                      <p class="text-base text-text-default">Consejos básicos:</p>
                    </div>
                    <!-- Lista de consejos -->
                    <ul class="text-sm text-text-default list-disc ml-5 space-y-1">
                      <li>Evitar zonas poco iluminadas de noche</li>
                      <li>Usar transporte autorizado</li>
                      <li>No dejar objetos visibles en el auto</li>
                    </ul>
                  </div>
                </div>
              </div>

              <!-- 14. PreventionWidget -->
              <div class="lg:w-[486px] self-stretch bg-bg-primary rounded-3xl">
                <div class="bg-bg-primary rounded-3xl text-base text-text-default p-6">
                  <div class="flex flex-col gap-2">
                    <!-- Título -->
                    <h3 class="text-xl font-semibold text-text-default">Prevención</h3>
                    <!-- Grid de 2 columnas -->
                    <div class="grid grid-cols-2 gap-4 mt-2">
                      <!-- Columna 1: Antes de viajar -->
                      <div class="flex flex-col gap-2">
                        <div class="flex gap-2 items-center">
                          <i class="ph-duotone ph-check-fat text-icon-lighter" style="font-size: 20px;"></i>
                          <p class="text-base text-text-default">Antes de viajar:</p>
                        </div>
                        <ul class="text-sm text-text-default list-disc ml-5 space-y-1">
                          <li>Guardar copias digitales de documentos</li>
                          <li>Descargar mapas offline</li>
                          <li>Confirmar entradas oficiales</li>
                          <li>Contratar asistencia al viajero Assist 365</li>
                        </ul>
                      </div>
                      <!-- Columna 2: Durante el viaje -->
                      <div class="flex flex-col gap-2">
                        <div class="flex gap-2 items-center">
                          <i class="ph-duotone ph-suitcase-rolling text-icon-lighter" style="font-size: 20px;"></i>
                          <p class="text-base text-text-default">Durante el viaje:</p>
                        </div>
                        <ul class="text-sm text-text-default list-disc ml-5 space-y-1">
                          <li>Mantener hidratación</li>
                          <li>Llegar temprano a los partidos</li>
                          <li>Seguir indicaciones oficiales del evento</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

        <!-- 15. Assist365BannersWidget -->
        <div class="w-full max-w-[548px] lg:max-w-full mx-auto mt-10">
          <div class="flex gap-6 items-center justify-center">
            <!-- 1. Icono amarillo - Maleta (hidden en mobile) -->
            <div class="hidden lg:flex bg-brand-comp-yellow rounded-full w-[176px] h-[280px] items-center justify-center px-[27px] py-[78px]">
              <i class="ph-duotone ph-suitcase-rolling text-white" style="font-size: 123px;"></i>
            </div>
            <!-- 2. Card lila - Worldcup Care (full width en mobile) -->
            <div class="bg-brand-comp-lilac rounded-2xl w-full lg:w-[486px] lg:h-[280px] p-4 lg:p-6 flex flex-col gap-6 justify-center relative overflow-hidden">
              <!-- Imagen decorativa shape (absolute) -->
              <img src="https://assistcdn.s3.us-west-1.amazonaws.com/assets/site/banner/shape3.svg" alt="" class="absolute right-0 top-1/2 -translate-y-1/2 w-[143px] h-[300px]" />
              <!-- Textos -->
              <div class="flex flex-col gap-1 relative z-10">
                <p class="text-base md:text-xl font-semibold text-text-default lg:leading-7">Viví cada partido sin preocupaciones</p>
                <p class="text-2xl md:text-3xl font-semibold text-text-default lg:leading-9">Worldcup Care</p>
                <p class="text-base md:text-2xl text-text-default lg:leading-8">La cobertura pensada para acompañarte dentro y fuera de la cancha</p>
              </div>
              <!-- Botón -->
              <button class="bg-action-default hover:bg-action-hover active:bg-action-pressed text-white font-semibold px-4 py-2 rounded-xl flex items-center gap-1 w-fit h-[36px] transition-colors relative z-10">
                <span class="text-base leading-6">Cotizá tu viaje ahora</span>
                <i class="ph ph-arrow-right" style="font-size: 16px; font-weight: bold;"></i>
              </button>
            </div>
            <!-- 3. Card verde - Pelota (hidden en mobile) -->
            <div class="bg-brand-comp-green rounded-xl w-[278px] h-[280px] items-center justify-center p-[62px] hidden lg:flex">
              <i class="ph-duotone ph-soccer-ball text-icon-darker" style="font-size: 123px;"></i>
            </div>
            <!-- 4. Icono celeste circular - Avión (hidden en mobile) -->
            <div class="bg-brand-comp-lightblue rounded-full w-[280px] h-[280px] hidden lg:flex items-center justify-center p-[62px]">
              <i class="ph-duotone ph-airplane-tilt text-white" style="font-size: 156px;"></i>
            </div>
          </div>
        </div>

        <!-- 16. VenuesCityGrid -->
        <div class="w-full max-w-[548px] lg:max-w-[996px] mx-auto mt-10 lg:mt-28">
          <div class="grid lg:grid-cols-[282px_282px_1fr] grid-cols-1 gap-y-4 lg:gap-y-0 lg:gap-x-6 gap-x-0">
            <!-- Ciudad 1 -->
            <div class="bg-bg-primary rounded-2xl p-4 flex items-center gap-4 flex-1">
              <div class="overflow-hidden rounded-2xl flex-shrink-0">
                <img src="https://placehold.co/80x80" alt="Ciudad placeholder" />
              </div>
              <div class="flex flex-col">
                <span class="text-text-secondary text-sm">Estados Unidos</span>
                <span class="text-text-default text-xl font-semibold">Atlanta</span>
              </div>
            </div>
            <!-- Ciudad 2 -->
            <div class="bg-bg-primary rounded-2xl p-4 flex items-center gap-4 flex-1">
              <div class="overflow-hidden rounded-2xl flex-shrink-0">
                <img src="https://placehold.co/80x80" alt="Ciudad placeholder" />
              </div>
              <div class="flex flex-col">
                <span class="text-text-secondary text-sm">Estados Unidos</span>
                <span class="text-text-default text-xl font-semibold">Atlanta</span>
              </div>
            </div>
            <!-- Card de acción - Explorar todas las sedes -->
            <div class="bg-bg-primary rounded-2xl p-4 flex items-center gap-4 flex-1">
              <div class="w-20 h-20 bg-brand-comp-lightblue rounded-2xl flex items-center justify-center flex-shrink-0">
                <i class="ph-duotone ph-map-pin-line text-icon-default" style="font-size: 32px;"></i>
              </div>
              <div class="flex flex-col gap-2">
                <button 
                  type="button"
                  onclick="window.location.href='venuesSelection.html'"
                  class="whitespace-nowrap overflow-hidden text-ellipsis font-semibold rounded-xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-offset-0 text-lg py-[10px] h-[48px] px-4 w-fit text-brand-primary hover:text-bg-alt-secondary active:text-action-pressed focus:border-bg-alt-secondary focus:text-bg-alt-secondary focus:border-transparent focus:ring-border-primary focus:ring-opacity-100 flex items-center justify-center gap-2"
                >
                  Explorar todas las sedes
                  <i class="ph ph-arrow-right flex-shrink-0" style="font-size: 16px; font-weight: bold;"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    
    <!-- Google Maps JavaScript -->
    <script>
      // Configuración del mapa para venue
      const VENUE_MAP_CONFIG = {
        mapId: 'c6f5508b76c0d2152b22324d',
        center: { lat: 39.0997, lng: -94.5786 }, // Kansas City coordinates
        zoom: 12,
        minZoom: 10,
        disableDefaultUI: true,
        restriction: {
          latLngBounds: { north: 85, south: -85, west: -180, east: 180 },
          strictBounds: true
        }
      };

      // Venue data
      const VENUE_DATA = {
        name: 'Arrowhead Stadium',
        lat: 39.0489,
        lng: -94.4839,
        address: '1 Arrowhead Dr, Kansas City, MO 64129'
      };

      // Initialize map
      window.initVenueMap = async function() {
        console.log('🗺️ Initializing Venue Map...');
        
        const mapElement = document.getElementById('venueMap');
        if (!mapElement) {
          console.error('Venue map element not found');
          return;
        }

        const map = new google.maps.Map(mapElement, VENUE_MAP_CONFIG);

        // Wait for the marker library
        const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');

        // Create marker content
        const markerContent = document.createElement('div');
        markerContent.innerHTML = \`
          <img 
            src="https://assistcdn.s3.us-west-1.amazonaws.com/assets/wc2026/a365pin.svg" 
            alt="\${VENUE_DATA.name}"
            style="width: auto; height: auto;"
          />
        \`;

        // Create marker
        new AdvancedMarkerElement({
          map: map,
          position: { lat: VENUE_DATA.lat, lng: VENUE_DATA.lng },
          content: markerContent,
          title: VENUE_DATA.name
        });

        console.log('✅ Venue map initialized');
      };
    </script>
    
    <!-- Load Google Maps API -->
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBTLpnFO7BWQeVpblahIGHDLYzjVzF61oQ&callback=initVenueMap&loading=async" async defer></script>
  </body>
</html>
`;

// 4. Escribir archivo
const venuesPath = path.join(distPath, 'venues.html');
fs.writeFileSync(venuesPath, html);

console.log('✅ HTML generado\n');

// 5. Compilar Tailwind CSS (DESPUÉS de generar el HTML para que detecte las clases)
console.log('🎨 Compilando Tailwind CSS con todas las clases del HTML generado...');
try {
  execSync(
    'npx tailwindcss -i ./src/index.css -o ./dist-vanilla/assets/styles.css --minify',
    { stdio: 'inherit' }
  );
  console.log('✅ CSS compilado\n');
} catch (error) {
  console.error('❌ Error compilando CSS:', error.message);
  process.exit(1);
}

// 6. Reportar
console.log('📦 Archivos generados:\n');
console.log('  📝 venues.html (100% fiel al template React)');
console.log('  🎨 assets/styles.css (con todas las clases del design system)\n');

console.log('✅ Build Venues completado en: dist-vanilla/venues.html\n');
console.log('💡 Para ver: Abrí dist-vanilla/venues.html en el navegador\n');
