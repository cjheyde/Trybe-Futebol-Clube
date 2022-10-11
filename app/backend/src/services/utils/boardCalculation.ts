import ILeaderboard from '../../interfaces/ILeaderboard';
import ITeam from '../../interfaces/ITeam';
import IMatch from '../../interfaces/IMatch';

class BoardCalculation {
  private board: ILeaderboard = {
    name: '',
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: 0,
  };

  async getBoard(allTeams: ITeam[], allFinishedMatches: IMatch[]) {
    const finalBoard: ILeaderboard[] = allTeams.map((team: ITeam) => {
      this.board.name = team.teamName;
      allFinishedMatches.forEach((match: IMatch) => {
        if (team.id === match.homeTeam) {
          this.homeBoardCalculation(match);
        }
      });
      return { ...this.board };
    });
    return finalBoard;
  }

  homeBoardCalculation(match: IMatch) {
    this.board.totalGames += 1;
    this.board.totalVictories = 0;
    this.board.totalDraws = 0;
    this.board.totalLosses = 0;
    this.board.totalPoints = (this.board.totalVictories * 3) + this.board.totalDraws;
    this.board.goalsFavor += match.homeTeamGoals;
    this.board.goalsOwn += match.awayTeamGoals;
    this.board.goalsBalance = this.board.goalsFavor - this.board.goalsOwn;
    this.board.efficiency = 0;
  }
}

export default BoardCalculation;
