/**
 * MatchesContainer Component
 * Contenedor lógico que maneja tabs y selección de vista
 */

import { useState } from 'react';
import TabNavigation from './TabNavigation';
import GroupsView from './GroupsView';
import EliminationView from './EliminationView';

const TABS = [
  { id: 'groups', label: 'Grupos' },
  { id: 'elimination', label: 'Eliminación' },
];

const MatchesContainer = ({ matches = [], initialTab = 'groups' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  // Filtrar partidos según etapa
  const groupMatches = matches.filter(m => m.stage === 'groups');
  const eliminationMatches = matches.filter(m => m.stage === 'elimination');

  return (
    <>
      <TabNavigation 
        tabs={TABS} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />

      {activeTab === 'groups' ? (
        <GroupsView matches={groupMatches} />
      ) : (
        <EliminationView matches={eliminationMatches} />
      )}
    </>
  );
};

export default MatchesContainer;
