import IMatchScores from './IMatchScores';

interface IMatch extends IMatchScores {
  id?: number,
  homeTeam: number,
  // homeTeamGoals: number,
  awayTeam: number,
  // awayTeamGoals: number,
  inProgress?: boolean,
}

export default IMatch;
