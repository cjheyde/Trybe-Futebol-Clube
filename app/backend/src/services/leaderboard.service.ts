import Leaderboard from '../database/models/LeaderboardModel';
import ILeaderboard from '../interfaces/ILeaderboard';
// import TeamsService from './teams.service';
// import ITeam from '../interfaces/ITeam';
// import Team from '../database/models/TeamModel';

class LeaderboardService {
  constructor(
    // private teamsModel: typeof Team,
    private leaderboardModel: typeof Leaderboard,
  ) { }

  async findAll(): Promise<ILeaderboard[] | null> {
    const result = await this.leaderboardModel.findAll();
    return result as ILeaderboard[];
  }
}

export default LeaderboardService;
