import { useEffect } from "react";
import {
  XIcon,
  SoccerBall,
  AirplaneTilt,
  PaperPlaneTilt,
} from "@phosphor-icons/react";
import Button from "../dsys/Button";

/**
 * Sidebar Component
 * Panel deslizante desde la derecha con overlay
 */
export default function Sidebar({ isOpen, onClose }) {
  // Prevenir scroll del body cuando el sidebar está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handler de navegación
  const handleNavigation = (href) => {
    window.location.href = href;
    onClose();
  };

  // Opciones del menú
  const menuOptions = [
    {
      label: "Explorar partidos",
      icon: SoccerBall,
      href: "/mainpage.html",
    },
    {
      label: "Explorar itinerarios",
      icon: AirplaneTilt,
      href: "/itineraries.html",
    },
  ];

  return (
    <>
      {/* Backdrop/Overlay - Click para cerrar */}
      <div
        className={`fixed inset-0 bg-black/50 z-[9998] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel Sidebar - Slide desde derecha */}
      <div
        className={`fixed top-0 right-0 h-full w-[358px] sm:w-[400px] bg-white z-[9999] shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu lateral"
      >
        {/* Header - Solo botón X alineado a la derecha */}
        <div className="flex items-center justify-end p-4">
          <button
            onClick={onClose}
            className="p-2 hover:bg-bg-secondary rounded-lg transition-colors"
            aria-label="Cerrar menú"
          >
            <XIcon size={24} weight="bold" className="text-action-default" />
          </button>
        </div>

        {/* Body - Contenido del menú */}
        <div className="px-4 flex flex-col gap-8">
          {/* Lista de opciones de navegación */}
          <ul className="flex flex-col">
            {menuOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <li key={index}>
                  <Button
                    variant="default"
                    icon={<IconComponent size={16} weight="duotone" />}
                    iconPosition="left"
                    color="tertiary"
                    align="left"
                    padding={false}
                    onClick={() => handleNavigation(option.href)}
                  >
                    <span>{option.label}</span>
                  </Button>
                </li>
              );
            })}
          </ul>

          {/* Botón Compartir */}
          <Button
            icon={<PaperPlaneTilt size={16} weight="bold" />}
            iconPosition="right"
            classes="w-fit"
          >
            Compartir
          </Button>
        </div>
      </div>
    </>
  );
}
