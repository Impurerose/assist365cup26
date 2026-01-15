import { useState } from 'react';
import Chip from '../dsys/Chip';
import TeamCard from './TeamCard';
import { TEAMS } from '../config/teamsConfig';

const SidePanel = ({
  selectedTeam,
  setSelectedTeam,
  selectedCity,
  setSelectedCity,
}) => {
  const [activeTab, setActiveTab] = useState('groups');

  return (
    <div className={`rounded-l-xl flex flex-col p-6 w-[467px] h-[640px] bg-[rgba(81,90,96,0.06)] ${!selectedTeam ? 'bg-[url(https://assistcdn.s3.us-west-1.amazonaws.com/assets/wc2026/BallWidthDots.svg)] bg-no-repeat bg-top bg-contain' : ''}`}>
      {selectedTeam ? (
        <>
          {/* Chips de navegación */}
          <div className="flex gap-2 mb-6">
            <Chip
              state={activeTab === 'groups' ? 'selected' : 'default'}
              onClick={() => setActiveTab('groups')}
            >
              Grupos
            </Chip>
            <Chip
              state={activeTab === 'elimination' ? 'selected' : 'default'}
              onClick={() => setActiveTab('elimination')}
            >
              Eliminación
            </Chip>
          </div>

          {/* Cards de partidos */}
          <div className="flex flex-col gap-3">
            {/* Aquí irán los cards de partidos */}
          </div>
        </>
      ) : (
        <>
          {/* Texto de selección */}
          <div className="flex flex-col items-start mb-6 mt-32">
            <h2 className="text-lg font-semibold text-[#0059BA] leading-snug">
              Seleccioná tu equipo para explorar tu camino a la gran final 2026
            </h2>
          </div>

          {/* Grid de equipos */}
          <div className="grid grid-cols-2 gap-3">
            {TEAMS.map((team) => (
              <TeamCard key={team.id} team={team} onClick={setSelectedTeam} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SidePanel;
