import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verifyToken } from '../helpers/token';

const tokenValidation: RequestHandler = (req, res, next) => {
  const { authorization } = req.headers;
  console.log('autorization is', authorization);

  if (!authorization) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token not valid' });
  }
  const token = verifyToken(authorization);
  req.body.loggedUser = token;
  next();
};

export default tokenValidation;
