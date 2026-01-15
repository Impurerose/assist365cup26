/**
 * TeamCard Component
 * Card component para mostrar equipos/países
 */

const TeamCard = ({ team, onClick }) => (
  <button
    onClick={() => onClick(team)}
    className="bg-white rounded-lg p-4 flex items-center gap-3 hover:shadow-md transition-shadow"
  >
    <span className="text-3xl">{team.flag}</span>
    <span className="font-semibold text-gray-800">{team.name}</span>
  </button>
);

export default TeamCard;
