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

// Estilos del mapa para apariencia minimalista
export const MAP_STYLES = [
  // Ocultar todos los labels primero
  {
    featureType: 'all',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  // Mostrar solo labels de países
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

// Datos de sedes (venues)
export const VENUES = [
  {
    id: 'kansas-city',
    name: 'Kansas City',
    country: 'USA',
    coordinates: { lat: 39.0997, lng: -94.5786 },
  },
];
