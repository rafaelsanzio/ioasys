import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import authentication from '@shared/infra/middlewares/authentication';
import authorization from '@shared/infra/middlewares/authorization';

import MoviesController from '../controllers/MoviesController';

const permittedRoles = ['admin'];

const moviesRouter = Router();
const moviesController = new MoviesController();

moviesRouter.use(authentication);

moviesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(2).required(),
      type: Joi.string().min(2).required(),
      actors: Joi.array().items(Joi.string().min(2).required()).required(),
      director: Joi.string().min(2).required(),
    },
  }),
  authorization(permittedRoles),
  moviesController.create,
);

moviesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  authorization(permittedRoles),
  moviesController.delete,
);

moviesRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().min(2).required(),
      type: Joi.string().min(2).required(),
      actors: Joi.array().items(Joi.string().min(2).required()).required(),
      director: Joi.string().min(2).required(),
    },
  }),
  authorization(permittedRoles),
  moviesController.update,
);

moviesRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string(),
      type: Joi.string(),
      actor: Joi.string(),
      director: Joi.string(),
    },
  }),
  moviesController.list,
);

moviesRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  moviesController.get,
);

export default moviesRouter;
