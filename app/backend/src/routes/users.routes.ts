import * as express from 'express'; 
import User from '../database/models/UserModel';
import UserService from "../services/user.service";
import UserController from '../controllers/user.controller';

const usersRouter = express.Router();

const userController = new UserController(new UserService(User));

usersRouter.post('/login', (req, res) => userController.login(req, res));

export default usersRouter;