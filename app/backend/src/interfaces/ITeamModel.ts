import ITeam from './ITeam';

interface ITeamModel {
  findAll(): Promise<ITeam[]>

  findOne(options: { where: { id: number } }): Promise<ITeam | null>
}

export default ITeamModel;
