import { useEffect, useState } from 'react';
import MicroModal from 'micromodal';
import Button from '../dsys/Button';
import Select from '../dsys/Select';
import { TEAMS } from '../config/teamsConfig';

/**
 * TeamCard Component
 * Card for team selection - matching project pattern
 */
function TeamCard({ team, onSelect }) {
  return (
    <button
      onClick={() => onSelect(team)}
      className="bg-white border border-border-secondary flex gap-4 items-center p-4 rounded-xl hover:border-brand-primary hover:shadow-md transition-all cursor-pointer w-full"
    >
      <span className="w-[40px]">{team.flag}</span>
      <div className="flex flex-col items-start">
        <p className="font-semibold text-base leading-6 text-text-default">
          {team.name}
        </p>
      </div>
    </button>
  );
}

/**
 * AwayMatchesModalTemplate Component
 * Modal template for away team selection
 */
export default function AwayMatchesModalTemplate() {
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    MicroModal.init({
      disableScroll: true,
      awaitCloseAnimation: true,
    });
  }, []);

  const handleTeamSelect = (team) => {
    setSelectedTeam(team);
    console.log('Selected team:', team);
    // Here you would typically handle the selection logic
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-bg-secondary">
      {/* Button to open modal */}
      <Button
        onClick={() => MicroModal.show('away-matches-modal')}
        size="large"
        color="primary"
      >
        Seleccionar equipo visitante
      </Button>

      {/* Modal */}
      <div
        className="modal micromodal-slide"
        id="away-matches-modal"
        aria-hidden="true"
      >
        <div className="modal__overlay" tabIndex="-1" data-micromodal-close>
          <div
            className="modal__container !bg-bg-secondary shadow-xl w-full !max-w-[562px]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="away-matches-modal-title"
          >
            <main className="modal__content bg-bg-secondary !mt-0" id="away-matches-modal-content">
              {/* Title */}
              <p
                id="away-matches-modal-title"
                className="text-2xl font-semibold leading-8 text-text-decorative-darker text-center mb-6"
              >
                Seleccioná tu equipo para continuar
              </p>

              {/* Teams Grid */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                {TEAMS.map((team) => (
                  <TeamCard
                    key={team.id}
                    team={team}
                    onSelect={handleTeamSelect}
                  />
                ))}
              </div>

              {/* Other Team Select */}
              <div className="w-full">
                <Select
                  placeholder="Otro equipo"
                  options={TEAMS}
                  handleSelectChange={handleTeamSelect}
                  classes="w-full"
                />
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
