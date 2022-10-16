import IMatchScores from './IMatchScores';

interface IMatch extends IMatchScores {
  id?: number,
  homeTeam: number,
  awayTeam: number,
  inProgress?: boolean,
}

export default IMatch;
