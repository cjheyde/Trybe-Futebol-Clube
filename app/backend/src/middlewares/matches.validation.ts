import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

const matchesValidation: RequestHandler = (req, res, next) => {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
  if (!homeTeam || !awayTeam || !homeTeamGoals || !awayTeamGoals) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'All fields must be filled' });
  }

  next();
};

export default matchesValidation;
