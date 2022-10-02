import { Router } from 'express'; 
import User from '../database/models/UserModel';
import UserService from "../services/user.service";
import UserController from '../controllers/user.controller';
import loginValidation from '../middlewares/login.validation';

const userRoute = Router();

const userController = new UserController(new UserService(User));

userRoute.post('/login', loginValidation, (req, res) => userController.login(req, res));

userRoute.get('/login/validate', (req, res) => userController.validateRole(req, res));

export default userRoute;