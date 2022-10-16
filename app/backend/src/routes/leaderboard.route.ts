import { Router } from 'express';
import LeaderboardService from '../services/leaderboard.service';
import LeaderboardController from '../controllers/leaderboard.controller';
import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';
import MatchesService from '../services/matches.service';
import TeamsService from '../services/teams.service';

const leaderboardRoute = Router();

const matchesService = new MatchesService(Match);
const teamsService = new TeamsService(Team);
const leaderboardService = new LeaderboardService(teamsService, matchesService);
const leaderboardController = new LeaderboardController(leaderboardService);

leaderboardRoute
  .get('/home', (req, res) => leaderboardController.getLeaderboard(req, res));

leaderboardRoute
  .get('/away', (req, res) => leaderboardController.getLeaderboard(req, res));

leaderboardRoute
  .get('/', (req, res) => leaderboardController.getLeaderboard(req, res));

export default leaderboardRoute;
