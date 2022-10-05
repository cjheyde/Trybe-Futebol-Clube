import { Router } from 'express';
import Team from '../database/models/TeamModel';
import TeamsService from '../services/teams.service';
import TeamsController from '../controllers/teams.controller';

const teamsRoute = Router();

const teamsService = new TeamsService(Team);
const teamsController = new TeamsController(teamsService);

teamsRoute.get('/', (req, res) => teamsController.findAll(req, res));

teamsRoute.get('/:id', (req, res) => teamsController.findById(req, res));

export default teamsRoute;
