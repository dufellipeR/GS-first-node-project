import { Request, Response, NextFunction, request } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error('JWT token is missing');
  }

  const { secret, expiresIn } = authConfig.jwt;

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verify(token, secret);

    const { sub } = decoded as TokenPayload;

    req.user = {
      id: sub,
    };

    // console.log(decoded);

    return next();
  } catch (err) {
    throw new Error('Invalid JWT token');
  }
}
