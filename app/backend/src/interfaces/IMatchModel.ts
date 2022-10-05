import Team from '../database/models/TeamModel';
import IMatch from './IMatch';

interface IMatchModel {
  findAll(options: { include: [ {
    model: Team,
    as: 'teamHome',
    attributes: { exclude: ['id'] },
  },
  {
    model: Team,
    as: 'teamAway',
    attributes: { exclude: ['id'] },
  }] }): Promise<IMatch[] | null>;

  findOne(options: { where: { id: number } }): Promise<IMatch | null>
}

export default IMatchModel;
