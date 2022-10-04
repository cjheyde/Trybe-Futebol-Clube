import * as jwt from 'jsonwebtoken';
import { SignOptions } from 'jsonwebtoken';
import ILogin from '../interfaces/ILogin';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET as string;

function createToken(payload: ILogin) {
  const JWT_OPTIONS: SignOptions = {
    algorithm: 'HS256',
    expiresIn: '6d',
  };

  const tokenCreated = jwt.sign({ payload }, JWT_SECRET, JWT_OPTIONS);
  return tokenCreated;
}

function verifyToken(tokenVerified: string): string | jwt.JwtPayload {
  const payload = jwt.verify(tokenVerified, JWT_SECRET);
  return payload;
}

export { createToken, verifyToken };
