import jwt from 'jsonwebtoken';
import { env } from './env.js';
const secret = env('JWT_SECRET') as string;
export const jwtToken = (data: object, expiresIn: string = `15m`) => {
  const token = jwt.sign(data, secret, {
    expiresIn: expiresIn as jwt.SignOptions['expiresIn'],
  });
  return token;
};
