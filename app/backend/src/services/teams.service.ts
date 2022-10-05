import Team from '../database/models/TeamModel';
import ITeam from '../interfaces/ITeam';
// import ITeamModel from '../interfaces/ITeamModel';

class TeamsService {
  constructor(private teamsModel: typeof Team) { }

  async findAll(): Promise<ITeam[]> {
    const result = await this.teamsModel.findAll();
    return result;
  }

  async findById(id: number): Promise<ITeam | null> {
    const result = await this.teamsModel.findOne({ where: { id } });
    return result;
  }
}

export default TeamsService;
