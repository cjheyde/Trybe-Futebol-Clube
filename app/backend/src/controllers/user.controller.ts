import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import IUser from '../interfaces/IUser';
import UserService from '../services/user.service';
import BcryptService from '../helpers/BcryptService';

class UserController {
  constructor(private userService: UserService) { }

  async login (req: Request, res: Response) {
    const { email, password } = req.body;
    const loggedUser: IUser | null = await this.userService.getByEmail(email);
    if (loggedUser === null) {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Incorrect email or password' })
    } else {
    const passwordBcrypted = BcryptService.compare(loggedUser.password, password);
    if (!passwordBcrypted) {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Incorrect email or password' })
    }
    const token = this.userService.login(email, password);
    res.status(StatusCodes.OK).json({ token });
    }
  }

  validateRole (req: Request, res: Response) {
    const { authorization } = req.headers;
    const checkRole = this.userService.validateRole(authorization);
    if (!checkRole) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'User not authorized' });  
    }
    return res.status(StatusCodes.OK).json({ role: checkRole }); 
  }
}

export default UserController;