import { useEffect } from 'react';
import MicroModal from 'micromodal';
import Button from '../dsys/Button';
import TextField from '../dsys/TextField';
import { ShareFat } from '@phosphor-icons/react';

/**
 * ModalTemplate Component
 * Template de demostración del modal con MicroModal
 */
export default function ModalTemplate() {
  useEffect(() => {
    MicroModal.init({
      disableScroll: true,
      awaitCloseAnimation: true,
    });
  }, []);

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-bg-secondary">
      {/* Botón para abrir modal */}
      <Button
        onClick={() => MicroModal.show('modal-1')}
        size="large"
        color="primary"
      >
        Abrir modal
      </Button>

      {/* Modal */}
      <div className="modal micromodal-slide" id="modal-1" aria-hidden="true">
        <div className="modal__overlay" tabIndex="-1" data-micromodal-close>
          <div
            className="modal__container shadow-xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-1-title"
          >
            <main className="modal__content" id="modal-1-content">
              <img
                src="https://assistcdn.s3.us-west-1.amazonaws.com/assets/wc2026/SoccerPlaneIcon.svg"
                alt="Soccer Plane Icon"
                className="mb-6 mx-auto"
              />

              <p className="text-2xl text-text-default text-center">
                Explorá la guía mundialista completa y{" "}
                <span className="font-semibold">
                  participá por un pasaje para ver a tu selección.
                </span>
              </p>

              <div className="form__container space-y-4 mx-auto max-w-[330px] pt-6 w-full">
                <TextField fullWidth placeholder="Nombre completo" />
                <TextField
                  fullWidth
                  placeholder="Ingresá tu correo electrónico"
                />
              </div>
            </main>
            <footer className="modal__footer w-full flex items-center justify-center">
              <div className="w-full max-w-[330px] mt-4">
                <Button
                  fullWidth
                  classes="w-full"
                  variant="alt"
                  iconPosition="right"
                  icon={
                    <ShareFat
                      size={16}
                      className="text-text-alt-onbutton"
                      weight="fill"
                    />
                  }
                >
                  Quiero participar
                </Button>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
