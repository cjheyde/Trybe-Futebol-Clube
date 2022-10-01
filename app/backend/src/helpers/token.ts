import * as jwt from 'jsonwebtoken'; 
import { SignOptions } from 'jsonwebtoken';
import ILogin from '../interfaces/ILogin';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET as string;

function createToken(payload: ILogin): string {
  const JWT_OPTIONS: SignOptions = {
    algorithm: 'HS256',
    expiresIn: '6d',
  };
  
  const token = jwt.sign({ data: payload }, JWT_SECRET, JWT_OPTIONS);
  return token;
}

function verifyToken(token: string): ILogin {
  const payload = jwt.verify(token, JWT_SECRET);
  return payload as ILogin;
}

export { createToken, verifyToken };