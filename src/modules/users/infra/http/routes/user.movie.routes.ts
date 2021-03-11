import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import authorization from '@shared/infra/middlewares/authorization';
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
      email: Joi.number().min(0).max(4).required(),
    },
  }),
  authorization(permittedRoles),
  userMovieConroller.create,
);

export default userMovieRouter;
