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
    const { homeTeam, awayTeam } = newMatch;

    const checkHomeTeam = await this.matchesService.findOne(homeTeam);
    const checkAwayTeam = await this.matchesService.findOne(awayTeam);
    if (!checkHomeTeam || !checkAwayTeam) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'There is no team with such id!' });
    }
    const createNewMatch = await this.matchesService.create(newMatch);
    return res.status(201).json(createNewMatch);
  }

  async updateFinished(req: Request, res: Response) {
    const { id } = req.params;
    const inProgress = false;
    const matchFinished = await this.matchesService.updateFinished(Number(id), inProgress);
    req.body.match = matchFinished;
    return res.status(200).json({ message: 'Finished' });
  }

  async updateInProgress(req: Request, res: Response) {
    const { id } = req.params;
    const newData = req.body;
    const inProgress = true;

    await this.matchesService.updateInProgress(Number(id), inProgress, newData);

    return res.status(200).json({ message: 'Match scores updated!' });
  }
}

export default MatchesController;
