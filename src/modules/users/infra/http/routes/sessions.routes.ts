import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import { JoiPasswordComplexity } from 'joi-password';

import SessionsController from '../controllers/SessionsController';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post(
  '/',
  /* celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: JoiPasswordComplexity.string()
        .minOfSpecialCharacters(2)
        .minOfLowercase(2)
        .minOfUppercase(2)
        .minOfNumeric(2)
        .required(),
    },
  }), */
  sessionsController.create,
);

export default sessionsRouter;
