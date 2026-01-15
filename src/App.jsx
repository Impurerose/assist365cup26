import { useState } from "react";
import HeaderBar from "./components/HeaderBar";
import MapContainer from "./components/MapContainer";
import SidePanel from "./components/SidePanel";

function App() {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [viewMode, setViewMode] = useState("venue");
  const [selectedCity, setSelectedCity] = useState(null);
  const [panelTab, setPanelTab] = useState("groups");

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#F2F2F2]">
      <HeaderBar />
      <div className="w-full max-w-[1366px] mx-auto">
        <div className="w-full max-w-[1200px] mx-auto">
          <div className="w-full flex justify-center bg-[#F2F2F2]">
            <div className="w-full max-w-[1366px] px-4">
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
      </div>
    </div>
  );
}

export default App;
