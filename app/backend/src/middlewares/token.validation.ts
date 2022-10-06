import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verifyToken } from '../helpers/token';

const tokenValidation: RequestHandler = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'token not found' });
    }
    const dataToken = verifyToken(authorization);

    req.body.user = dataToken;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default tokenValidation;
