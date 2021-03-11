import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import { JoiPasswordComplexity } from 'joi-password';

import SignUpController from '../controllers/SignUpController';

const signupRouter = Router();
const signUpController = new SignUpController();

signupRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(2).required(),
      email: Joi.string().email().required(),
      password: JoiPasswordComplexity.string()
        .minOfSpecialCharacters(2)
        .minOfLowercase(2)
        .minOfUppercase(2)
        .minOfNumeric(2)
        .required(),
    },
  }),
  signUpController.create,
);

export default signupRouter;
