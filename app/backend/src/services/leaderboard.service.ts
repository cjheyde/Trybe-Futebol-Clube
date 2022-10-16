import MatchesService from './matches.service';
import TeamsService from './teams.service';
import BoardCalculation from './utils/boardCalculation';

class LeaderboardService {
  private calc = new BoardCalculation();
  constructor(
    private teamsService: TeamsService,
    private matchesService: MatchesService,
  ) { }

  async getLeaderboard(param: string) {
    const allTeams = await this.teamsService.findAll();
    const allFinishedMatches = await this.matchesService.findAllFinished();
    const boardData = this.calc.getBoard(param, allTeams, allFinishedMatches);
    return boardData;
  }
}

export default LeaderboardService;
