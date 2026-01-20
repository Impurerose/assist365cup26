/**
 * MatchListView Component
 * Vista de lista de partidos con tabs de navegación
 */

import { useState } from "react";
import { Trophy } from "@phosphor-icons/react";
import Chip from "../dsys/Chip";
import Button from "../dsys/Button";
import MatchCard from "./MatchCard";

const MatchListView = ({
  selectedTeam,
  matches = [],
  initialTab = "groups",
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  // Filtrar partidos según el tab activo
  const filteredMatches = matches.filter((match) => {
    if (activeTab === "groups") {
      return match.stage === "groups";
    } else if (activeTab === "elimination") {
      return match.stage === "elimination";
    }
    return true;
  });

  return (
    <>
      {/* Chips de navegación */}
      <div className="flex gap-2 mb-6">
        <Chip
          state={activeTab === "groups" ? "selected" : "default"}
          onClick={() => setActiveTab("groups")}
        >
          Grupos
        </Chip>
        <Chip
          state={activeTab === "elimination" ? "selected" : "default"}
          onClick={() => setActiveTab("elimination")}
        >
          Eliminación
        </Chip>
      </div>

      {/* Cards de partidos */}
      <div className="flex flex-col gap-3 overflow-y-auto">
        {filteredMatches.length > 0 ? (
          filteredMatches.map((match) => (
            <MatchCard key={match.number} match={match} />
          ))
        ) : (
          <></>
        )}

        {/* Modal de camino a la final - solo en eliminación */}
        {activeTab === "elimination" && (
          <div className="bg-white border border-border-primary rounded-xl p-8 flex flex-col gap-6 items-center mt-3">
            {/* Ícono */}
            <div className="bg-brand-comp-lilac rounded-full w-[50px] h-[50px] flex items-center justify-center">
              <Trophy
                size={32}
                weight="duotone"
                className="text-bg-alt-primary"
              />
            </div>

            {/* Contenido */}
            <div className="flex flex-col gap-4 w-full">
              <p className="text-xl font-semibold text-text-default text-center leading-7">
                Mirá cómo sería el camino a la final
              </p>
              <p className="text-base text-text-default text-center leading-6">
                Si en la fase de grupos quedamos:
              </p>

              {/* Botones */}
              <div className="flex items-center justify-between w-full gap-2">
                <Button variant="alt">Primeros</Button>
                <Button variant="alt">Segundos</Button>
                <Button variant="alt">Terceros</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MatchListView;
