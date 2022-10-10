import { Router } from 'express';
import LeaderboardService from '../services/leaderboard.service';
import LeaderboardController from '../controllers/leaderboard.controller';
import Leaderboard from '../database/models/LeaderboardModel';

const leaderboardRoute = Router();

const leaderboardService = new LeaderboardService(Leaderboard);
const leaderboardController = new LeaderboardController(leaderboardService);

leaderboardRoute.get('/home', (req, res) => leaderboardController.findAll(req, res));

export default leaderboardRoute;
