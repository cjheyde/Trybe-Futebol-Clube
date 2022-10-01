import jwt, { SignOptions } from 'jsonwebtoken';
import Login from '../interfaces/ILoginService';
import 'dotenv/config';

const { JWT_SECRET } = process.env;

function createToken(payload: Login[]): string {
  const JWT_OPTIONS: SignOptions = {
    algorithm: 'HS256',
    expiresIn: '2d',
  };
  
  const token = jwt.sign({ data: payload }, JWT_SECRET, JWT_OPTIONS);
  return token;
}

function verifyToken(token: string): Login[] {
  const payload = jwt.verify(token, JWT_SECRET);
  return payload as Login[];
}

export { createToken, verifyToken };