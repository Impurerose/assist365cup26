import { useEffect, useState } from "react";
import {
  MainPageTemplate,
  VenuesTemplate,
  VenuesSelectionTemplate,
  ModalTemplate,
  AwayMatchesModalTemplate,
} from "./templates";
import ItinerariesTemplate from "./templates/ItinerariesTemplate";

/**
 * App Component
 * Router de templates basado en URL params
 * Desarrollo: localhost:5173/?template=mainpage
 * NO se usa en producción vanilla
 */
function App() {
  const [activeTemplate, setActiveTemplate] = useState("mainpage");

  // Mapeo de templates disponibles
  const templates = {
    mainpage: MainPageTemplate,
    venues: VenuesTemplate,
    venuesSelection: VenuesSelectionTemplate,
    itineraries: ItinerariesTemplate,
    modal: ModalTemplate,
    awayMatches: AwayMatchesModalTemplate,
    // Fácil agregar más:
    // brackets: BracketsTemplate,
    // stats: StatsTemplate,
  };

  // Leer template desde URL al montar
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const template = params.get("template") || "mainpage";

    // Validar que el template existe
    if (templates[template]) {
      MicroModal.init();
    } else {
      console.warn(`Template "${template}" no existe, usando "mainpage"`);
      setActiveTemplate("mainpage");
    }
  }, []);

  // Escuchar cambios en la URL (browser back/forward)
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const template = params.get("template") || "mainpage";
      if (templates[template]) {
        setActiveTemplate(template);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Cambiar template y actualizar URL
  const changeTemplate = (template) => {
    if (!templates[template]) return;

    setActiveTemplate(template);
    const url = new URL(window.location);
    url.searchParams.set("template", template);
    window.history.pushState({}, "", url);
  };

  // Obtener componente del template actual
  const TemplateComponent = templates[activeTemplate] || templates.mainpage;

  return (
    <div className="w-full min-h-screen bg-bg-secondary">
      {/* Dev Toolbar - Template Selector */}
      <div className="fixed top-4 right-4 z-50 bg-white p-4 rounded-xl shadow-lg border-2 border-brand-primary">
        <p className="text-xs text-gray-500 mb-2 font-semibold">
          Template Preview:
        </p>
        <select
          value={activeTemplate}
          onChange={(e) => changeTemplate(e.target.value)}
          className="w-full px-3 py-2 text-sm font-semibold text-text-default bg-white border-2 border-border-primary rounded-lg cursor-pointer hover:border-brand-primary focus:outline-none focus:border-brand-primary transition-all"
        >
          {Object.keys(templates).map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        <p className="text-xs text-gray-400 mt-2 font-mono">
          ?template={activeTemplate}
        </p>
      </div>

      <TemplateComponent />
    </div>
  );
}

export default App;
