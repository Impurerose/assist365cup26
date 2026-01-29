import { CheckFat, X } from "@phosphor-icons/react";

/**
 * ModalSuccess Template
 * Modal de confirmación de éxito
 * Output vanilla: N/A (componente reutilizable)
 */
function ModalSuccessTemplate() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-bg-secondary/50 p-6">
      <div className="bg-white flex flex-col gap-0 items-center px-0 py-10 relative rounded-xl shadow-xl max-w-md w-full">
        {/* Content */}
        <div className="flex flex-col gap-6 items-center px-8 relative w-full">
          {/* Icon */}
          <CheckFat
            size={72}
            weight="duotone"
            className="text-success-primary"
          />

          {/* Text */}
          <div className="flex flex-col gap-3 items-start text-center w-full text-text-default">
            <p className="font-semibold leading-8 text-2xl w-full">
              ¡Listo!
            </p>
            <div className="font-normal leading-6 text-base w-full">
              <p className="mb-0">Te enviamos un email con el link para continuar.</p>
              <p>No te olvides de revisar en spam.</p>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          className="absolute flex items-center justify-center overflow-hidden p-2 right-2 rounded-xl w-9 h-9 top-2 hover:bg-bg-secondary transition-colors"
          onClick={() => {
            // Close modal functionality
            console.log("Close modal");
          }}
        >
          <X size={20} className="text-action-default" />
        </button>
      </div>
    </div>
  );
}

export default ModalSuccessTemplate;
