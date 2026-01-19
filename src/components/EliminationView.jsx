/**
 * EliminationView Component
 * Vista de partidos de eliminación con selector de posición
 */

import { useState } from 'react';
import Select from '../dsys/Select';
import MatchCard from './MatchCard';

const POSITION_OPTIONS = [
  { id: '1st', name: 'Primer puesto' },
  { id: '2nd', name: 'Segundo puesto' },
  { id: '3rd', name: 'Tercer puesto' },
  { id: '4th', name: 'Cuarto puesto' },
];

const EliminationView = ({ matches = [] }) => {
  const [selectedPosition, setSelectedPosition] = useState('1st');

  // Filtrar partidos según posición seleccionada
  const filteredMatches = matches.filter(match => 
    match.position === selectedPosition || !match.position
  );

  return (
    <>
      {/* Selector de posición */}
      <div className="mb-4">
        <Select
          placeholder="Primer puesto"
          options={POSITION_OPTIONS}
          value={selectedPosition}
          handleSelectChange={(option) => setSelectedPosition(option.id)}
          classes="w-full"
        />
      </div>

      {/* Cards de partidos */}
      <div className="flex flex-col gap-3 overflow-y-auto pt-3">
        {filteredMatches.length > 0 ? (
          filteredMatches.map((match) => (
            <MatchCard key={match.number} match={match} />
          ))
        ) : (
          <p className="text-gray-500 text-center mt-8">
            No hay partidos disponibles para esta posición
          </p>
        )}
      </div>
    </>
  );
};

export default EliminationView;
