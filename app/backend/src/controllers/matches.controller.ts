import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import MatchesService from '../services/matches.service';

class MatchesController {
  constructor(private matchesService: MatchesService) { }

  async findAll(req: Request, res: Response) {
    const getMatches = await this.matchesService.findAll();
    return res.status(StatusCodes.OK).json(getMatches);
  }

  async create(req: Request, res: Response) {
    const newMatch = req.body;
    const createNewMatch = await this.matchesService.create(newMatch);
    return res.status(201).json(createNewMatch);
  }

  // async findById(req: Request, res: Response) {
  //   const { id } = req.params;
  //   const getMatch = await this.matchesService.findById(Number(id));
  //   return res.status(StatusCodes.OK).json(getMatch);
  // }
}

export default MatchesController;
