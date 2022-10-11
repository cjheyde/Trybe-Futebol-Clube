import IMatch from '../interfaces/IMatch';
import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';
import IMatchScores from '../interfaces/IMatchScores';

class MatchesService {
  constructor(
    private matchesModel: typeof Match,
  ) { }

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

  async create(newMatch: IMatch) {
    const result = await this.matchesModel.create(newMatch);
    return result as IMatch;
  }

  async updateFinished(id: number, inProgress: boolean) {
    await this.matchesModel.update({ inProgress }, { where: { id } });
    const result = await this.matchesModel.findOne({ where: { id } });
    return result;
  }

  async findOne(team: number) {
    const result = await this.matchesModel.findOne({ where: { id: team } });
    return result;
  }

  async updateInProgress(id: number, inProgress: boolean, newData: IMatchScores) {
    const { homeTeamGoals, awayTeamGoals } = newData;
    const result = await this.matchesModel
      .update({ homeTeamGoals, awayTeamGoals }, { where: { id, inProgress } });
    return result;
  }

  async allFinishedMatches() {
    const result = await this.matchesModel.findAll({ where: { inProgress: false } });
    return result;
  }
}

export default MatchesService;
