/**
 * TeamSelection Component
 * Vista de selección de equipos con tabs y grid de equipos
 */

import { useState } from 'react';
import Chip from '../dsys/Chip';
import TeamCard from './TeamCard';
import { TEAMS } from '../config/teamsConfig';

const TeamSelection = ({ onTeamSelect }) => {
  const [activeTab, setActiveTab] = useState('groups');

  return (
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

      {/* Grid de equipos */}
      <div className="grid grid-cols-2 gap-3">
        {TEAMS.map((team) => (
          <TeamCard key={team.id} team={team} onClick={onTeamSelect} />
        ))}
      </div>
    </>
  );
};

export default TeamSelection;
