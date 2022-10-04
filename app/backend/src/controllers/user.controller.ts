import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import IUser from '../interfaces/IUser';
import UserService from '../services/user.service';
import BcryptService from '../helpers/BcryptService';
import { createToken } from '../helpers/token';

class UserController {
  constructor(private userService: UserService) { }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const loggedUser: IUser | null = await this.userService.getByEmail(email);
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
    const { loggedUser } = req.body;
    const { role } = loggedUser;
    console.log('role do validateRole', role);

    return res.status(StatusCodes.OK).json({ role });
  }
}

export default UserController;
