import { useState } from 'react'
import HeaderBar from './components/HeaderBar'
import Controls from './components/Controls'
import MapContainer from './components/MapContainer'
import SidePanel from './components/SidePanel'

function App() {
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [viewMode, setViewMode] = useState('venue')
  const [selectedCity, setSelectedCity] = useState(null)
  const [panelTab, setPanelTab] = useState('groups')

  return (
    <div className="w-full h-screen flex flex-col bg-white">
      <HeaderBar />
      
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col">
          <Controls
            selectedTeam={selectedTeam}
            setSelectedTeam={setSelectedTeam}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
          <MapContainer
            selectedTeam={selectedTeam}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
          />
        </div>

        <SidePanel
          panelTab={panelTab}
          setPanelTab={setPanelTab}
          selectedCity={selectedCity}
        />
      </div>
    </div>
  )
}

export default App
