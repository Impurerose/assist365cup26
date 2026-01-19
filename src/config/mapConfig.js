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
  {
    id: 'kansas-city',
    name: 'Kansas City',
    country: 'USA',
    coordinates: { lat: 39.0997, lng: -94.5786 },
  },
];
