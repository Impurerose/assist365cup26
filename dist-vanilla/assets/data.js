// World Cup 2026 - Data
// Auto-generated: 2026-01-20T21:53:34.186Z

const TEAMS = [
  { id: 'ARG', name: 'Argentina', flag: '🇦🇷' },
  { id: 'BRA', name: 'Brasil', flag: '🇧🇷' },
  { id: 'COL', name: 'Colombia', flag: '🇨🇴' },
  { id: 'MEX', name: 'México', flag: '🇲🇽' },
  { id: 'PAR', name: 'Paraguay', flag: '🇵🇾' },
  { id: 'URU', name: 'Uruguay', flag: '🇺🇾' },
  { id: 'ECU', name: 'Ecuador', flag: '🇪🇨' },
  { id: 'PAN', name: 'Panamá', flag: '🇵🇦' }
];

const VENUES = [
  { id: 1, name: 'Miami', lat: 25.7617, lng: -80.1918, stadium: 'Hard Rock Stadium', country: 'USA' },
  { id: 2, name: 'New York', lat: 40.7128, lng: -74.0060, stadium: 'MetLife Stadium', country: 'USA' },
  { id: 3, name: 'Los Angeles', lat: 34.0522, lng: -118.2437, stadium: 'SoFi Stadium', country: 'USA' },
  { id: 4, name: 'Dallas', lat: 32.7767, lng: -96.7970, stadium: 'AT&T Stadium', country: 'USA' },
  { id: 5, name: 'Kansas City', lat: 39.0997, lng: -94.5786, stadium: 'Arrowhead Stadium', country: 'USA' },
  { id: 6, name: 'Philadelphia', lat: 39.9526, lng: -75.1652, stadium: 'Lincoln Financial Field', country: 'USA' },
  { id: 7, name: 'Atlanta', lat: 33.7490, lng: -84.3880, stadium: 'Mercedes-Benz Stadium', country: 'USA' },
  { id: 8, name: 'Seattle', lat: 47.6062, lng: -122.3321, stadium: 'Lumen Field', country: 'USA' },
  { id: 9, name: 'San Francisco', lat: 37.7749, lng: -122.4194, stadium: 'Levi\'s Stadium', country: 'USA' },
  { id: 10, name: 'Boston', lat: 42.3601, lng: -71.0589, stadium: 'Gillette Stadium', country: 'USA' },
  { id: 11, name: 'Houston', lat: 29.7604, lng: -95.3698, stadium: 'NRG Stadium', country: 'USA' },
  { id: 12, name: 'Ciudad de México', lat: 19.4326, lng: -99.1332, stadium: 'Estadio Azteca', country: 'México' },
  { id: 13, name: 'Monterrey', lat: 25.6866, lng: -100.3161, stadium: 'Estadio BBVA', country: 'México' },
  { id: 14, name: 'Guadalajara', lat: 20.6597, lng: -103.3496, stadium: 'Estadio Akron', country: 'México' },
  { id: 15, name: 'Toronto', lat: 43.6532, lng: -79.3832, stadium: 'BMO Field', country: 'Canadá' },
  { id: 16, name: 'Vancouver', lat: 49.2827, lng: -123.1207, stadium: 'BC Place', country: 'Canadá' }
];

const MAP_CONFIG = {
  mapId: 'c6f5508b76c0d2152b22324d',
  center: { lat: 45.5, lng: -100 },
  zoom: 4,
  minZoom: 3,
  disableDefaultUI: true,
  restriction: {
    latLngBounds: { north: 85, south: -85, west: -180, east: 180 },
    strictBounds: true
  }
};

const MAP_STYLES_LOW_ZOOM = [
  { featureType: 'all', elementType: 'labels', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'road', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] }
];

const MAP_STYLES_HIGH_ZOOM = [
  { featureType: 'all', elementType: 'labels', stylers: [{ visibility: 'off' }] },
  { featureType: 'administrative.country', elementType: 'labels.text', stylers: [{ visibility: 'on' }] },
  { featureType: 'administrative.country', elementType: 'labels.text.fill', stylers: [{ color: '#444444' }] },
  { featureType: 'administrative.province', elementType: 'labels.text', stylers: [{ visibility: 'on' }] },
  { featureType: 'administrative.province', elementType: 'labels.text.fill', stylers: [{ color: '#666666' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'road', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] }
];

const ZOOM_THRESHOLD = 8;

const MOCK_MATCHES = [
  {
    id: 1,
    number: 1,
    team1: { name: 'Argentina', flag: '🇦🇷' },
    team2: { name: 'Algeria', flag: '🇩🇿' },
    date: 'Martes 16 de junio',
    city: 'Kansas city',
    time: { local: '21:00 h (AR)', venue: '18:00 h (KCK)' },
    stage: 'groups',
    group: 'A'
  },
  {
    id: 2,
    number: 2,
    team1: { name: 'Argentina', flag: '🇦🇷' },
    team2: { name: 'Austria', flag: '🇦🇹' },
    date: 'Lunes 22 de junio',
    city: 'Dallas',
    time: { local: '13:00 h (AR)', venue: '10:00 h (DL)' },
    stage: 'groups',
    group: 'A'
  },
  {
    id: 3,
    number: 3,
    team1: { name: 'Pendiente', flag: null },
    team2: { name: 'A definir', flag: null },
    date: 'Viernes 20 de junio',
    city: 'Vélez',
    time: { local: '18:00 h (AR)', venue: '18:00 h (VEL)' },
    stage: 'groups',
    group: 'B'
  },
  {
    id: 4,
    number: 4,
    team1: { name: 'A definir', flag: null },
    team2: { name: 'A definir', flag: null },
    date: 'Jueves 26 de junio',
    city: 'Vélez',
    time: { local: '16:30 h (AR)', venue: '16:30 h (VEL)' },
    stage: 'elimination',
    phase: '16avos'
  },
  {
    id: 5,
    number: 5,
    team1: { name: 'A definir', flag: null },
    team2: { name: 'A definir', flag: null },
    date: 'Viernes 27 de junio',
    city: 'River Plate',
    time: { local: '19:00 h (AR)', venue: '19:00 h (RP)' },
    stage: 'elimination',
    phase: 'Octavos'
  },
  {
    id: 6,
    number: 6,
    team1: { name: 'A definir', flag: null },
    team2: { name: 'A definir', flag: null },
    date: 'Sábado 28 de junio',
    city: 'River Plate',
    time: { local: '21:00 h (AR)', venue: '21:00 h (RP)' },
    stage: 'elimination',
    phase: 'Cuartos'
  },
  {
    id: 7,
    number: 7,
    team1: { name: 'A definir', flag: null },
    team2: { name: 'A definir', flag: null },
    date: 'Domingo 29 de junio',
    city: 'Vélez',
    time: { local: '20:00 h (AR)', venue: '20:00 h (VEL)' },
    stage: 'elimination',
    phase: 'Semi'
  }
];

const MOCK_MATCHES_WITHOUT_PENDING = [
  {
    id: 1,
    number: 1,
    team1: { name: 'Argentina', flag: '🇦🇷' },
    team2: { name: 'Algeria', flag: '🇩🇿' },
    date: 'Martes 16 de junio',
    city: 'Kansas city',
    time: { local: '21:00 h (AR)', venue: '18:00 h (KCK)' },
    stage: 'groups',
    group: 'A'
  },
  {
    id: 2,
    number: 2,
    team1: { name: 'Argentina', flag: '🇦🇷' },
    team2: { name: 'Austria', flag: '🇦🇹' },
    date: 'Lunes 22 de junio',
    city: 'Dallas',
    time: { local: '13:00 h (AR)', venue: '10:00 h (DL)' },
    stage: 'groups',
    group: 'A'
  },
  {
    id: 3,
    number: 1,
    team1: { name: 'A definir', flag: null },
    team2: { name: 'A definir', flag: null },
    date: 'Jueves 26 de junio',
    city: 'Vélez',
    time: { local: '16:30 h (AR)', venue: '16:30 h (VEL)' },
    stage: 'elimination',
    phase: '16avos'
  },
  {
    id: 4,
    number: 2,
    team1: { name: 'A definir', flag: null },
    team2: { name: 'A definir', flag: null },
    date: 'Viernes 27 de junio',
    city: 'River Plate',
    time: { local: '19:00 h (AR)', venue: '19:00 h (RP)' },
    stage: 'elimination',
    phase: 'Octavos'
  },
  {
    id: 5,
    number: 3,
    team1: { name: 'A definir', flag: null },
    team2: { name: 'A definir', flag: null },
    date: 'Sábado 28 de junio',
    city: 'River Plate',
    time: { local: '21:00 h (AR)', venue: '21:00 h (RP)' },
    stage: 'elimination',
    phase: 'Cuartos'
  },
  {
    id: 6,
    number: 4,
    team1: { name: 'A definir', flag: null },
    team2: { name: 'A definir', flag: null },
    date: 'Domingo 29 de junio',
    city: 'Vélez',
    time: { local: '20:00 h (AR)', venue: '20:00 h (VEL)' },
    stage: 'elimination',
    phase: 'Semi'
  }
];

const MOCK_MATCHES_FINISHED = [
  {
    id: 1,
    number: 1,
    team1: { name: 'Argentina', flag: '🇦🇷', score: 5 },
    team2: { name: 'Argelia', flag: '🇩🇿', score: 1 },
    city: 'Kansas city',
    date: 'Martes 16 de junio',
    time: { local: '21:00 h (AR)', venue: '18:00 h (KCK)' },
    stage: 'groups',
    group: 'A',
    finished: true
  },
  {
    id: 2,
    number: 2,
    team1: { name: 'Argentina', flag: '🇦🇷', score: 6 },
    team2: { name: 'Austria', flag: '🇦🇹', score: 2 },
    city: 'Dallas',
    date: 'Lunes 22 de junio',
    time: { local: '13:00 h (AR)', venue: '10:00 h (DL)' },
    stage: 'groups',
    group: 'A',
    finished: true
  },
  {
    id: 3,
    number: 3,
    team1: { name: 'Jordania', flag: '🇯🇴', score: 3 },
    team2: { name: 'Argentina', flag: '🇦🇷', score: 7 },
    city: 'Dallas',
    date: 'Sábado 27 de junio',
    time: { local: '22:00 h (AR)', venue: '19:00 h (DL)' },
    stage: 'groups',
    group: 'A',
    finished: true
  }
];
