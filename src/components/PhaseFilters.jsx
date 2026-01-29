import Chip from '../dsys/Chip';

/**
 * PhaseFilters Component
 * Filtros de fase para el template de Itinerarios
 * Grupos | Fase final como 1ros | Fase final como 2dos | Fase final como 3ros?
 */
export default function PhaseFilters({ phases, activePhase, onPhaseChange }) {
  return (
    <div className="flex flex-wrap gap-1.5 lg:gap-4">
      {phases.map((phase, index) => (
        <Chip
          key={index}
          variant="default"
          color="primary"
          size="auto"
          state={activePhase === phase ? 'selected' : 'default'}
          onClick={() => onPhaseChange(phase)}
          classes="cursor-pointer"
        >
          {phase}
        </Chip>
      ))}
    </div>
  );
}
