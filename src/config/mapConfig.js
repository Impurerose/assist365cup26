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
  defaultCenter: { lat: 45.5, lng: -100 },
  defaultZoom: 4,
  minZoom: 3,
  gestureHandling: 'greedy',
  disableDefaultUI: true,
};

// Estilos del mapa para apariencia minimalista
export const MAP_STYLES = [
  {
    featureType: 'all',
    elementType: 'labels',
    stylers: [{ visibility: 'simplified' }],
  },
  {
    featureType: 'poi',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'transit',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.icon',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'administrative',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#0059BA' }],
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
