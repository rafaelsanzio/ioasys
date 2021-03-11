import { Request, Response, NextFunction } from 'express';

import AppError from '@shared/errors/AppError';

const USER = 'user';

export default function permit(permittedRoles: Array<string>) {
  return (request: Request, response: Response, next: NextFunction) => {
    const { role } = request.user;

    var isPermitted = false;
    if (role === USER) {
      isPermitted = true;
    }

    if (isPermitted) {
      next();
    } else {
      throw new AppError('User forbidden to access', 403);
    }
  };
}
