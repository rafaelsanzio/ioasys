import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import UsersController from '../controllers/UsersController';

import authorization from '@shared/infra/middlewares/authorization';
import authentication from '@shared/infra/middlewares/authentication';

const permittedRoles = ['admin'];

const usersRouter = Router();
const usersConroller = new UsersController();

usersRouter.use(authentication);

usersRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(2).required(),
    },
  }),
  usersConroller.update,
);

usersRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      role: Joi.string().required().valid('admin', 'user'),
    },
  }),
  authorization(permittedRoles),
  usersConroller.updateRole,
);

usersRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  usersConroller.delete,
);

export default usersRouter;
