import IMatch from '../interfaces/IMatch';
import Match from '../database/models/MatchModel';
import Team from '../database/models/TeamModel';

class MatchesService {
  constructor(private matchesModel: typeof Match) { }

  async findAll() {
    const result = await this.matchesModel.findAll({
      include:
      [
        {
          model: Team,
          as: 'teamHome',
          attributes: { exclude: ['id'] },
        },
        {
          model: Team,
          as: 'teamAway',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return result;
  }

  async findById(id: number): Promise<IMatch | null> {
    const result = await this.matchesModel.findOne({ where: { id } });
    return result;
  }
}

export default MatchesService;
