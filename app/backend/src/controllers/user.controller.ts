import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/users.service';

class UserController {
  constructor(private userService = new UserService) { }

  async login (req: Request, res: Response) {
    const { email, password } = req.body;
    const loggedUser = await this.userService.getByEmail(email);
    if (!loggedUser) {
      return res.status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Incorrect email or password' });
    }
    const token = this.userService.login(email, password);
    res.status(StatusCodes.OK).json({ token });
  };
}

export default UserController;