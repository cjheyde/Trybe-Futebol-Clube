import { Router } from 'express';
import Match from '../database/models/MatchModel';
import MatchesService from '../services/matches.service';
import MatchesController from '../controllers/matches.controller';
import matchesValidation from '../middlewares/matches.validation';
import tokenValidation from '../middlewares/token.validation';

const matchesRoute = Router();

const matchesService = new MatchesService(Match);
const matchesController = new MatchesController(matchesService);

matchesRoute.get(
  '/',
  (req, res) => matchesController.findAll(req, res),
);

matchesRoute.post(
  '/',
  tokenValidation,
  matchesValidation,
  (req, res) => matchesController.create(req, res),
);

matchesRoute.patch(
  '/:id',
  tokenValidation,
  (req, res) => matchesController.updateInProgress(req, res),
);

matchesRoute.patch(
  '/:id/finish',
  tokenValidation,
  (req, res) => matchesController.updateFinished(req, res),
);

export default matchesRoute;
