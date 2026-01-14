import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'

const geoUrl = "https://unpkg.com/world-atlas@2/countries-110m.json"

const markers = [
  { name: "Vancouver", coordinates: [-123.1207, 49.2827] },
  { name: "Seattle", coordinates: [-122.3321, 47.6062] },
  { name: "Los Angeles", coordinates: [-118.2437, 34.0522] },
  { name: "Las Vegas", coordinates: [-115.1398, 36.1699] },
  { name: "Dallas", coordinates: [-96.7970, 32.7767] },
  { name: "Houston", coordinates: [-95.3698, 29.7604] },
  { name: "Kansas City", coordinates: [-94.5786, 39.0997] },
  { name: "New York", coordinates: [-74.0060, 40.7128] },
  { name: "Miami", coordinates: [-80.1918, 25.7617] },
  { name: "Mexico City", coordinates: [-99.1332, 19.4326] },
  { name: "Guadalajara", coordinates: [-103.3496, 20.6597] },
  { name: "Monterrey", coordinates: [-100.3161, 25.6866] }
]

export default function MapContainer({ selectedTeam, selectedCity, setSelectedCity }) {
  return (
    <div className="flex-1 overflow-auto bg-sky-200 p-4">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          center: [-95, 35],
          scale: 400
        }}
        width={800}
        height={600}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography 
                key={geo.rsmKey} 
                geography={geo} 
                fill="#e6d4b8"
                stroke="#999" 
                strokeWidth={0.5}
              />
            ))
          }
        </Geographies>
        {markers.map(({ name, coordinates }) => (
          <Marker key={name} coordinates={coordinates}>
            <circle
              r={6}
              fill="#006fe8"
              stroke="#fff"
              strokeWidth={2}
              style={{ cursor: 'pointer' }}
              onClick={() => setSelectedCity({ name, coordinates })}
            />
            <text
              textAnchor="middle"
              y={-12}
              style={{ 
                fontFamily: "Titillium Web, sans-serif", 
                fill: "#006fe8",
                fontSize: "13px",
                fontWeight: "600",
                pointerEvents: "none"
              }}
            >
              {name}
            </text>
          </Marker>
        ))}
      </ComposableMap>
    </div>
  )
}
