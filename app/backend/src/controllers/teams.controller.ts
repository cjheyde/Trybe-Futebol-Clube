import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import TeamsService from '../services/teams.service';

class TeamsController {
  constructor(private teamsService: TeamsService) { }

  async findAll (req: Request, res: Response) {
    const getTeams = await this.teamsService.findAll();
    res.status(StatusCodes.OK).json(getTeams);
    }

  async findById (req: Request, res: Response) {
    const { id } = req.params;
    const getTeam = await this.teamsService.findById(Number(id));
    res.status(StatusCodes.OK).json(getTeam);
    }
  }

export default TeamsController;