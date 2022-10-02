import Team from '../database/models/TeamModel';
import ITeam from '../interfaces/ITeam';

class TeamsService {
  constructor(private teamsModel: typeof Team) { }

  async findAll() {
    const result = await this.teamsModel.findAll();
    return result; 
  }
}

export default TeamsService;