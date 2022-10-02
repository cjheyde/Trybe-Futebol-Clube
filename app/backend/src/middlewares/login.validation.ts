import { RequestHandler } from 'express';
import { StatusCodes } from "http-status-codes";

const loginValidation: RequestHandler = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Some required fields are missing' });
  }
  if (email.lengh < 1 || password.lengh < 6) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Incorrect email or password' });
  }
  next();
};

export default loginValidation;


