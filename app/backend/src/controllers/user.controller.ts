import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/user.service';
import BcryptService from '../helpers/BcryptService';
import { createToken } from '../helpers/token';
import ILogin from '../interfaces/ILogin';

class UserController {
  constructor(private userService: UserService) { }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const loggedUser: ILogin | null = await this.userService.getByEmail(email);
    if (loggedUser === null) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Incorrect email or password' });
    }
    const passwordBcrypted = BcryptService.compare(loggedUser.password, password);
    if (!passwordBcrypted) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Incorrect email or password' });
    }
    const loggedToken = createToken({ email, password });
    return res.status(StatusCodes.OK).json({ token: loggedToken });
  }

  static validateRole(req: Request, res: Response) {
    const { user } = req.body;

    console.log('role do validateRole', user.role);

    return res.status(StatusCodes.OK).json({ role: user.role });
  }
}

export default UserController;
