/**
 * MatchCard Component
 * Card de partido según diseño de Figma
 */

const MatchCard = ({ match }) => {
  return (
    <div className="bg-white border border-[#C2DFFF] rounded-xl px-3 py-4 flex flex-col gap-4 relative">
      {/* Número de partido (badge azul) */}
      <div className="absolute right-[7px] top-[7px] w-5 h-5">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="10" fill="#006FE8"/>
          <text
            x="10"
            y="10"
            textAnchor="middle"
            dominantBaseline="central"
            fill="white"
            className="text-xs font-semibold"
            style={{ fontFamily: 'Titillium Web, sans-serif' }}
          >
            {match.number}
          </text>
        </svg>
      </div>

      {/* Equipos */}
      <div className="flex items-center gap-2">
        <span className="text-xl">{match.team1.flag}</span>
        <p className="text-base font-semibold text-[#31363A]" style={{ fontFamily: 'Titillium Web, sans-serif' }}>
          {match.team1.name}
        </p>
        <p className="text-base font-semibold text-[#31363A]" style={{ fontFamily: 'Titillium Web, sans-serif' }}>
          -
        </p>
        <p className="text-base font-semibold text-[#31363A]" style={{ fontFamily: 'Titillium Web, sans-serif' }}>
          {match.team2.name}
        </p>
        <span className="text-xl">{match.team2.flag}</span>
      </div>

      {/* Información del partido */}
      <div className="flex flex-col gap-2">
        {/* Fecha y ubicación */}
        <div className="flex items-start gap-4">
          {/* Fecha */}
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="3.125" y="3.125" width="13.75" height="13.75" rx="1.25" fill="#7BD0C2" opacity="0.2"/>
              <path d="M15.625 6.25H4.375C3.68464 6.25 3.125 6.80964 3.125 7.5V15.625C3.125 16.3154 3.68464 16.875 4.375 16.875H15.625C16.3154 16.875 16.875 16.3154 16.875 15.625V7.5C16.875 6.80964 16.3154 6.25 15.625 6.25Z" stroke="#7BD0C2" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13.125 3.75V6.25" stroke="#7BD0C2" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6.875 3.75V6.25" stroke="#7BD0C2" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p className="text-base text-[#31363A]" style={{ fontFamily: 'Titillium Web, sans-serif' }}>
              {match.date}
            </p>
          </div>

          {/* Ubicación */}
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="8.125" r="2.5" fill="#7BD0C2" opacity="0.2"/>
              <path d="M10 17.5C10 17.5 15.625 13.125 15.625 8.125C15.625 5.01675 13.1083 2.5 10 2.5C6.89175 2.5 4.375 5.01675 4.375 8.125C4.375 13.125 10 17.5 10 17.5Z" stroke="#7BD0C2" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="10" cy="8.125" r="2.5" stroke="#7BD0C2" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p className="text-base text-[#31363A]" style={{ fontFamily: 'Titillium Web, sans-serif' }}>
              {match.city}
            </p>
          </div>
        </div>

        {/* Horarios */}
        <div className="flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="6.25" fill="#7BD0C2" opacity="0.2"/>
            <circle cx="10" cy="10" r="7.5" stroke="#7BD0C2" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 6.25V10L12.5 12.5" stroke="#7BD0C2" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p className="text-base text-[#31363A]" style={{ fontFamily: 'Titillium Web, sans-serif' }}>
            {match.time.local}
          </p>
          <p className="text-base text-[#31363A]" style={{ fontFamily: 'Titillium Web, sans-serif' }}>
            -
          </p>
          <p className="text-base text-[#31363A]" style={{ fontFamily: 'Titillium Web, sans-serif' }}>
            {match.time.venue}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
