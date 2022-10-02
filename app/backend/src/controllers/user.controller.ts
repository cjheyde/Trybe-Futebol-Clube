import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/user.service';

class UserController {
  constructor(private userService: UserService) { }

  async login (req: Request, res: Response) {
    const { email, password } = req.body;
    const loggedUser = await this.userService.getByEmail(email);
    if (!loggedUser || loggedUser === null) {
      res.status(StatusCodes.UNAUTHORIZED).send(`loggedUser ${loggedUser} is unauthorized`);
    }
    const token = this.userService.login(email, password);
    res.status(StatusCodes.OK).json({ token });
  }
}

export default UserController;