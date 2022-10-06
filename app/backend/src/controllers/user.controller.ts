import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/user.service';
import BcryptService from '../helpers/BcryptService';
import { createToken } from '../helpers/token';
import IUser from '../interfaces/IUser';

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

  async validateRole(req: Request, res: Response) {
    const { user } = req.body;
    const { payload } = user;
    const { email } = payload;

    const loggedUser = await this.userService.getByEmail(email);
    console.log('role do validateRole', payload.email);

    const role = loggedUser?.role;

    return res.status(StatusCodes.OK).json({ role });
  }
}

export default UserController;
