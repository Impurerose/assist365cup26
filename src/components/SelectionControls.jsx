/**
 * SelectionControls Component
 * Controles de selección (equipo y sede) cuando hay un equipo seleccionado
 */

import Select from '../dsys/Select';
import { TEAMS } from '../config/teamsConfig';
import { VENUES } from '../config/mapConfig';

const SelectionControls = ({
  selectedTeam,
  setSelectedTeam,
  selectedCity,
  setSelectedCity,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <Select
        label="Soy fan de:"
        placeholder="Seleccioná tu equipo"
        options={TEAMS}
        value={selectedTeam?.id}
        handleSelectChange={setSelectedTeam}
      />

      <Select
        label="Ver partidos en:"
        placeholder="Seleccioná sede"
        options={VENUES}
        value={selectedCity?.id}
        handleSelectChange={setSelectedCity}
      />
    </div>
  );
};

export default SelectionControls;
