import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import IUser from '../interfaces/IUser';
import UserService from '../services/user.service';
import BcryptService from '../utils/BcryptService';
// import { loginSchema } from '../middlewares/login.schema';

class UserController {
  constructor(private userService: UserService) { }

  async login (req: Request, res: Response) {
    const { email, password } = req.body;
    // await loginSchema.validate({ email, password });
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
}

export default UserController;