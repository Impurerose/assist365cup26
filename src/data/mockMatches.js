/**
 * Mock data para partidos del Mundial 2026
 * Datos de ejemplo para desarrollo
 */

export const mockMatches = [
  {
    number: 1,
    stage: 'groups',
    team1: { name: 'Jordania', flag: '🇯🇴' },
    team2: { name: 'Argentina', flag: '🇦🇷' },
    date: 'Sábado 27 de junio',
    city: 'Dallas',
    time: {
      local: '22:00 h (AR)',
      venue: '19:00 h (DL)'
    }
  },
  {
    number: 2,
    stage: 'groups',
    team1: { name: 'Argentina', flag: '🇦🇷' },
    team2: { name: 'Austria', flag: '🇦🇹' },
    date: 'Lunes 22 de junio',
    city: 'Dallas',
    time: {
      local: '13:00 h (AR)',
      venue: '10:00 h (DL)'
    }
  },
  {
    number: 3,
    stage: 'groups',
    team1: { name: 'Argentina', flag: '🇦🇷' },
    team2: { name: 'A definir', flag: null },
    date: 'Martes 16 de junio',
    city: 'Kansas city',
    time: {
      local: '21:00 h (AR)',
      venue: '18:00 h (KCK)'
    }
  },
  {
    number: 4,
    stage: 'elimination',
    position: '1st',
    phase: '16avos',
    team1: { name: 'Argentina', flag: '🇦🇷' },
    team2: { name: 'A definir', flag: null },
    date: 'Viernes 3 de julio',
    city: 'Miami',
    time: {
      local: '18:00 h (AR)',
      venue: '16:00 h (MIA)'
    }
  },
  {
    number: 5,
    stage: 'elimination',
    position: '1st',
    phase: 'Octavos',
    team1: { name: 'Argentina', flag: '🇦🇷' },
    team2: { name: 'A definir', flag: null },
    date: 'Martes 7 de julio',
    city: 'Atlanta',
    time: {
      local: '12:00 h (AR)',
      venue: '10:00 h (ATL)'
    }
  },
  {
    number: 6,
    stage: 'elimination',
    position: '1st',
    phase: 'Cuartos',
    team1: { name: 'Argentina', flag: '🇦🇷' },
    team2: { name: 'A definir', flag: null },
    date: 'Sábado 11 de julio',
    city: 'Kansas city',
    time: {
      local: '21:00 h (AR)',
      venue: '19:00 h (KSK)'
    }
  },
  {
    number: 7,
    stage: 'elimination',
    position: '1st',
    phase: 'Semi',
    team1: { name: 'A definir', flag: null },
    team2: { name: 'Argentina', flag: '🇦🇷' },
    date: 'Miércoles 15 de julio',
    city: 'Atlanta',
    time: {
      local: '21:00 h (AR)',
      venue: '19:00 h (ATL)'
    }
  },
];
