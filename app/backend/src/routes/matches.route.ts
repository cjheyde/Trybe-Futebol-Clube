import { Router } from 'express';
import Match from '../database/models/MatchModel';
import MatchesService from '../services/matches.service';
import MatchesController from '../controllers/matches.controller';

const matchesRoute = Router();

const matchService = new MatchesService(Match);
const matchesController = new MatchesController(matchService);

matchesRoute.get('/', (req, res) => matchesController.findAll(req, res));

// matchesRoute.patch('/:id', (req, res) => matchesController.findById(req, res));

// matchesRoute.patch('/:id/finish', (req, res) => matchesController.findById(req, res));

export default matchesRoute;
