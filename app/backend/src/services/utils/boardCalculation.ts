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

  resetBoard() {
    this.board.name = '';
    this.board.totalPoints = 0;
    this.board.totalGames = 0;
    this.board.totalVictories = 0;
    this.board.totalDraws = 0;
    this.board.totalLosses = 0;
    this.board.goalsFavor = 0;
    this.board.goalsOwn = 0;
    this.board.goalsBalance = 0;
    this.board.efficiency = 0;
  }

  async getBoard(param: string, allTeams: ITeam[], allFinishedMatches: IMatch[]) {
    const finalBoard: ILeaderboard[] = allTeams.map((team: ITeam) => {
      this.resetBoard();
      this.board.name = team.teamName;
      allFinishedMatches.forEach((match: IMatch) => {
        if (param === '/home' && team.id === match.homeTeam) {
          this.homeBoardCalculation(match);
        }
        if (param === '/away' && team.id === match.awayTeam) {
          this.awayBoardCalculation(match);
        }
        if (team.id === match.homeTeam) { this.homeBoardCalculation(match); }
        if (team.id === match.awayTeam) { this.awayBoardCalculation(match); }
      });
      return { ...this.board };
    });
    return finalBoard;
  }

  homeBoardCalculation(match: IMatch) {
    this.board.totalVictories += match.homeTeamGoals > match.awayTeamGoals ? 1 : 0;
    this.board.totalDraws += match.homeTeamGoals === match.awayTeamGoals ? 1 : 0;
    this.board.totalLosses += match.homeTeamGoals < match.awayTeamGoals ? 1 : 0;
    this.board.totalPoints = (this.board.totalVictories * 3) + this.board.totalDraws;
    this.board.totalGames += 1;
    this.board.goalsFavor += match.homeTeamGoals;
    this.board.goalsOwn += match.awayTeamGoals;
    this.board.goalsBalance = this.board.goalsFavor - this.board.goalsOwn;
    this.board.efficiency = Number(
      ((this.board.totalPoints / (this.board.totalGames * 3)) * 100).toFixed(2),
    );
  }

  awayBoardCalculation(match: IMatch) {
    this.board.totalVictories += match.awayTeamGoals > match.homeTeamGoals ? 1 : 0;
    this.board.totalDraws += match.homeTeamGoals === match.awayTeamGoals ? 1 : 0;
    this.board.totalLosses += match.awayTeamGoals < match.homeTeamGoals ? 1 : 0;
    this.board.totalPoints = (this.board.totalVictories * 3) + this.board.totalDraws;
    this.board.totalGames += 1;
    this.board.goalsFavor += match.awayTeamGoals;
    this.board.goalsOwn += match.homeTeamGoals;
    this.board.goalsBalance = this.board.goalsFavor - this.board.goalsOwn;
    this.board.efficiency = Number(
      ((this.board.totalPoints / (this.board.totalGames * 3)) * 100).toFixed(2),
    );
  }
}

export default BoardCalculation;
