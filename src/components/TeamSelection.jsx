/**
 * TeamSelection Component
 * Vista de selección de equipos con título, grid y selector
 */

import TeamCard from "./TeamCard";
import Select from "../dsys/Select";
import { TEAMS } from "../config/teamsConfig";

const TeamSelection = ({ onTeamSelect }) => {
  return (
    <div className="max-w-[360px] lg:max-w-[316px] w-full mx-auto">
      {/* Texto de selección */}
      <div className="flex flex-col mb-6 mt-6 lg:mt-32 pt-2">
        <h2 className="text-xl lg:text-2xl font-semibold text-text-decorative-darker leading-snug">
          Seleccioná tu equipo y explorá el camino a la final
        </h2>
      </div>

      {/* Grid de equipos */}
      <div className="grid grid-cols-2 gap-4 w-full">
        {TEAMS.map((team) => (
          <TeamCard key={team.id} team={team} onClick={onTeamSelect} />
        ))}
      </div>

      {/* Selector de otros equipos */}
      <div className="mt-6">
        <Select
          placeholder="Otro equipo"
          options={TEAMS}
          handleSelectChange={onTeamSelect}
          classes="w-full"
        />
      </div>
    </div>
  );
};

export default TeamSelection;
