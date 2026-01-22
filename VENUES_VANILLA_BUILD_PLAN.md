# Plan de Ajuste: Build Vanilla para Venues Template

**Fecha:** 22 de enero de 2026  
**Objetivo:** Hacer que `build-venues.mjs` genere un HTML 100% fiel a la maquetación del `VenuesTemplate.jsx`

---

## 📊 Estado Actual vs. Objetivo

### Estado Actual
- HTML minimalista con solo:
  - Header con logo y botón compartir ✅
  - Placeholder "Contenido en desarrollo..."
  - Botón para volver a partidos

### Objetivo
- Replicar **toda** la estructura de VenuesTemplate con:
  - Header completo ✅
  - Botones de navegación (Volver a partidos / Explorar itinerarios)
  - Título de ciudad con icono
  - Grid de 2 columnas con todos los widgets
  - Cards de hoteles y restaurantes
  - Widgets de seguridad y prevención
  - Footer con banners Assist365

---

## 🏗️ Estructura del Template React a Replicar

```
VenuesTemplate
├── HeaderBar (✅ ya existe)
│
├── Contenedor principal (max-w-[1366px])
│   │
│   ├── Navegación Superior
│   │   ├── Button "Volver a partidos" (← icon, tertiary)
│   │   └── Button "Explorar itinerarios" (✈️ icon, secondary)
│   │
│   ├── Título Ciudad
│   │   └── MapPinLine icon + "Kansas City, Missouri, Estados Unidos"
│   │
│   └── Grid Principal 2 Columnas (grid-cols-2 gap-6)
│       │
│       ├── COLUMNA IZQUIERDA (w-[486px])
│       │   ├── 1. VenueCard: Descripción de la ciudad
│       │   ├── 2. VenueCard: VenueInfo
│       │   │   └── Imagen + Nombre estadio + Dirección + Capacidad
│       │   ├── 3. MapContainer (486x242px, rounded-3xl)
│       │   ├── 4. VenueCard: CurrentWeather
│       │   │   ├── Clima actual (hoy) - izquierda
│       │   │   └── Pronóstico 4 días - derecha
│       │   ├── 5. VenueCard: FlightsWidget
│       │   │   ├── Origen → Destino
│       │   │   └── Grid 2x2 opciones de vuelo
│       │   └── 6. VenueCard: TransportInfo
│       │       ├── Descripción
│       │       └── Lista recomendaciones
│       │
│       └── COLUMNA DERECHA (w-[486px])
│           ├── 7. Card Oscura: Partidos en Kansas City
│           │   ├── h-[824px], overflow-y-auto
│           │   └── 6 MatchCards
│           ├── 8. VenueCard: TypicalWeather
│           │   └── 4 items clima habitual
│           ├── 9. VenueCard: AirportInfo
│           │   ├── Nombre aeropuerto
│           │   ├── Descripción + features
│           │   └── Link oficial
│           └── 10. VenueCard: USEntryRequirements
│               ├── Lista requisitos
│               └── Link oficial
│
├── Cards Anchas (full width max-w-[996px])
│   ├── 11. AccommodationsWidget
│   │   ├── Título "Alojamiento"
│   │   └── Grid 3 columnas x 6 hoteles
│   │       └── HotelCard: imagen, nombre, rating, reviews, precio
│   └── 12. GastronomyWidget
│       ├── Título "Gastronomía"
│       └── Grid 3 columnas x 6 restaurantes
│           └── RestaurantCard: imagen, nombre, rating, cuisine, priceRange
│
├── Grid 2 Columnas Final
│   ├── 13. VenueCard: SafetyWidget
│   └── 14. VenueCard: PreventionWidget
│
└── 15. Assist365BannersWidget (footer)
```

---

## 📦 Componentes a Convertir a HTML Vanilla

### 1. Botones de Navegación

**React:**
```jsx
<Button color="tertiary" iconPosition="left" icon={<CaretLeftIcon />}>
  Volver a partidos
</Button>
<Button color="secondary" iconPosition="left" icon={<AirplaneTiltIcon />}>
  Explorar itinerarios
</Button>
```

**Vanilla HTML:**
```html
<button onclick="window.location.href='mainpage.html'" 
  class="inline-flex items-center justify-center gap-2 px-4 py-2 h-10 text-base font-semibold rounded-xl bg-transparent border border-border-primary text-text-default hover:bg-bg-alt-tertiary transition-colors">
  <i class="ph ph-caret-left" style="font-size: 16px; font-weight: bold;"></i>
  Volver a partidos
</button>
```

**Clases por tipo:**
- `tertiary`: bg-transparent, border, border-border-primary
- `secondary`: bg-bg-alt-tertiary, text-text-default

---

### 2. VenueCard (wrapper genérico)

**React:**
```jsx
<VenueCard className="mt-4">
  {children}
</VenueCard>
```

**Vanilla HTML:**
```html
<div class="bg-bg-primary rounded-3xl text-base text-text-default p-6 mt-4">
  <!-- contenido -->
</div>
```

---

### 3. VenueInfo

**Elementos:**
- Imagen del estadio (w-full, rounded-2xl, mb-4)
- Nombre estadio (font-semibold, text-xl)
- Dirección con MapPin icon
- Capacidad con UsersFour icon

**HTML:**
```html
<img src="[url]" alt="Arrowhead Stadium" class="w-full h-auto rounded-2xl mb-4" />
<div class="flex flex-col gap-y-4 text-base text-text-default">
  <span class="font-semibold text-xl">Arrowhead Stadium</span>
  <div class="gap-y-2 flex flex-col">
    <span>
      <i class="ph-duotone ph-map-pin inline-block mr-2 text-icon-lighter" style="font-size: 20px;"></i>
      1 Arrowhead Dr, Kansas City, MO 64129
    </span>
    <span>
      <i class="ph-duotone ph-users-four inline-block mr-2 text-icon-lighter" style="font-size: 20px;"></i>
      Capacidad: 67,513
    </span>
  </div>
</div>
```

---

### 4. CurrentWeather

**Layout:** flex gap-10
- **Izquierda:** Clima actual (CloudSun icon + temp + descripción)
- **Derecha:** 4 días pronóstico (border-l, pl-4)

**Estructura:**
```html
<div class="flex gap-10 mt-4">
  <!-- Clima actual -->
  <div class="flex gap-2 items-center pl-4">
    <i class="ph-duotone ph-cloud-sun text-text-lighter" style="font-size: 40px;"></i>
    <div class="flex flex-col gap-1.5 w-[98px]">
      <p class="text-sm text-text-default">Hoy</p>
      <p class="text-4xl font-semibold text-text-default leading-10">17° C</p>
      <p class="text-sm text-text-lighter">Nubes dispersas</p>
    </div>
  </div>
  
  <!-- Pronóstico 4 días -->
  <div class="flex flex-col gap-3 border-l border-border-primary w-full pl-4">
    <!-- ForecastDay x4 -->
  </div>
</div>
```

**ForecastDay:**
```html
<div class="flex items-center gap-2">
  <span class="text-sm font-semibold text-text-default w-10">Mié</span>
  <i class="ph-duotone ph-cloud text-text-lighter" style="font-size: 20px;"></i>
  <span class="text-sm text-text-lighter">13° - 26°</span>
  <span class="text-xs text-text-lighter ml-auto">Nubes</span>
</div>
```

**Íconos clima:**
- Cloud: `ph-cloud`
- CloudRain: `ph-cloud-rain`
- Sun: `ph-sun` (text-warning-primary)
- CloudLightning: `ph-cloud-lightning`

---

### 5. FlightsWidget

**Estructura:**
```html
<div class="flex flex-col gap-4">
  <!-- Header -->
  <div class="flex items-center gap-2">
    <i class="ph-duotone ph-airplane-tilt text-icon-default" style="font-size: 24px;"></i>
    <span class="text-xl font-semibold text-text-default">Vuelos</span>
  </div>
  
  <!-- Ruta -->
  <div class="text-sm text-text-lighter">
    <span>Ministro Pistarini Ezeiza (EZE)</span>
    <i class="ph ph-arrow-right mx-2"></i>
    <span>Kansas City International (MCI)</span>
  </div>
  <p class="text-sm text-text-lighter">Junio - Julio</p>
  
  <!-- Grid vuelos 2x2 -->
  <div class="grid grid-cols-2 gap-3">
    <!-- FlightOption x4 -->
  </div>
</div>
```

**FlightOption:**
```html
<div class="bg-bg-secondary rounded-xl p-3 flex flex-col gap-2">
  <div class="flex items-center gap-2">
    <img src="[logo]" alt="Aerolínea" class="w-8 h-8 rounded" />
    <span class="text-sm font-semibold">Aerolinea</span>
  </div>
  <div class="text-xs text-text-lighter">
    <p>16h 30min · Directo</p>
    <p class="font-semibold text-text-default mt-1">desde USD XXX</p>
  </div>
</div>
```

---

### 6. TransportInfo

```html
<div class="flex flex-col gap-4">
  <div class="flex items-center gap-2">
    <i class="ph-duotone ph-car text-icon-default" style="font-size: 24px;"></i>
    <span class="text-xl font-semibold">Traslados</span>
  </div>
  <p class="text-sm text-text-default">
    Kansas City no cuenta con un sistema de transporte público muy extenso...
  </p>
  <ul class="list-disc list-inside text-sm text-text-default space-y-1">
    <li>Uber / Lyft (muy disponibles y confiables)</li>
    <li>Alquiler de auto (ideal si te alojas fuera del centro)</li>
    <li>Servicios especiales de transporte al estadio en días de partido</li>
  </ul>
</div>
```

---

### 7. Partidos en Kansas City (Card Oscura)

```html
<div class="bg-brand-darkening rounded-xl py-6 px-10 flex flex-col h-[824px]">
  <span class="text-text-default text-base font-semibold block pb-3 flex-shrink-0">
    Partidos en Kansas City
  </span>
  <div class="flex-1 overflow-y-auto min-h-0 flex flex-col gap-4 w-full max-w-[368px]">
    <!-- MatchCard x6 -->
  </div>
</div>
```

**MatchCard:**
```html
<div class="bg-bg-primary rounded-2xl p-4 flex flex-col gap-3">
  <!-- Teams -->
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-2">
      <span class="text-2xl">🇯🇴</span>
      <span class="text-sm font-semibold">Jordania</span>
    </div>
    <span class="text-xs text-text-lighter">vs</span>
    <div class="flex items-center gap-2">
      <span class="text-sm font-semibold">Argentina</span>
      <span class="text-2xl">🇦🇷</span>
    </div>
  </div>
  
  <!-- Info -->
  <div class="text-xs text-text-lighter space-y-1">
    <p>Sábado 27 de junio</p>
    <p>Dallas</p>
    <p>22:00 h (AR) · 19:00 h (DL)</p>
  </div>
</div>
```

---

### 8. TypicalWeather

```html
<div class="flex flex-col gap-4">
  <span class="text-xl font-semibold">Clima habitual junio-julio</span>
  
  <!-- Items x4 -->
  <div class="flex items-start gap-3">
    <i class="ph-duotone ph-thermometer text-icon-lighter" style="font-size: 20px;"></i>
    <div class="flex flex-col">
      <span class="text-sm font-semibold">Temperaturas:</span>
      <span class="text-sm text-text-lighter">22°C a 32°C</span>
    </div>
  </div>
  
  <div class="flex items-center gap-3">
    <i class="ph-duotone ph-sun text-icon-lighter" style="font-size: 20px;"></i>
    <span class="text-sm">Días calurosos y húmedos</span>
  </div>
  
  <!-- ... más items -->
</div>
```

---

### 9. AirportInfo

```html
<div class="flex flex-col gap-4">
  <div class="flex items-center gap-2">
    <i class="ph-duotone ph-airplane-tilt text-icon-default" style="font-size: 24px;"></i>
    <span class="text-xl font-semibold">Aeropuerto</span>
  </div>
  
  <div>
    <p class="font-semibold text-base">Kansas City International (MCI)</p>
    <p class="text-sm text-text-lighter mt-2">
      Kansas City International (MCI) es el principal.
    </p>
  </div>
  
  <ul class="list-disc list-inside text-sm space-y-1">
    <li>Vuelos nacionales e internacionales</li>
    <li>A 30–35 minutos del centro</li>
  </ul>
  
  <a href="https://www.flykci.com/" target="_blank" rel="noopener noreferrer" 
    class="text-sm text-brand-primary hover:underline">
    Sitio oficial →
  </a>
</div>
```

---

### 10. USEntryRequirements

```html
<div class="flex flex-col gap-4">
  <div class="flex items-center gap-2">
    <i class="ph-duotone ph-identification-card text-icon-default" style="font-size: 24px;"></i>
    <span class="text-xl font-semibold">Requisitos de ingreso a EE.UU.</span>
  </div>
  
  <ul class="list-disc list-inside text-sm space-y-1">
    <li>Pasaporte vigente</li>
    <li>Visa o ESTA (según nacionalidad)</li>
    <li>Ticket de salida del país</li>
    <li>Seguro médico de viaje recomendado</li>
  </ul>
  
  <a href="https://travel.state.gov/" target="_blank" rel="noopener noreferrer"
    class="text-sm text-brand-primary hover:underline">
    Más información →
  </a>
</div>
```

---

### 11. AccommodationsWidget

```html
<div class="flex flex-col gap-4">
  <div class="flex items-center gap-2">
    <i class="ph-duotone ph-building text-icon-default" style="font-size: 24px;"></i>
    <span class="text-xl font-semibold text-text-default">Alojamiento</span>
  </div>
  
  <p class="text-sm text-text-lighter">
    Opciones de hospedaje cerca del estadio y el centro de la ciudad.
  </p>
  
  <!-- Grid 3 columnas -->
  <div class="grid grid-cols-3 gap-4">
    <!-- HotelCard x6 -->
  </div>
</div>
```

**HotelCard:**
```html
<div class="bg-bg-primary rounded-2xl overflow-hidden">
  <img src="[url]" alt="Sheraton Hotel" class="w-full h-32 object-cover" />
  <div class="p-4 flex flex-col gap-2">
    <h4 class="font-semibold text-sm">Sheraton Hotel</h4>
    <div class="flex items-center gap-2 text-xs">
      <span class="flex items-center gap-1">
        <i class="ph-fill ph-star text-warning-primary"></i>
        4.3
      </span>
      <span class="text-text-lighter">X reviews</span>
    </div>
    <span class="text-xs font-semibold">$$$$$</span>
  </div>
</div>
```

---

### 12. GastronomyWidget

Misma estructura que AccommodationsWidget pero con RestaurantCard.

**RestaurantCard:**
```html
<div class="bg-bg-primary rounded-2xl overflow-hidden">
  <img src="[url]" alt="La Trattoria" class="w-full h-32 object-cover" />
  <div class="p-4 flex flex-col gap-2">
    <h4 class="font-semibold text-sm">La Trattoria</h4>
    <div class="flex items-center gap-2 text-xs">
      <span class="flex items-center gap-1">
        <i class="ph-fill ph-star text-warning-primary"></i>
        4.6
      </span>
      <span class="text-text-lighter">150 reviews</span>
    </div>
    <p class="text-xs text-text-lighter">Italiana, pizzería</p>
    <span class="text-xs font-semibold">$$ - $$$</span>
  </div>
</div>
```

---

### 13 & 14. SafetyWidget & PreventionWidget

Widgets con contenido de texto sobre seguridad y prevención (similar estructura a otros cards con título + párrafos/listas).

---

### 15. Assist365BannersWidget

Banners footer con logos y enlaces a assist365.

---

## 🎨 Datos Mock Completos

Todos los datos ya están en `VenuesTemplate.jsx` (líneas 40-340):

```javascript
const cityData = { name: "...", description: "..." };
const venueData = { image: "...", name: "...", address: "...", capacity: "..." };
const flightsData = { origin: "...", destination: "...", flights: [...] };
const airportData = { name: "...", description: "...", features: [...] };
const transportData = { description: "...", recommendations: [...] };
const usEntryData = { requirements: [...], officialLink: "..." };
const accommodationsData = [6 hoteles];
const gastronomyData = [6 restaurantes];
const currentWeather = { temp: "17° C", description: "Nubes dispersas" };
const forecastDays = [4 días];
const typicalWeatherItems = [4 items];
const kansasCityMatches = [6 partidos];
```

---

## 🔧 Pasos de Implementación

### Fase 1: Estructura Base
1. ✅ Header (ya existe)
2. Agregar botones de navegación
3. Agregar título de ciudad con MapPinLine
4. Crear grid 2 columnas (max-w-[996px] mx-auto)

### Fase 2: Columna Izquierda
5. VenueCard: Descripción ciudad
6. VenueCard: VenueInfo (imagen estadio + datos)
7. MapContainer (placeholder imagen estática 486x242)
8. VenueCard: CurrentWeather
9. VenueCard: FlightsWidget
10. VenueCard: TransportInfo

### Fase 3: Columna Derecha
11. Card oscura: Partidos (h-[824px], overflow-y-auto)
12. VenueCard: TypicalWeather
13. VenueCard: AirportInfo
14. VenueCard: USEntryRequirements

### Fase 4: Cards Anchas
15. AccommodationsWidget (grid 3 cols)
16. GastronomyWidget (grid 3 cols)

### Fase 5: Grid Final + Footer
17. Grid 2 cols: SafetyWidget + PreventionWidget
18. Assist365BannersWidget

### Fase 6: Refinamiento
19. Verificar espaciados (mt-4, mt-6, mt-10, gap-6, pb-10)
20. Verificar anchos (w-[486px], max-w-[996px], max-w-[1200px])
21. Verificar alturas fijas (h-[824px], h-[242px])
22. Verificar íconos Phosphor (weights, sizes)
23. Testing visual vs React version

---

## ⚠️ Consideraciones Especiales

### MapContainer
- **React:** Usa Leaflet interactivo
- **Vanilla:** Usar imagen estática o `<iframe>` simple
- **Mantener:** 486x242px, rounded-3xl, overflow-hidden

### Íconos Phosphor
- **Regular:** `<i class="ph ph-[nombre]">`
- **Duotone:** `<i class="ph-duotone ph-[nombre]">`
- **Fill:** `<i class="ph-fill ph-[nombre]">`
- **Sizes:** Usar `style="font-size: [16|20|24|32|40]px;"`
- **Weights:** Bold en íconos de botones

### Gradiente Soccer Ball (Header)
```html
<svg width="0" height="0" class="absolute">
  <defs>
    <linearGradient id="soccerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#59D3C2" stop-opacity="1" />
      <stop offset="100%" stop-color="#006FE8" stop-opacity="1" />
    </linearGradient>
  </defs>
</svg>
<i class="ph-duotone ph-soccer-ball" style="font-size: 32px; background: linear-gradient(180deg, #59D3C2 0%, #006FE8 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;"></i>
```

### Overflow y Scroll
- Card de partidos: `overflow-y-auto`, altura fija `h-[824px]`
- Contenedor interno: `flex-1 min-h-0` para correcto scroll

### Links y Navegación
```javascript
// Volver a partidos
onclick="window.location.href='mainpage.html'"

// Links externos
target="_blank" rel="noopener noreferrer"
```

### Colores Design System
```
bg-bg-secondary      // fondo principal
bg-bg-primary        // fondo cards claras
bg-brand-darkening   // fondo cards oscuras
text-text-default    // texto principal
text-text-lighter    // texto secundario
text-icon-lighter    // íconos secundarios
border-border-primary // bordes
```

---

## ✅ Criterios de Éxito

- [ ] HTML replica **exactamente** el JSX del template React
- [ ] Grid 2 columnas con anchos correctos (486px cada columna)
- [ ] Todos los espaciados coinciden con React version
- [ ] Todos los íconos Phosphor se renderizan correctamente
- [ ] Colores del design system aplicados
- [ ] Border-radius correcto (rounded-3xl, rounded-2xl, rounded-xl)
- [ ] Datos mock completos y formateados
- [ ] Navegación funcional (mainpage.html ↔ venues.html)
- [ ] Scroll funcional en sección de partidos (overflow-y-auto)
- [ ] Visual **indistinguible** de la versión React

---

## 📝 Estructura del Script

El `build-venues.mjs` debe:

1. Importar datos desde VenuesTemplate o definirlos localmente
2. Crear funciones helper para HTML repetitivo:
   - `generateFlightOption(flight)`
   - `generateMatchCard(match)`
   - `generateHotelCard(hotel)`
   - `generateRestaurantCard(restaurant)`
   - `generateForecastDay(day)`
3. Generar HTML completo con template literals
4. Escribir a `dist-vanilla/venues.html`
5. Reportar archivos generados

---

## 🚀 Próximos Pasos

1. **Implementar** las modificaciones en `build-venues.mjs`
2. **Ejecutar** `npm run build:venues` 
3. **Comparar** visual lado a lado: React dev vs HTML generado
4. **Ajustar** detalles finos (espaciados, tamaños, colores)
5. **Validar** navegación entre páginas
6. **Documentar** diferencias inevitables (mapa interactivo vs estático)

---

**Nota:** Este documento sirve como guía de implementación. No aplicar cambios hasta confirmación del usuario.
