import * as jwt from 'jsonwebtoken';
import { SignOptions } from 'jsonwebtoken';
// import ILogin from '../interfaces/ILogin';
import 'dotenv/config';
import IUser from '../interfaces/IUser';

const JWT_SECRET = process.env.JWT_SECRET as string;

function createToken(payload: IUser) {
  const JWT_OPTIONS: SignOptions = {
    algorithm: 'HS256',
    expiresIn: '6d',
  };

  const token = jwt.sign({ payload }, JWT_SECRET, JWT_OPTIONS);
  return token;
}

function verifyToken(token: string) {
  const payload = jwt.verify(token, JWT_SECRET);
  return payload;
}

export { createToken, verifyToken };
