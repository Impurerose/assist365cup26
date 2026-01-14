import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json'

const cities = [
  { id: 1, name: 'Vancouver', country: 'Canada', lat: 49.28, lng: -123.12 },
  { id: 2, name: 'Seattle', country: 'USA', lat: 47.61, lng: -122.33 },
  { id: 3, name: 'Los Angeles', country: 'USA', lat: 34.05, lng: -118.24 },
  { id: 4, name: 'Las Vegas', country: 'USA', lat: 36.17, lng: -115.14 },
  { id: 5, name: 'Dallas', country: 'USA', lat: 32.78, lng: -96.80 },
  { id: 6, name: 'Houston', country: 'USA', lat: 29.76, lng: -95.37 },
  { id: 7, name: 'Kansas City', country: 'USA', lat: 39.10, lng: -94.58 },
  { id: 8, name: 'New York', country: 'USA', lat: 40.71, lng: -74.01 },
  { id: 9, name: 'Miami', country: 'USA', lat: 25.76, lng: -80.19 },
  { id: 10, name: 'Mexico City', country: 'Mexico', lat: 19.43, lng: -99.13 },
  { id: 11, name: 'Guadalajara', country: 'Mexico', lat: 20.66, lng: -103.39 },
  { id: 12, name: 'Monterrey', country: 'Mexico', lat: 25.69, lng: -100.32 },
]

export default function MapContainer({ selectedTeam, selectedCity, setSelectedCity }) {
  return (
    <div className="flex-1 overflow-hidden bg-blue-100">
      <ComposableMap projection="geoMercator" projectionConfig={{ scale: 200, center: [-100, 38] }}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: { fill: '#e6f3ff', stroke: '#999', strokeWidth: 0.75, outline: 'none' },
                  hover: { fill: '#d0e8ff', stroke: '#999', strokeWidth: 0.75, outline: 'none', cursor: 'pointer' },
                  pressed: { fill: '#c2dfff', stroke: '#999', strokeWidth: 0.75, outline: 'none' },
                }}
              />
            ))
          }
        </Geographies>

        {cities.map((city) => (
          <Marker key={city.id} coordinates={[city.lng, city.lat]}>
            <circle
              r={5}
              fill={selectedCity?.id === city.id ? '#0059ba' : '#006fe8'}
              stroke="#fff"
              strokeWidth={2}
              style={{ cursor: 'pointer' }}
              onClick={() => setSelectedCity(city)}
            />
            <text
              textAnchor="middle"
              y={-10}
              style={{ fontSize: '12px', fill: '#0059ba', fontWeight: 'bold', pointerEvents: 'none' }}
            >
              {city.name}
            </text>
          </Marker>
        ))}
      </ComposableMap>
    </div>
  )
}
