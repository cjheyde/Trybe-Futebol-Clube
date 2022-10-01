import { Router } from 'express'; 
import UsersController from '../controllers/user/UserController';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.post('/login', usersController.getByLogin);

export default usersRouter;