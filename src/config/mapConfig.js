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

// Estilos para zoom bajo (≤ 8) - Sin etiquetas, solo markers
export const MAP_STYLES_LOW_ZOOM = [
  // Ocultar todos los labels
  {
    featureType: 'all',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  // Ocultar puntos de interés
  {
    featureType: 'poi',
    stylers: [{ visibility: 'off' }],
  },
  // Ocultar rutas
  {
    featureType: 'road',
    stylers: [{ visibility: 'off' }],
  },
  // Ocultar transporte
  {
    featureType: 'transit',
    stylers: [{ visibility: 'off' }],
  },
];

// Estilos para zoom alto (> 8) - Con etiquetas de países y estados
export const MAP_STYLES_HIGH_ZOOM = [
  // Ocultar todos los labels primero
  {
    featureType: 'all',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  // Mostrar labels de países
  {
    featureType: 'administrative.country',
    elementType: 'labels.text',
    stylers: [{ visibility: 'on' }],
  },
  {
    featureType: 'administrative.country',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#444444' }],
  },
  // Mostrar labels de estados/provincias
  {
    featureType: 'administrative.province',
    elementType: 'labels.text',
    stylers: [{ visibility: 'on' }],
  },
  {
    featureType: 'administrative.province',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#666666' }],
  },
  // Ocultar puntos de interés
  {
    featureType: 'poi',
    stylers: [{ visibility: 'off' }],
  },
  // Ocultar rutas
  {
    featureType: 'road',
    stylers: [{ visibility: 'off' }],
  },
  // Ocultar transporte
  {
    featureType: 'transit',
    stylers: [{ visibility: 'off' }],
  },
];

// Nivel de zoom donde aparecen las etiquetas
export const ZOOM_THRESHOLD = 8;

// Datos de sedes (venues)
export const VENUES = [
  {
    id: 'kansas-city',
    name: 'Kansas City',
    country: 'USA',
    coordinates: { lat: 39.0997, lng: -94.5786 },
  },
];
