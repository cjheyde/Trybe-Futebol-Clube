import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import TeamsService from '../services/teams.service';

class TeamsController {
  constructor(private teamsService: TeamsService) { }

  async findAll (req: Request, res: Response) {
    const getTeams = await this.teamsService.findAll();
    res.status(StatusCodes.OK).json(getTeams);
    }
  }

export default TeamsController;