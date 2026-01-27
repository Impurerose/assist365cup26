# Plan de Actualización: Build Vanilla de VenuesTemplate

## 📋 Resumen Ejecutivo

Este documento detalla **todas** las modificaciones necesarias para que el build vanilla de `VenuesTemplate.jsx` sea 100% idéntico pixel-perfect en desktop, tablet y mobile.

**Última actualización**: 2026-01-27  
**Archivo analizado**: [VenuesTemplate.jsx](src/templates/VenuesTemplate.jsx)  
**Script a modificar**: [build-venues.mjs](scripts/build-venues.mjs)

---

## 🎯 Componentes Utilizados

### Componentes Importados (Total: 19)

| # | Componente | Ruta | Uso |
|---|------------|------|-----|
| 1 | `HeaderBar` | `components/HeaderBar` | Barra superior con logo |
| 2 | `MapContainer` | `components/MapContainer` | Mapa interactivo |
| 3 | `MatchCard` | `components/MatchCard` | Card de partido individual |
| 4 | `Button` | `dsys/Button` | Botones de navegación |
| 5 | `VenueCard` | `components/VenueCard` | Contenedor de información |
| 6 | `VenueInfo` | `components/VenueInfo` | Info detallada del estadio |
| 7 | `CurrentWeather` | `components/CurrentWeather` | Clima actual con pronóstico |
| 8 | `TypicalWeather` | `components/TypicalWeather` | Clima habitual de la ciudad |
| 9 | `FlightsWidget` | `components/FlightsWidget` | Lista de vuelos disponibles |
| 10 | `AirportInfo` | `components/AirportInfo` | Información del aeropuerto |
| 11 | `TransportInfo` | `components/TransportInfo` | Info de transporte local |
| 12 | `USEntryRequirements` | `components/USEntryRequirements` | Requisitos de entrada USA |
| 13 | `AccommodationsWidget` | `components/AccommodationsWidget` | Grid de hoteles |
| 14 | `GastronomyWidget` | `components/GastronomyWidget` | Grid de restaurantes |
| 15 | `SafetyWidget` | `components/SafetyWidget` | Información de seguridad |
| 16 | `PreventionWidget` | `components/PreventionWidget` | Tips de prevención |
| 17 | `Assist365BannersWidget` | `components/Assist365BannersWidget` | Banners promocionales |
| 18 | **`VenuesCityGrid`** | `components/VenuesCityGrid` | ⚠️ **NUEVO** Grid de ciudades |

### Iconos de Phosphor (Total: 13)

```javascript
import {
  AirplaneTiltIcon,      // Botón "Explorar itinerarios"
  CaretLeftIcon,         // Botón "Volver a partidos"
  MapPinLineIcon,        // Título de ciudad
  CloudSun,              // Clima (usado en componentes)
  Cloud,                 // Clima
  CloudRain,             // Clima
  CloudLightning,        // Clima
  Sun,                   // Clima
  Thermometer,           // Clima
  WarningCircle,         // Clima
  MapPinAreaIcon,        // (Importado pero no usado en template)
  MapPinIcon,            // (Importado pero no usado en template)
  SoccerBallIcon,        // (Importado pero no usado en template)
  UsersFourIcon,         // (Importado pero no usado en template)
} from "@phosphor-icons/react";
```

---

## 🏗️ Estructura del Layout Principal

### 1. Container Principal
```jsx
<div className="w-full min-h-screen flex flex-col bg-bg-secondary pb-10">
```

### 2. Container de Ancho Máximo
```jsx
<div className="w-full max-w-[1366px] mx-auto lg:mt-4 px-4">
```
⚠️ **CRÍTICO**: 
- `px-4` agregado para mobile (padding horizontal)
- `lg:mt-4` solo en desktop

### 3. Container Interno (max-width secundario)
```jsx
<div className="max-w-[1200px] mx-auto">
```

### 4. Botones de Navegación (Desktop Only)
```jsx
<div className="hidden lg:flex mx-auto w-full items-center justify-between">
```

#### Botón "Volver a partidos"
```jsx
<Button
  color="tertiary"
  iconPosition="left"
  classes="w-fit"
  icon={<CaretLeftIcon />}
  onClick={() => {
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
```

#### Botón "Explorar itinerarios"
```jsx
<Button
  color="secondary"
  iconPosition="left"
  icon={<AirplaneTiltIcon />}
  onClick={() => {
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
```

### 5. Container de Contenido Principal
```jsx
<div className="max-w-[548px] lg:max-w-[996px] mx-auto">
```
⚠️ **CRÍTICO**: Width responsivo
- Mobile: `max-w-[548px]`
- Desktop: `lg:max-w-[996px]`

### 6. Título de Ciudad
```jsx
<div className="text-text-default text-2xl font-semibold pt-8 pb-6 flex gap-x-2">
  <MapPinLineIcon
    className="text-icon-default"
    size={32}
    weight="duotone"
  />
  {cityData.name}
</div>
```

---

## 📊 Sistema de Grid con Orders Responsivos

### Grid Container Principal
```jsx
<div className="flex flex-col lg:grid lg:grid-cols-2 gap-x-6 gap-y-4 mb-6">
```

⚠️ **CRÍTICO**: 
- Mobile: `flex flex-col` (columna vertical)
- Desktop: `lg:grid lg:grid-cols-2` (grid de 2 columnas)
- Gap horizontal: `gap-x-6`
- Gap vertical: `gap-y-4`

### Tabla de Elementos con Orders

| Elemento | Mobile Order | Desktop Order | Clases Tailwind Específicas | Min/Max Height |
|----------|--------------|---------------|----------------------------|----------------|
| **Descripción** | `order-1` | `lg:order-1` | - | - |
| **Partidos** | `order-4` | `lg:order-2` | `bg-brand-darkening rounded-xl py-6 px-4 lg:px-10 flex flex-col mt-4 lg:mt-0 lg:row-span-3` | `lg:h-[836px]` |
| **Info Estadio** | `order-2` | `lg:order-3` | - | - |
| **Mapa** | `order-3` | `lg:order-5` | `rounded-3xl overflow-hidden mt-4` | `lg:w-[486px] h-[242px]` |
| **Clima Actual** | `order-5` | `lg:order-7` | `lg:mt-4` | `min-h-[228px]` |
| **Clima Típico** | `order-6` | `lg:order-8` | `lg:mt-4` | `min-h-[228px]` |
| **Vuelos** | `order-7` | `lg:order-9` | `lg:mt-4` | `min-h-[260px]` |
| **Aeropuerto** | `order-7` | `lg:order-10` | `lg:mt-4` | `min-h-[260px]` |
| **Transporte** | `order-8` | `lg:order-11` | `lg:mt-4` | `min-h-[248px]` |
| **Requisitos USA** | `order-10` | `lg:order-12` | `lg:mt-4` | `min-h-[248px]` |

⚠️ **NOTAS IMPORTANTES**:
1. Hay un **duplicado** de `order-7` en mobile (Vuelos y Aeropuerto) - mantener tal cual
2. El componente **Partidos** usa `lg:row-span-3` para ocupar 3 filas en el grid de desktop
3. Todos los elementos (excepto Descripción, Info Estadio y Partidos) tienen `lg:mt-4` en desktop

---

## 🎨 Análisis Detallado por Componente

### 1. Descripción de Ciudad
```jsx
<VenueCard className="order-1 lg:order-1">
  {cityData.description}
</VenueCard>
```

**Props**:
- `cityData.description`: String de texto descriptivo

---

### 2. Partidos en Kansas City (Contenedor especial)

```jsx
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
```

**Clases únicas críticas**:
- `px-4 lg:px-10` (padding horizontal responsivo)
- `lg:h-[836px]` (altura fija en desktop para scroll)
- `lg:row-span-3` (ocupa 3 filas del grid en desktop)
- `mt-4 lg:mt-0` (margen condicional)
- `max-w-[548px] lg:max-w-[368px]` (ancho del scroll container)
- `venues-scrollbar` (clase custom para scrollbar)

**Props**:
- `kansasCityMatches`: Array de 6 objetos de partidos
- Cada `MatchCard` recibe `showMatchNumber={false}`

---

### 3. Info Estadio
```jsx
<VenueCard className="order-2 lg:order-3">
  <VenueInfo
    image={venueData.image}
    name={venueData.name}
    address={venueData.address}
    capacity={venueData.capacity}
  />
</VenueCard>
```

**Props**:
- `venueData.image`: URL de imagen
- `venueData.name`: String
- `venueData.address`: String
- `venueData.capacity`: String (ej: "67,513")

---

### 4. Mapa
```jsx
<div className="order-3 lg:order-5 rounded-3xl overflow-hidden lg:w-[486px] h-[242px] mt-4">
  <MapContainer
    selectedTeam={selectedTeam}
    selectedCity={selectedCity}
    setSelectedCity={setSelectedCity}
  />
</div>
```

**Clases específicas**:
- `rounded-3xl overflow-hidden`
- `lg:w-[486px]` (ancho fijo en desktop)
- `h-[242px]` (altura fija siempre)
- `mt-4` (margen superior)

**Props**:
- `selectedTeam`: State variable (null inicial)
- `selectedCity`: State variable (null inicial)
- `setSelectedCity`: Función setter

---

### 5. Clima Actual
```jsx
<VenueCard className="order-5 lg:order-7 min-h-[228px] lg:mt-4">
  <CurrentWeather />
</VenueCard>
```

**Props internos de CurrentWeather**:
- `currentWeather.temp`: "17° C"
- `currentWeather.description`: "Nubes dispersas"
- `forecastDays`: Array de 4 objetos con:
  - `day`: String ("Mié", "Jue", etc.)
  - `Icon`: Componente de icono (Cloud, CloudRain, etc.)
  - `tempMin`: String ("13")
  - `tempMax`: String ("26")
  - `description`: String ("Nubes", "Lluvia ligera", etc.)
  - `iconColor`: String opcional ("text-warning-primary")

---

### 6. Clima Típico
```jsx
<VenueCard className="order-6 lg:order-8 min-h-[228px] lg:mt-4">
  <TypicalWeather />
</VenueCard>
```

**Props internos de TypicalWeather**:
- `typicalWeatherItems`: Array de 4 objetos con:
  - `Icon`: Componente (Thermometer, Sun, etc.)
  - `label`: String opcional ("Temperaturas:")
  - `value`: String de texto descriptivo
  - `alignTop`: Boolean opcional (true para WarningCircle)

---

### 7. Vuelos
```jsx
<VenueCard className="order-7 lg:order-9 min-h-[260px] lg:mt-4">
  <FlightsWidget
    origin={flightsData.origin}
    destination={flightsData.destination}
    period={flightsData.period}
    flights={flightsData.flights}
  />
</VenueCard>
```

**Props**:
- `origin`: "Ministro Pistarini Ezeiza (EZE)"
- `destination`: "Kansas City International (MCI)"
- `period`: "Junio - Julio"
- `flights`: Array de 4 objetos con:
  - `airline`: String
  - `logo`: URL
  - `duration`: String ("16h 30min")
  - `type`: String ("Directo" o "Conexión")
  - `price`: String ("desde USD XXX")

---

### 8. Aeropuerto
```jsx
<VenueCard className="order-7 lg:order-10 min-h-[260px] lg:mt-4">
  <AirportInfo
    name={airportData.name}
    description={airportData.description}
    features={airportData.features}
    officialLink={airportData.officialLink}
  />
</VenueCard>
```

**Props**:
- `name`: "Kansas City International (MCI)"
- `description`: String descriptivo
- `features`: Array de 2 strings
- `officialLink`: "https://www.flykci.com/"

---

### 9. Transporte
```jsx
<VenueCard className="order-8 lg:order-11 min-h-[248px] lg:mt-4">
  <TransportInfo
    description={transportData.description}
    recommendations={transportData.recommendations}
  />
</VenueCard>
```

**Props**:
- `description`: String descriptivo
- `recommendations`: Array de 3 strings

---

### 10. Requisitos de Entrada USA
```jsx
<VenueCard className="order-10 lg:order-12 min-h-[248px] lg:mt-4">
  <USEntryRequirements
    requirements={usEntryData.requirements}
    officialLink={usEntryData.officialLink}
  />
</VenueCard>
```

**Props**:
- `requirements`: Array de 4 strings
- `officialLink`: "https://travel.state.gov/"

---

## 📦 Secciones Fuera del Grid

### 11. Alojamientos
```jsx
<div className="bg-brand-darkening p-4 lg:p-6 rounded-3xl mt-4 lg:mt-10 mx-auto">
  <AccommodationsWidget hotels={accommodationsData} />
</div>
```

**Clases específicas**:
- `p-4 lg:p-6` (padding responsivo)
- `mt-4 lg:mt-10` (margen superior responsivo)

**Props**:
- `hotels`: Array de 6 objetos con:
  - `name`: String
  - `image`: URL
  - `rating`: Number (4.3, 4.5, etc.)
  - `reviews`: String ("X reviews", "250 reviews", etc.)
  - `priceLevel`: String ("$", "$$$", "$$$$$", etc.)

---

### 12. Gastronomía
```jsx
<div className="bg-brand-darkening p-4 lg:p-6 rounded-3xl mt-6 mx-auto">
  <GastronomyWidget restaurants={gastronomyData} />
</div>
```

**Clases específicas**:
- `p-4 lg:p-6` (padding responsivo)
- `mt-6` (margen superior fijo)

**Props**:
- `restaurants`: Array de 6 objetos con:
  - `name`: String
  - `image`: URL
  - `rating`: Number (4.6, 4.8, etc.)
  - `reviews`: String ("150 reviews", etc.)
  - `cuisine`: String ("Italiana, pizzería", etc.)
  - `priceRange`: Object con `min` y `max` ("$", "$$", "$$$", "$$$$")

---

### 13. Seguridad y Prevención (Grid 2 columnas)
```jsx
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
```

**Clases específicas**:
- Container: `grid lg:grid-cols-2 gap-4 lg:gap-6 mb-6 mt-4 lg:mt-10`
- Cada columna: `lg:w-[486px]`
- Segunda columna adicional: `self-stretch bg-bg-primary rounded-3xl`

---

### 14. Assist365 Banners
```jsx
<div className="w-full max-w-[548px] lg:max-w-full mx-auto mt-10">
  <Assist365BannersWidget />
</div>
```

**Clases específicas**:
- `max-w-[548px] lg:max-w-full` (ancho responsivo)
- `mt-10` (margen superior)

---

### 15. VenuesCityGrid (NUEVO)
```jsx
<div className="w-full max-w-[548px] lg:max-w-[996px] mx-auto mt-10 lg:mt-28">
  <VenuesCityGrid />
</div>
```

**Clases específicas**:
- `max-w-[548px] lg:max-w-[996px]` (ancho responsivo)
- `mt-10 lg:mt-28` ⚠️ **CRÍTICO**: Margen superior grande en desktop

---

## 📝 Data Props Completa para Vanilla Build

### cityData
```javascript
const cityData = {
  name: "Kansas City, Missouri, Estados Unidos",
  description: "Famosa por su cultura deportiva, su hospitalidad y su legendaria barbacoa, ofrece una experiencia cómoda y amigable para el viajero internacional.",
};
```

### venueData
```javascript
const venueData = {
  image: "https://assistcdn.s3.us-west-1.amazonaws.com/assets/img/affiliates/venue.png",
  name: "Arrowhead Stadium",
  address: "1 Arrowhead Dr, Kansas City, MO 64129",
  capacity: "67,513",
};
```

### flightsData
```javascript
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
```

### airportData
```javascript
const airportData = {
  name: "Kansas City International (MCI)",
  description: "Kansas City International (MCI) es el principal.",
  features: [
    "Vuelos nacionales e internacionales",
    "A 30–35 minutos del centro",
  ],
  officialLink: "https://www.flykci.com/",
};
```

### transportData
```javascript
const transportData = {
  description: "Kansas City no cuenta con un sistema de transporte público muy extenso, el traslado en auto es clave.",
  recommendations: [
    "Uber / Lyft (muy disponibles y confiables)",
    "Alquiler de auto (ideal si te alojas fuera del centro)",
    "Servicios especiales de transporte al estadio en días de partido",
  ],
};
```

### usEntryData
```javascript
const usEntryData = {
  requirements: [
    "Pasaporte vigente",
    "Visa o ESTA (según nacionalidad)",
    "Ticket de salida del país",
    "Seguro médico de viaje recomendado",
  ],
  officialLink: "https://travel.state.gov/",
};
```

### accommodationsData (6 hoteles)
```javascript
const accommodationsData = [
  {
    name: "Sheraton Hotel",
    image: "https://www.figma.com/api/mcp/asset/ab043acf-c0ad-4656-ad5a-a118d3c9f470",
    rating: 4.3,
    reviews: "X reviews",
    priceLevel: "$$$$$",
  },
  {
    name: "Nombre Hotel",
    image: "https://www.figma.com/api/mcp/asset/ab043acf-c0ad-4656-ad5a-a118d3c9f470",
    rating: 4.3,
    reviews: "X reviews",
    priceLevel: "$$$",
  },
  {
    name: "Nombre Hotel",
    image: "https://www.figma.com/api/mcp/asset/ab043acf-c0ad-4656-ad5a-a118d3c9f470",
    rating: 4.3,
    reviews: "X reviews",
    priceLevel: "$",
  },
  {
    name: "Hilton Garden Inn",
    image: "https://www.figma.com/api/mcp/asset/ab043acf-c0ad-4656-ad5a-a118d3c9f470",
    rating: 4.5,
    reviews: "250 reviews",
    priceLevel: "$$$",
  },
  {
    name: "Marriott Marquis",
    image: "https://www.figma.com/api/mcp/asset/ab043acf-c0ad-4656-ad5a-a118d3c9f470",
    rating: 4.7,
    reviews: "1200 reviews",
    priceLevel: "$$$$",
  },
  {
    name: "Holiday Inn Express",
    image: "https://www.figma.com/api/mcp/asset/ab043acf-c0ad-4656-ad5a-a118d3c9f470",
    rating: 4.2,
    reviews: "300 reviews",
    priceLevel: "$$",
  },
];
```

### gastronomyData (6 restaurantes)
```javascript
const gastronomyData = [
  {
    name: "La Trattoria",
    image: "https://www.figma.com/api/mcp/asset/ec478964-b6ac-42fd-afb8-1ab0f2cfd236",
    rating: 4.6,
    reviews: "150 reviews",
    cuisine: "Italiana, pizzería",
    priceRange: { min: "$$", max: "$$$" },
  },
  {
    name: "Sushi Haven",
    image: "https://www.figma.com/api/mcp/asset/ec478964-b6ac-42fd-afb8-1ab0f2cfd236",
    rating: 4.8,
    reviews: "200 reviews",
    cuisine: "Japonesa, sushi bar",
    priceRange: { min: "$", max: "$$" },
  },
  {
    name: "Café de Paris",
    image: "https://www.figma.com/api/mcp/asset/ec478964-b6ac-42fd-afb8-1ab0f2cfd236",
    rating: 4.2,
    reviews: "80 reviews",
    cuisine: "Francesa, brasserie",
    priceRange: { min: "$$$", max: "$$$$" },
  },
  {
    name: "Taco Fiesta",
    image: "https://www.figma.com/api/mcp/asset/ec478964-b6ac-42fd-afb8-1ab0f2cfd236",
    rating: 4.5,
    reviews: "120 reviews",
    cuisine: "Mexicana, taquería",
    priceRange: { min: "$", max: "$$" },
  },
  {
    name: "The Spice Route",
    image: "https://www.figma.com/api/mcp/asset/ec478964-b6ac-42fd-afb8-1ab0f2cfd236",
    rating: 4.7,
    reviews: "95 reviews",
    cuisine: "India, curry house",
    priceRange: { min: "$$", max: "$$$" },
  },
  {
    name: "Burger Joint",
    image: "https://www.figma.com/api/mcp/asset/ec478964-b6ac-42fd-afb8-1ab0f2cfd236",
    rating: 4.3,
    reviews: "300 reviews",
    cuisine: "Americana, hamburguesería",
    priceRange: { min: "$", max: "$$" },
  },
];
```

### currentWeather y forecastDays
```javascript
const currentWeather = {
  temp: "17° C",
  description: "Nubes dispersas",
};

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
```

### typicalWeatherItems
```javascript
const typicalWeatherItems = [
  { Icon: Thermometer, label: "Temperaturas:", value: "22°C a 32°C" },
  { Icon: Sun, value: "Días calurosos y húmedos" },
  { Icon: CloudLightning, value: "Posibles tormentas eléctricas aisladas" },
  {
    Icon: WarningCircle,
    value: "Lleva ropa liviana, gorra, protector solar y botella reutilizable.",
    alignTop: true,
  },
];
```

### kansasCityMatches (6 partidos)
```javascript
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
```

---

## ✅ Checklist de Actualización para build-venues.mjs

### 1. Imports de Componentes
- [ ] Agregar `VenuesCityGrid` a la lista de imports
- [ ] Verificar que todos los 18 componentes estén importados
- [ ] Verificar que los 13 iconos de Phosphor estén disponibles

### 2. Clases Tailwind Críticas a Preservar

#### Containers
- [ ] `w-full min-h-screen flex flex-col bg-bg-secondary pb-10` (main)
- [ ] `max-w-[1366px]` con `px-4` y `lg:mt-4`
- [ ] `max-w-[1200px]`
- [ ] `max-w-[548px] lg:max-w-[996px]` (contenido principal)
- [ ] `max-w-[548px] lg:max-w-full` (Assist365)

#### Grid Principal
- [ ] `flex flex-col lg:grid lg:grid-cols-2 gap-x-6 gap-y-4 mb-6`

#### Partidos (contenedor especial)
- [ ] `order-4 lg:order-2`
- [ ] `px-4 lg:px-10`
- [ ] `lg:h-[836px]`
- [ ] `lg:row-span-3`
- [ ] `mt-4 lg:mt-0`
- [ ] Scroll interno: `max-w-[548px] lg:max-w-[368px] venues-scrollbar`

#### Mapa
- [ ] `lg:w-[486px] h-[242px]`
- [ ] `rounded-3xl overflow-hidden`
- [ ] `mt-4`

#### VenueCards con min-heights
- [ ] `min-h-[228px]` (Clima Actual y Típico)
- [ ] `min-h-[260px]` (Vuelos y Aeropuerto)
- [ ] `min-h-[248px]` (Transporte y Requisitos USA)
- [ ] Todos con `lg:mt-4` excepto Descripción e Info Estadio

#### Alojamientos y Gastronomía
- [ ] `bg-brand-darkening p-4 lg:p-6 rounded-3xl`
- [ ] `mt-4 lg:mt-10` (Alojamientos)
- [ ] `mt-6` (Gastronomía)

#### Seguridad/Prevención
- [ ] `grid lg:grid-cols-2 gap-4 lg:gap-6 mb-6 mt-4 lg:mt-10`
- [ ] Cada columna: `lg:w-[486px]`

#### VenuesCityGrid
- [ ] `max-w-[548px] lg:max-w-[996px]`
- [ ] `mt-10 lg:mt-28` ⚠️ **CRÍTICO**

### 3. Sistema de Orders
- [ ] Descripción: `order-1 lg:order-1`
- [ ] Info Estadio: `order-2 lg:order-3`
- [ ] Mapa: `order-3 lg:order-5`
- [ ] Partidos: `order-4 lg:order-2`
- [ ] Clima Actual: `order-5 lg:order-7`
- [ ] Clima Típico: `order-6 lg:order-8`
- [ ] Vuelos: `order-7 lg:order-9`
- [ ] Aeropuerto: `order-7 lg:order-10` (duplicado intencional)
- [ ] Transporte: `order-8 lg:order-11`
- [ ] Requisitos USA: `order-10 lg:order-12`

### 4. Props y Data
- [ ] Inyectar `cityData` (2 propiedades)
- [ ] Inyectar `venueData` (4 propiedades)
- [ ] Inyectar `flightsData` (4 vuelos)
- [ ] Inyectar `airportData` (3 props + array)
- [ ] Inyectar `transportData` (1 + array de 3)
- [ ] Inyectar `usEntryData` (array de 4 + link)
- [ ] Inyectar `accommodationsData` (array de 6)
- [ ] Inyectar `gastronomyData` (array de 6)
- [ ] Inyectar `currentWeather` (2 props)
- [ ] Inyectar `forecastDays` (array de 4)
- [ ] Inyectar `typicalWeatherItems` (array de 4)
- [ ] Inyectar `kansasCityMatches` (array de 6)

### 5. State Management
- [ ] `selectedTeam` = null (inicial)
- [ ] `selectedCity` = null (inicial)
- [ ] Pasar a MapContainer: `selectedTeam`, `selectedCity`, `setSelectedCity`

### 6. Event Handlers
- [ ] Botón "Volver a partidos": `window.location.href = "mainpage.html"`
- [ ] Botón "Explorar itinerarios": `window.location.href = "venues.html"`
- [ ] Los componentes hijos pueden tener handlers propios

### 7. Renderizado de Componentes
- [ ] `HeaderBar` (sin props)
- [ ] 2 `Button` de navegación (solo desktop: `hidden lg:flex`)
- [ ] Título con `MapPinLineIcon` size={32} weight="duotone"
- [ ] 10 elementos dentro del grid con orders
- [ ] `AccommodationsWidget` con array de 6
- [ ] `GastronomyWidget` con array de 6
- [ ] `SafetyWidget` (sin props)
- [ ] `PreventionWidget` (sin props)
- [ ] `Assist365BannersWidget` (sin props)
- [ ] `VenuesCityGrid` (sin props - NUEVO)

---

## 🎯 Valores Arbitrarios de Tailwind (NO MODIFICAR)

Estos valores deben mantenerse **exactamente** como están:

```
h-[242px]       → Mapa
h-[836px]       → Partidos (desktop)
max-w-[1366px]  → Container principal
max-w-[1200px]  → Container secundario
max-w-[996px]   → Contenido principal (desktop)
max-w-[548px]   → Contenido principal (mobile)
max-w-[368px]   → Scroll de partidos (desktop)
min-h-[228px]   → Clima Actual y Típico
min-h-[260px]   → Vuelos y Aeropuerto
min-h-[248px]   → Transporte y Requisitos USA
w-[486px]       → Mapa y columnas Seguridad/Prevención (desktop)
```

---

## 📐 Breakpoints Responsivos

### Mobile (< 1024px)
- Layout: `flex flex-col` (columna vertical)
- Padding: `px-4`, `p-4`
- Max-width: `max-w-[548px]`
- Heights: Variables según contenido (min-heights aplican)
- Orders: 1, 2, 3, 4, 5, 6, 7, 7, 8, 10
- Botones de navegación: ocultos (`hidden`)
- Partidos: Sin height fijo, sin row-span

### Desktop (≥ 1024px)
- Layout: `lg:grid lg:grid-cols-2` (grid de 2 columnas)
- Padding: `lg:px-10`, `lg:p-6`
- Max-width: `lg:max-w-[996px]`, `lg:max-w-full`
- Heights: Fijos donde se especifica (`lg:h-[836px]`)
- Orders: 1, 2, 3, 5, 7, 8, 9, 10, 11, 12
- Row-span: `lg:row-span-3` en Partidos
- Margins: `lg:mt-4`, `lg:mt-10`, `lg:mt-28`
- Gaps: `gap-x-6 gap-y-4`, `lg:gap-6`
- Widths fijos: `lg:w-[486px]`
- Botones de navegación: visibles (`lg:flex`)

---

## ⚠️ Problemas Detectados / Consideraciones

1. **Duplicado de order-7**:
   - Vuelos y Aeropuerto ambos tienen `order-7` en mobile
   - Mantener tal cual (probablemente intencional para agruparlos)

2. **VenuesCityGrid NUEVO**:
   - Asegurar que el componente existe en `src/components/VenuesCityGrid.jsx`
   - Verificar que renderiza correctamente sin props
   - Verificar que tiene el botón de navegación a `venuesSelection.html`

3. **Iconos sin usar**:
   - `MapPinAreaIcon`, `MapPinIcon`, `SoccerBallIcon`, `UsersFourIcon` están importados pero no usados
   - Pueden ser necesarios para componentes hijos

4. **Heights precisos**:
   - `lg:h-[836px]` en Partidos es crítico para que el scroll funcione
   - `h-[242px]` en Mapa debe ser exacto

5. **Clase custom `venues-scrollbar`**:
   - Verificar que existe en el CSS global
   - Probablemente define estilos custom para el scrollbar

6. **Estado compartido**:
   - `selectedTeam` y `selectedCity` se inicializan como `null`
   - `setSelectedCity` se pasa a MapContainer para interactividad

---

## 📋 Testing Checklist Final

Después de aplicar cambios, verificar **pixel-perfect**:

### Layout
- [ ] Mobile: Columna vertical sin overflow horizontal
- [ ] Tablet: Transición suave entre breakpoints
- [ ] Desktop: Grid de 2 columnas perfecto

### Orden de Elementos
- [ ] Mobile: Descripción → Info Estadio → Mapa → Partidos → Clima Actual → ...
- [ ] Desktop: Columna izq (Descripción, Info, Mapa, Clima Actual, Vuelos, Transporte) + Columna der (Partidos span 3, Clima Típico, Aeropuerto, Requisitos)

### Spacing
- [ ] Padding: `px-4` mobile, `lg:px-10` desktop en Partidos
- [ ] Padding: `p-4` mobile, `lg:p-6` desktop en Alojamientos/Gastronomía
- [ ] Gaps: `gap-x-6 gap-y-4` en grid principal
- [ ] Gaps: `gap-4 lg:gap-6` en Seguridad/Prevención
- [ ] Margins: `mt-4 lg:mt-10` en secciones principales
- [ ] Margin especial: `mt-10 lg:mt-28` en VenuesCityGrid

### Heights
- [ ] Partidos: Height auto mobile, `lg:h-[836px]` desktop con scroll
- [ ] Mapa: `h-[242px]` siempre
- [ ] Min-heights aplicados: 228px, 260px, 248px

### Widths
- [ ] Container principal: `max-w-[1366px]`
- [ ] Container secundario: `max-w-[1200px]`
- [ ] Contenido: `max-w-[548px]` mobile, `lg:max-w-[996px]` desktop
- [ ] Mapa: `lg:w-[486px]` desktop
- [ ] Assist365: `max-w-[548px]` mobile, `lg:max-w-full` desktop

### Componentes
- [ ] HeaderBar renderiza
- [ ] Botones de navegación solo en desktop
- [ ] Título con icono MapPinLine
- [ ] 6 MatchCards en scroll de Partidos
- [ ] Clima con 4 días de pronóstico
- [ ] 6 hoteles en AccommodationsWidget
- [ ] 6 restaurantes en GastronomyWidget
- [ ] VenuesCityGrid al final con spacing correcto

### Funcionalidad
- [ ] Scroll vertical funciona en Partidos (desktop)
- [ ] Botón "Volver a partidos" navega a `mainpage.html`
- [ ] Botón "Explorar itinerarios" navega a `venues.html`
- [ ] MapContainer recibe state correctamente

---

## 🚀 Próximos Pasos

1. **Actualizar `build-venues.mjs`**:
   - Agregar import de `VenuesCityGrid`
   - Inyectar todos los data objects como variables estáticas
   - Preservar todas las clases Tailwind exactamente
   - Implementar sistema de orders completo
   - Agregar todos los componentes en el orden correcto

2. **Ejecutar build**:
   ```bash
   npm run build:venues
   ```

3. **Verificar output**:
   - Revisar `dist-vanilla/venues.html`
   - Comparar con versión React en desarrollo

4. **Testing visual**:
   - Mobile: 375px, 414px
   - Tablet: 768px, 834px
   - Desktop: 1024px, 1366px, 1920px

5. **Comparación pixel-perfect**:
   - Usar DevTools para comparar layouts
   - Verificar computed styles de elementos críticos
   - Confirmar que no hay diferencias visuales

6. **Ajustes si es necesario**:
   - Documentar cualquier discrepancia encontrada
   - Iterar hasta conseguir identidad 100%

---

**Fecha de creación**: 2026-01-27  
**Versión**: 3.0  
**Autor**: GitHub Copilot  
**Estado**: ✅ Listo para implementación  
**Archivo de respaldo**: VENUES_VANILLA_BUILD_PLAN_OLD.md
