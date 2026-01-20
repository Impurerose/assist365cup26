/**
 * GroupsView Component
 * Vista de partidos de fase de grupos
 */

import MatchCard from "./MatchCard";

const GroupsView = ({ matches = [] }) => {
  return (
    <div className="flex flex-col gap-3 overflow-y-auto pt-3">
      {matches.length > 0 ? (
        matches.map((match) => <MatchCard key={match.number} match={match} />)
      ) : (
        <p className="text-gray-500 text-center mt-8">
          No hay partidos disponibles para esta etapa
        </p>
      )}
    </div>
  );
};

export default GroupsView;
