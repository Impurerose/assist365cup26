import { useState } from "react";
import HeaderBar from "./components/HeaderBar";
import MapContainer from "./components/MapContainer";
import SidePanel from "./components/SidePanel";
import Select from "./dsys/Select";
import Button from "./dsys/Button";
import { TEAMS } from "./config/teamsConfig";
import { VENUES } from "./config/mapConfig";
import { MapPinAreaIcon } from "@phosphor-icons/react";

function App() {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [viewMode, setViewMode] = useState("venue");
  const [selectedCity, setSelectedCity] = useState(null);
  const [panelTab, setPanelTab] = useState("groups");

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#F2F2F2]">
      <HeaderBar />
      <div
        className={`w-full mt-12 max-w-[1366px] mx-auto flex flex-col gap-y-6${
          !selectedTeam ? "mt-12" : ""
        }`}
      >
        <div className="px-4 w-full max-w-[1200px] mx-auto flex flex-col gap-y-8">
         
          <div className="gap-6 w-full flex justify-center bg-bg-secondary">
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

          {/* Selects de control - solo se muestran cuando hay equipo seleccionado */}
          <div className="flex items-end justify-between gap-6 mt-6 mb-8 font-semibold">
            <div className="flex gap-x-2 items-center">
              <span className="text-text-default text-xl pr-4">
                Soy fan de:
              </span>
              <Select
                placeholder="Selecioná tu equipo"
                options={TEAMS}
                value={selectedTeam?.id}
                handleSelectChange={setSelectedTeam}
                classes="w-80"
              />
            </div>

            <Button
              color="secondary"
              iconPosition="left"
              icon={<MapPinAreaIcon />}
            >
              Explorar sedes
            </Button>
          </div>

          <div className="gap-6 w-full flex justify-center bg-bg-secondary">
            <div className="text-2xl">
              <img src="https://placehold.co/715x640" alt="Placeholder" />
            </div>

            <SidePanel
              selectedTeam={{ id: "ARG", name: "Argentina", flag: "🇦🇷" }}
              setSelectedTeam={setSelectedTeam}
              panelTab={panelTab}
              setPanelTab={setPanelTab}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
            />
          </div>

          <div className="gap-6 w-full flex justify-center bg-bg-secondary">
            <div className="text-2xl">
              <img src="https://placehold.co/715x640" alt="Placeholder" />
            </div>

            <SidePanel
              selectedTeam={{ id: "ARG", name: "Argentina", flag: "🇦🇷" }}
              setSelectedTeam={setSelectedTeam}
              panelTab={panelTab}
              setPanelTab={setPanelTab}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              initialTab="elimination"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
