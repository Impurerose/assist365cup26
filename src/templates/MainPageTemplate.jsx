import { useState } from "react";
import HeaderBar from "../components/HeaderBar";
import MapContainer from "../components/MapContainer";
import SidePanel from "../components/SidePanel";
import TeamSelection from "../components/TeamSelection";
import MatchesContainer from "../components/MatchesContainer";
import FinalPathBanner from "../components/FinalPathBanner";
import PendingDefinitionBanner from "../components/PendingDefinitionBanner";
import Select from "../dsys/Select";
import Button from "../dsys/Button";
import { TEAMS } from "../config/teamsConfig";
import { VENUES } from "../config/mapConfig";
import { MapPinAreaIcon } from "@phosphor-icons/react";
import { mockMatches } from "../data/mockMatches";
import { mockMatchesWithoutPending } from "../data/mockMatchesWithoutPending";
import { mockMatchesFinished } from "../data/mockMatchesFinished";

/**
 * MainPage Template
 * Template principal con selección de equipo y visualización de partidos
 * Output vanilla: mainpage.html
 */
function MainPageTemplate() {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [viewMode, setViewMode] = useState("venue");
  const [selectedCity, setSelectedCity] = useState(null);
  const [panelTab, setPanelTab] = useState("groups");

  return (
    <div className="w-full min-h-screen flex flex-col bg-bg-secondary pb-32">
      <HeaderBar />
      <div
        className={`w-full mt-12 max-w-[1366px] mx-auto flex flex-col gap-y-6${
          !selectedTeam ? "mt-12" : ""
        }`}
      >
        <div className="w-full max-w-[834px] lg:max-w-[1200px] mx-auto flex flex-col gap-y-8">
          <div className="gap-6 w-full flex lg:flex-row flex-col justify-center bg-bg-secondary">
            <MapContainer
              selectedTeam={selectedTeam}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
            />

            <SidePanel showBackground={!selectedTeam}>
              {selectedTeam ? (
                <MatchesContainer matches={mockMatches} />
              ) : (
                <TeamSelection onTeamSelect={setSelectedTeam} />
              )}
            </SidePanel>
          </div>

          {/* Selects de control - solo se muestran cuando hay equipo seleccionado */}
          <div className="w-full flex items-end justify-center lg:justify-between gap-4 lg:gap-6 lg:mt-6 lg:mb-8 font-semibold mx-auto">
            <div className="flex gap-x-2 items-center">
              <span className="text-text-default text-xl pr-4 hidden lg:block">
                Soy fan de:
              </span>
              <Select
                placeholder="Selecioná tu equipo"
                options={TEAMS}
                value={selectedTeam?.id}
                handleSelectChange={setSelectedTeam}
                classes="w-[200px] lg:w-80"
              />
            </div>

            <div className="flex gap-x-2 items-center lg:hidden">
              <span className="text-text-default text-xl pr-4 hidden lg:block">
                Sede:
              </span>
              <Select
                placeholder="Seleccioná sede"
                options={VENUES}
                value={selectedCity?.id}
                handleSelectChange={setSelectedCity}
                classes="w-[200px] lg:w-80"
              />
            </div>

            <Button
              classes="hidden lg:flex"
              color="secondary"
              iconPosition="left"
              icon={<MapPinAreaIcon />}
              onClick={() => {
                // En desarrollo React: cambiar template
                // En vanilla: navegar a venues.html
                if (typeof window !== 'undefined') {
                  const isVanilla = !document.getElementById('root');
                  if (isVanilla) {
                    window.location.href = 'venues.html';
                  }
                }
              }}
            >
              Explorar sedes
            </Button>
          </div>

          <div className="gap-6 w-full flex-col items-center lg:flex-row lg:items-start flex justify-center bg-bg-secondary">
            <div className="text-2xl">
              <img src="https://placehold.co/715x640" alt="Placeholder" />
            </div>

            <SidePanel>
              <MatchesContainer matches={mockMatches} />
            </SidePanel>
          </div>

          <div className="gap-6 w-full flex-col items-center lg:flex-row lg:items-start flex justify-center bg-bg-secondary">
            <div className="text-2xl">
              <img src="https://placehold.co/715x640" alt="Placeholder" />
            </div>

            <SidePanel>
              <FinalPathBanner />
            </SidePanel>
          </div>

          <div className="gap-6 w-full flex-col items-center lg:flex-row lg:items-start flex justify-center bg-bg-secondary">
            <div className="text-2xl">
              <img src="https://placehold.co/715x640" alt="Placeholder" />
            </div>

            <SidePanel>
              <MatchesContainer
                matches={mockMatchesWithoutPending}
                initialTab="elimination"
              />
            </SidePanel>
          </div>

          <div className="gap-6 w-full flex-col items-center lg:flex-row lg:items-start flex justify-center bg-bg-secondary">
            <div className="text-2xl">
              <img src="https://placehold.co/715x640" alt="Placeholder" />
            </div>

            <SidePanel>
              <PendingDefinitionBanner />
            </SidePanel>
          </div>

          <div className="gap-6 w-full flex-col items-center lg:flex-row lg:items-start flex justify-center bg-bg-secondary">
            <div className="text-2xl">
              <img src="https://placehold.co/715x640" alt="Placeholder" />
            </div>

            <SidePanel>
              <MatchesContainer matches={mockMatchesFinished} />
            </SidePanel>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPageTemplate;
