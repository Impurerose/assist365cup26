import { SoccerBall } from '@phosphor-icons/react'

const teams = [
  { name: 'Argentina', flag: '🇦🇷', code: 'ARG' },
  { name: 'Brasil', flag: '🇧🇷', code: 'BRA' },
  { name: 'Colombia', flag: '🇨🇴', code: 'COL' },
  { name: 'México', flag: '🇲🇽', code: 'MEX' },
  { name: 'Paraguay', flag: '🇵🇾', code: 'PAR' },
  { name: 'Uruguay', flag: '🇺🇾', code: 'URU' },
  { name: 'Ecuador', flag: '🇪🇨', code: 'ECU' },
]


// https://assistcdn.s3.us-west-1.amazonaws.com/assets/wc2026/BallWidthDots.svg

export default function SidePanel({ panelTab, setPanelTab, selectedCity }) {
  return (
    <div className="rounded-l-xl overflow-hidden flex flex-col p-6" style={{ width: '467px', height: '640px', backgroundColor: 'rgba(81, 90, 96, 0.06)' }}>
      <div className="flex flex-col items-center text-center mb-8">
        <div className="mb-4">
          <SoccerBall size={64} weight="duotone" className="text-[#00A7E1]" />
        </div>
        <h2 className="text-xl font-semibold text-[#0059BA] leading-snug text-left">
          Seleccioná tu equipo para explorar tu camino a la gran final 2026
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {teams.map((team) => (
          <button
            key={team.code}
            className="bg-white rounded-lg p-4 flex items-center gap-3 hover:shadow-md transition-shadow"
          >
            <span className="text-3xl">{team.flag}</span>
            <span className="font-semibold text-[#31363A]">{team.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
