import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

const matchesValidation: RequestHandler = (req, res, next) => {
  const { homeTeam, awayTeam } = req.body;
  if (homeTeam === awayTeam) {
    return res.status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }
  next();
};

export default matchesValidation;
