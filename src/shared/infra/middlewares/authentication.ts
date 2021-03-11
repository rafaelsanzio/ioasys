import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import authConfig from '@shared/config/auth';

import AppError from '@shared/errors/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
  jti: string;
}

export default function authentication(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing.', 401);
  }

  const [, token] = authHeader.split(' ');
  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub, jti } = decoded as ITokenPayload;

    request.user = {
      id: sub,
      role: jti,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
