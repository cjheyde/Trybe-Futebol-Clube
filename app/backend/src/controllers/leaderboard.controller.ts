import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import LeaderboardService from '../services/leaderboard.service';

class LeaderboardController {
  constructor(private leaderboardService: LeaderboardService) { }

  async getLeaderboard(req: Request, res: Response) {
    let setBoard = req.path;
    if (setBoard === '/') {
      setBoard = 'all';
    }
    const boardData = await this.leaderboardService.getLeaderboard(setBoard);
    return res.status(StatusCodes.OK).json(
      boardData
        .sort((a, b) => b.totalPoints - a.totalPoints
          || b.totalVictories - a.totalVictories
          || b.goalsBalance - a.goalsBalance
          || b.goalsFavor - a.goalsFavor
          || b.goalsOwn - a.goalsOwn),
    );
  }
}

export default LeaderboardController;
