import Team from '../database/models/TeamModel';
import ITeam from '../interfaces/ITeam';

class TeamsService {
  constructor(private teamsModel: typeof Team) { }

  async findAll(): Promise<ITeam[]> {
    const result = await this.teamsModel.findAll();
    return result as ITeam[];
  }

  async findById(id: number): Promise<ITeam | null> {
    const result = await this.teamsModel.findOne({ where: { id } });
    return result as ITeam | null;
  }
}

export default TeamsService;
