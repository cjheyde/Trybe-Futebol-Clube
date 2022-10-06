import IMatch from '../interfaces/IMatch';
import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';

class MatchesService {
  constructor(private matchesModel: typeof Match) {}

  async findAll(): Promise<IMatch[] | null> {
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
    return result as IMatch[] | null;
  }

  async create(newMatch: IMatch): Promise<IMatch> {
    const result = await this.matchesModel.create(newMatch);
    return result as IMatch;
  }

  async updateFinished(id: number, inProgress: boolean): Promise<unknown> {
    const result = await this.matchesModel.update({ inProgress }, { where: { id } });
    return result;
  }

  // async findById(id: number): Promise<IMatch | null> {
  //   const result = await this.matchesModel.findOne({ where: { id } });
  //   return result;
  // }
}

export default MatchesService;
