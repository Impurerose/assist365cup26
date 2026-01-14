export default function HeaderBar() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="text-2xl font-bold text-primary">ASSIST 365</div>
        <div className="text-xl font-semibold text-gray-700">🌍 World Cup Map 2026</div>
      </div>
      <button className="bg-secondary text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700">
        📤 Compartir
      </button>
    </header>
  )
}
