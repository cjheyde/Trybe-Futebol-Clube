import Match from '../database/models/MatchModel';
import Team from '../database/models/TeamModel';
import BoardCalculation from './utils/boardCalculation';

class LeaderboardService {
  private calc = new BoardCalculation();
  constructor(
    private teamsModel: typeof Team,
    private matchesModel: typeof Match,
  ) { }

  async getLeaderboard(param: string) {
    const allTeams = await this.teamsModel.findAll();
    const allFinishedMatches = await this.matchesModel.findAll({ where: { inProgress: false } });
    const boardData = this.calc.getBoard(param, allTeams, allFinishedMatches);
    return boardData;
  }
}

export default LeaderboardService;
