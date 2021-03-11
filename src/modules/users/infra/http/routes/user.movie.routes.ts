import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import authorizationUser from '@shared/infra/middlewares/authorizationUser';
import authentication from '@shared/infra/middlewares/authentication';

import UserMovieController from '../controllers/UserMovieController';

const permittedRoles = ['user'];

const userMovieRouter = Router();
const userMovieConroller = new UserMovieController();

userMovieRouter.use(authentication);

userMovieRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      movie_id: Joi.string().uuid().required(),
      vote: Joi.number().min(0).max(4).required(),
    },
  }),
  authorizationUser(permittedRoles),
  userMovieConroller.create,
);

export default userMovieRouter;
