import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import LeaderboardService from '../services/leaderboard.service';

class LeaderboardController {
  constructor(private leaderboardService: LeaderboardService) { }

  async getHomeLeaderboard(req: Request, res: Response) {
    const boardData = await this.leaderboardService.getHomeLeaderboard();
    return res.status(StatusCodes.OK).json(boardData);
  }
}

export default LeaderboardController;
