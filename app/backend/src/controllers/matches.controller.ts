import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import MatchesService from '../services/matches.service';

class MatchesController {
  constructor(private matchesService: MatchesService) { }

  async findAll(req: Request, res: Response) {
    const getMatches = await this.matchesService.findAll();
    return res.status(StatusCodes.OK).json(getMatches);
  }

  // async findById(req: Request, res: Response) {
  //   const { id } = req.params;
  //   const getMatch = await this.matchesService.findById(Number(id));
  //   return res.status(StatusCodes.OK).json(getMatch);
  // }
}

export default MatchesController;
