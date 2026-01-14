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
    <div className="w-full min-h-screen flex flex-col bg-white">
      <HeaderBar />
      
      <div className="w-full flex justify-center bg-gray-50">
        <div className="w-full max-w-[1366px] px-4">
          <Controls
            selectedTeam={selectedTeam}
            setSelectedTeam={setSelectedTeam}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
          
          <div className="flex gap-6 py-6">
            <MapContainer
              selectedTeam={selectedTeam}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
            />

            <SidePanel
              panelTab={panelTab}
              setPanelTab={setPanelTab}
              selectedCity={selectedCity}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
