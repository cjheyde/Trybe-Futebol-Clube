interface ILeaderboard {
  // nome do time
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories?: number,
  // total de empates
  totalDraws?: number,
  totalLosses?: number,
  goalsFavor?: number,
  // gols sofridos
  goalsOwn?: number,
  // saldo de gols
  goalsBalance: number,
  // aproveitamento do time
  efficiency: number,
}

export default ILeaderboard;
