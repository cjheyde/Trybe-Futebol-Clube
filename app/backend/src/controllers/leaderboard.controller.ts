import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import LeaderboardService from '../services/leaderboard.service';

class LeaderboardController {
  constructor(private leaderboardService: LeaderboardService) { }

  async findAll(req: Request, res: Response) {
    const homeTable = await this.leaderboardService.findAll();
    return res.status(StatusCodes.OK).json(homeTable);
  }
}

export default LeaderboardController;
