import { useState } from "react";
import HeaderBar from "./components/HeaderBar";
import MapContainer from "./components/MapContainer";
import SidePanel from "./components/SidePanel";
import Select from "./dsys/Select";
import { TEAMS } from "./config/teamsConfig";
import { VENUES } from "./config/mapConfig";

function App() {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [viewMode, setViewMode] = useState("venue");
  const [selectedCity, setSelectedCity] = useState(null);
  const [panelTab, setPanelTab] = useState("groups");

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#F2F2F2]">
      <HeaderBar />
      <div
        className={`w-full max-w-[1366px] mx-auto ${
          !selectedTeam ? "mt-12" : ""
        }`}
      >
        <div className="px-4 w-full max-w-[1200px] mx-auto">
          {/* Selects de control - solo se muestran cuando hay equipo seleccionado */}
          {selectedTeam && (
            <div className="flex items-end justify-between gap-6 mt-6 mb-8 font-semibold">
              <div className="flex gap-x-2 items-center">
                <span className="text-[#31363A] text-xl pr-4">Soy fan de:</span>
                <Select
                  placeholder="Selecioná tu equipo"
                  options={TEAMS}
                  value={selectedTeam?.id}
                  handleSelectChange={setSelectedTeam}
                  classes="w-80"
                />
              </div>
              <div className="flex gap-x-2 items-center">
                <span className="text-[#31363A] text-xl pr-4">
                  Ver partidos en:
                </span>
                <Select
                  placeholder="Selecioná sede"
                  options={VENUES}
                  value={selectedCity?.id}
                  handleSelectChange={setSelectedCity}
                  classes="w-80"
                />
              </div>
            </div>
          )}

          <div className="gap-6 w-full flex justify-center bg-[#F2F2F2]">
            <MapContainer
              selectedTeam={selectedTeam}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
            />

            <SidePanel
              selectedTeam={selectedTeam}
              setSelectedTeam={setSelectedTeam}
              panelTab={panelTab}
              setPanelTab={setPanelTab}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
