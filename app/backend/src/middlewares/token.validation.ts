import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import IUser from '../interfaces/IUser';
import { verifyToken } from '../helpers/token';

function tokenValidation(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;
  console.log('token is', token);

  if (!token) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'A Token needs to be informed' });
  }
  const loggedUser = verifyToken(token) as IUser;
  console.log('logged user is', loggedUser);

  if (!loggedUser) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token not valid' });
  }

  req.body.user = loggedUser;
  // if (req.route.path === '/login/validate') {
  //   return res.status(StatusCodes.OK).json({ role: loggedUser.role });
  // }

  next();
}

export default tokenValidation;
