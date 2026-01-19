/**
 * TeamSelection Component
 * Vista de selección de equipos con título, grid y selector
 */

import TeamCard from './TeamCard';
import Select from '../dsys/Select';
import { TEAMS } from '../config/teamsConfig';

const TeamSelection = ({ onTeamSelect }) => {
  return (
    <>
      {/* Texto de selección */}
      <div className="flex flex-col items-start mb-6 mt-32 max-w-[350px]">
        <h2 className="text-2xl font-semibold text-[#0059BA] leading-snug">
          Seleccioná tu equipo y explorá el camino a la final
        </h2>
      </div>

      {/* Grid de equipos */}
      <div className="grid grid-cols-2 gap-4 max-w-[316px]">
        {TEAMS.map((team) => (
          <TeamCard key={team.id} team={team} onClick={onTeamSelect} />
        ))}
      </div>

      {/* Selector de otros equipos */}
      <div className="mt-6 max-w-[316px]">
        <Select
          placeholder="Otro equipo"
          options={TEAMS}
          handleSelectChange={onTeamSelect}
          classes="w-full"
        />
      </div>
    </>
  );
};

export default TeamSelection;
