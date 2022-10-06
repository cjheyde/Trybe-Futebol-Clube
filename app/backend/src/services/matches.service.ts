import IMatch from '../interfaces/IMatch';
// import IMatchModel from '../interfaces/IMatchModel';
import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';

class MatchesService {
  // constructor(private matchesModel: IMatchModel) { }
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

  // async findById(id: number): Promise<IMatch | null> {
  //   const result = await this.matchesModel.findOne({ where: { id } });
  //   return result;
  // }
}

export default MatchesService;
