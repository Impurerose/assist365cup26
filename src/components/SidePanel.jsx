export default function SidePanel({ panelTab, setPanelTab, selectedCity }) {
  return (
    <div className="rounded-xl overflow-hidden flex flex-col" style={{ width: '467px', height: '640px', backgroundColor: 'rgba(81, 90, 96, 0.06)' }}>
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setPanelTab('groups')}
          className={`flex-1 py-3 font-semibold text-center ${
            panelTab === 'groups'
              ? 'bg-white text-secondary border-b-2 border-secondary'
              : 'bg-transparent text-gray-600'
          }`}
        >
          Grupos
        </button>
        <button
          onClick={() => setPanelTab('elimination')}
          className={`flex-1 py-3 font-semibold text-center ${
            panelTab === 'elimination'
              ? 'bg-white text-secondary border-b-2 border-secondary'
              : 'bg-transparent text-gray-600'
          }`}
        >
          Eliminación
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {selectedCity ? (
          <div>
            <h3 className="text-2xl font-bold text-primary mb-2">{selectedCity.name}</h3>
            <p className="text-muted mb-4">{selectedCity.country}</p>
            
            {panelTab === 'groups' && (
              <div className="space-y-4">
                <h4 className="font-semibold text-text">Partidos - Fase de Grupos</h4>
                <div className="text-sm text-muted">
                  <p>Los partidos de grupos en {selectedCity.name} se mostrarán aquí</p>
                </div>
              </div>
            )}

            {panelTab === 'elimination' && (
              <div className="space-y-4">
                <h4 className="font-semibold text-text">Partidos - Eliminación</h4>
                <div className="text-sm text-muted">
                  <p>Los partidos de eliminación en {selectedCity.name} se mostrarán aquí</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center text-muted">
            <p>Selecciona una ciudad en el mapa para ver los partidos</p>
          </div>
        )}
      </div>
    </div>
  )
}
