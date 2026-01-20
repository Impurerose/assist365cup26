/**
 * TeamCard Component
 * Card component para mostrar equipos/países
 */

const TeamCard = ({ team, onClick }) => (
  <button
    onClick={() => onClick(team)}
    className="bg-white rounded-xl px-4 py-3 flex items-center gap-3 w-full lg:w-[150px] hover:shadow-md transition-shadow"
  >
    <span className="text-[32px] leading-none">{team.flag}</span>
    <span className="font-semibold text-[#31363A] text-base">{team.name}</span>
  </button>
);

export default TeamCard;
