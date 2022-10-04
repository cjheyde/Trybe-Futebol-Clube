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
      res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Incorrect email or password' });
    } else {
      const passwordBcrypted = BcryptService.compare(loggedUser.password, password);
      if (!passwordBcrypted) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Incorrect email or password' });
      }
      const loggedToken = createToken({ email, password });
      res.status(StatusCodes.OK).json({ token: loggedToken });
    }
  }

  // async validateRole(req: Request, res: Response) {
  //   const { authorization } = req.headers;
  //   if (!authorization) {
  //     return res.status(StatusCodes.BAD_REQUEST).json({ role: 'User Not authorized!' });
  //   }
  //   const checkAuthorization = verifyToken(authorization);
  //   console.log(checkAuthorization);

  //   return res.status(StatusCodes.OK).json({ role });
  // }
}

export default UserController;
