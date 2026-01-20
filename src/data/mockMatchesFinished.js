/**
 * Mock data: Partidos finalizados
 * Partidos completados con resultados
 */

export const mockMatchesFinished = [
  {
    id: 1,
    number: 1,
    team1: { name: "Argentina", flag: "🇦🇷", score: 5 },
    team2: { name: "Argelia", flag: "🇩🇿", score: 1 },
    city: "Kansas city",
    date: "Martes 16 de junio",
    time: {
      local: "21:00 h (AR)",
      venue: "18:00 h (KCK)"
    },
    stage: "groups",
    group: "A",
    finished: true
  },
  {
    id: 2,
    number: 2,
    team1: { name: "Argentina", flag: "🇦🇷", score: 6 },
    team2: { name: "Austria", flag: "🇦🇹", score: 2 },
    city: "Dallas",
    date: "Lunes 22 de junio",
    time: {
      local: "13:00 h (AR)",
      venue: "10:00 h (DL)"
    },
    stage: "groups",
    group: "A",
    finished: true
  },
  {
    id: 3,
    number: 3,
    team1: { name: "Jordania", flag: "🇯🇴", score: 3 },
    team2: { name: "Argentina", flag: "🇦🇷", score: 7 },
    city: "Dallas",
    date: "Sábado 27 de junio",
    time: {
      local: "22:00 h (AR)",
      venue: "19:00 h (DL)"
    },
    stage: "groups",
    group: "A",
    finished: true
  }
];
