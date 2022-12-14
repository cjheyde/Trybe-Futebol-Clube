import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

const loginValidation: RequestHandler = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'All fields must be filled' });
  }
  if (email.lengh < 8 || password.lengh < 6) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Incorrect email or password' });
  }
  next();
};

export default loginValidation;
