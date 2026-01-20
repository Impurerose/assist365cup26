/**
 * Google Maps Configuration
 * Configuración centralizada para el mapa de sedes del Mundial 2026
 */

// Configuración de restricciones y límites del mapa
export const MAP_RESTRICTIONS = {
  latLngBounds: {
    north: 85,
    south: -85,
    west: -180,
    east: 180,
  },
  strictBounds: true,
};

// Configuración de vista inicial del mapa
export const MAP_CONFIG = {
  mapId: import.meta.env.VITE_GOOGLE_MAP_ID,
  defaultCenter: { lat: 45.5, lng: -100 },
  defaultZoom: 4,
  minZoom: 3,
  gestureHandling: 'greedy',
  disableDefaultUI: true,
};

// Estilos para zoom inicial/bajo (zoom ≤ 7) - Mapa completamente limpio, solo markers
export const MAP_STYLES_LOW_ZOOM = [
  // Ocultar TODOS los labels - todos los niveles administrativos
  {
    featureType: 'all',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'administrative',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'administrative.country',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'administrative.province',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  // Ocultar geometría administrativa (bordes)
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'administrative.country',
    elementType: 'geometry',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'administrative.province',
    elementType: 'geometry',
    stylers: [{ visibility: 'off' }],
  },
  // Ocultar puntos de interés
  {
    featureType: 'poi',
    stylers: [{ visibility: 'off' }],
  },
  // Ocultar todas las carreteras
  {
    featureType: 'road',
    stylers: [{ visibility: 'off' }],
  },
  // Ocultar transporte
  {
    featureType: 'transit',
    stylers: [{ visibility: 'off' }],
  },
  // Agua con color suave
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#a8d5f7' }],
  },
  // Tierra con color beige claro
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [{ color: '#f5f1e8' }],
  },
];

// Estilos para zoom alto (zoom > 7) - Mostrar solo labels de países
export const MAP_STYLES_HIGH_ZOOM = [
  // Mostrar labels de países
  {
    featureType: 'administrative.country',
    elementType: 'labels',
    stylers: [{ visibility: 'on' }],
  },
  // Mantener TODO lo demás oculto
  {
    featureType: 'administrative.province',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'poi',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'road',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'transit',
    stylers: [{ visibility: 'off' }],
  },
];

// Nivel de zoom donde aparecen las etiquetas (cuando zoom > 7)
export const ZOOM_THRESHOLD = 7;

// Datos de sedes (venues)
export const VENUES = [
  { id: 'miami', name: 'Miami', country: 'USA', stadium: 'Hard Rock Stadium', coordinates: { lat: 25.7617, lng: -80.1918 } },
  { id: 'new-york', name: 'New York', country: 'USA', stadium: 'MetLife Stadium', coordinates: { lat: 40.7128, lng: -74.0060 } },
  { id: 'los-angeles', name: 'Los Angeles', country: 'USA', stadium: 'SoFi Stadium', coordinates: { lat: 34.0522, lng: -118.2437 } },
  { id: 'dallas', name: 'Dallas', country: 'USA', stadium: 'AT&T Stadium', coordinates: { lat: 32.7767, lng: -96.7970 } },
  { id: 'kansas-city', name: 'Kansas City', country: 'USA', stadium: 'Arrowhead Stadium', coordinates: { lat: 39.0997, lng: -94.5786 } },
  { id: 'philadelphia', name: 'Philadelphia', country: 'USA', stadium: 'Lincoln Financial Field', coordinates: { lat: 39.9526, lng: -75.1652 } },
  { id: 'atlanta', name: 'Atlanta', country: 'USA', stadium: 'Mercedes-Benz Stadium', coordinates: { lat: 33.7490, lng: -84.3880 } },
  { id: 'seattle', name: 'Seattle', country: 'USA', stadium: 'Lumen Field', coordinates: { lat: 47.6062, lng: -122.3321 } },
  { id: 'san-francisco', name: 'San Francisco', country: 'USA', stadium: 'Levi\'s Stadium', coordinates: { lat: 37.7749, lng: -122.4194 } },
  { id: 'boston', name: 'Boston', country: 'USA', stadium: 'Gillette Stadium', coordinates: { lat: 42.3601, lng: -71.0589 } },
  { id: 'houston', name: 'Houston', country: 'USA', stadium: 'NRG Stadium', coordinates: { lat: 29.7604, lng: -95.3698 } },
  { id: 'ciudad-de-mexico', name: 'Ciudad de México', country: 'México', stadium: 'Estadio Azteca', coordinates: { lat: 19.4326, lng: -99.1332 } },
  { id: 'monterrey', name: 'Monterrey', country: 'México', stadium: 'Estadio BBVA', coordinates: { lat: 25.6866, lng: -100.3161 } },
  { id: 'guadalajara', name: 'Guadalajara', country: 'México', stadium: 'Estadio Akron', coordinates: { lat: 20.6597, lng: -103.3496 } },
  { id: 'toronto', name: 'Toronto', country: 'Canadá', stadium: 'BMO Field', coordinates: { lat: 43.6532, lng: -79.3832 } },
  { id: 'vancouver', name: 'Vancouver', country: 'Canadá', stadium: 'BC Place', coordinates: { lat: 49.2827, lng: -123.1207 } },
];
