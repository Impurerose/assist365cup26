export default function Controls({ selectedTeam, setSelectedTeam, viewMode, setViewMode }) {
  return (
    <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <label className="font-semibold text-gray-700">Soy fan de:</label>
        <select
          value={selectedTeam || ''}
          onChange={(e) => setSelectedTeam(e.target.value || null)}
          className="border border-gray-300 rounded-lg px-4 py-2 bg-white cursor-pointer"
        >
          <option value="">Selecciona tu equipo</option>
          <option value="argentina">🇦🇷 Argentina</option>
          <option value="brazil">🇧🇷 Brasil</option>
          <option value="france">🇫🇷 Francia</option>
          <option value="germany">🇩🇪 Alemania</option>
          <option value="mexico">🇲🇽 México</option>
          <option value="usa">🇺🇸 USA</option>
        </select>
      </div>

      <div className="flex items-center gap-4">
        <label className="font-semibold text-gray-700">Ver partidos en:</label>
        <select
          value={viewMode}
          onChange={(e) => setViewMode(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 bg-white cursor-pointer"
        >
          <option value="venue">Sede</option>
          <option value="groups">Grupos</option>
          <option value="knockout">Eliminación</option>
        </select>
      </div>
    </div>
  )
}
