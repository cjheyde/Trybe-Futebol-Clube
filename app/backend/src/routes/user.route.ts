import { Router } from 'express';
import User from '../database/models/UserModel';
import UserService from '../services/user.service';
import UserController from '../controllers/user.controller';
import loginValidation from '../middlewares/login.validation';
import tokenValidation from '../middlewares/token.validation';

const userRoute = Router();

const userService = new UserService(User);
const userController = new UserController(userService);

userRoute.post('/login', loginValidation, (req, res) => userController.login(req, res));

userRoute.get(
  '/login/validate',
  tokenValidation,
  (req, res) => UserController.validateRole(req, res),
);

userRoute.post(
  '/',
  tokenValidation,
  (req, res) => UserController.validateRole(req, res),
);

export default userRoute;
