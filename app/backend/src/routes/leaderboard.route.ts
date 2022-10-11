import { Router } from 'express';
import LeaderboardService from '../services/leaderboard.service';
import LeaderboardController from '../controllers/leaderboard.controller';
import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';

const leaderboardRoute = Router();

const leaderboardService = new LeaderboardService(Team, Match);
const leaderboardController = new LeaderboardController(leaderboardService);

leaderboardRoute
  .get('/home', (req, res) => leaderboardController.getHomeLeaderboard(req, res));

export default leaderboardRoute;
