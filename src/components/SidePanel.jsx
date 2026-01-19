/**
 * SidePanel Component
 * Contenedor principal del panel lateral que maneja diferentes vistas
 */

import TeamSelection from './TeamSelection';
import MatchListView from './MatchListView';

const SidePanel = ({
  selectedTeam,
  setSelectedTeam,
  selectedCity,
  setSelectedCity,
  initialTab = 'groups',
}) => {
  // Mock data para partidos - luego será reemplazado por datos reales
  const mockMatches = [
    {
      number: 1,
      stage: 'groups',
      team1: { name: 'Argentina', flag: '🇦🇷' },
      team2: { name: 'Algeria', flag: '🇩🇿' },
      date: 'Martes 16 de junio',
      city: 'Kansas city',
      time: {
        local: '21:00 h (AR)',
        venue: '18:00 h (KCK)'
      }
    },
    {
      number: 2,
      stage: 'groups',
      team1: { name: 'Argentina', flag: '🇦🇷' },
      team2: { name: 'Austria', flag: '🇦🇹' },
      date: 'Lunes 22 de junio',
      city: 'Dallas',
      time: {
        local: '13:00 h (AR)',
        venue: '10:00 h (DL)'
      }
    },
    {
      number: 3,
      stage: 'groups',
      team1: { name: 'Jordania', flag: '🇯🇴' },
      team2: { name: 'Argentina', flag: '🇦🇷' },
      date: 'Sábado 27 de junio',
      city: 'Dallas',
      time: {
        local: '22:00 h (AR)',
        venue: '19:00 h (DL)'
      }
    }
  ];

  return (
    <div className={`rounded-l-xl flex flex-col p-6 w-[467px] h-[640px] bg-[rgba(81,90,96,0.06)] ${!selectedTeam ? 'bg-[url(https://assistcdn.s3.us-west-1.amazonaws.com/assets/wc2026/BallWidthDots.svg)] bg-no-repeat bg-top bg-contain' : ''}`}>
      {selectedTeam ? (
        <MatchListView 
          selectedTeam={selectedTeam} 
          matches={mockMatches}
          initialTab={initialTab}
        />
      ) : (
        <TeamSelection onTeamSelect={setSelectedTeam} />
      )}
    </div>
  );
};

export default SidePanel;
