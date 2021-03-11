import { Router } from 'express';

import signupRouter from '@modules/users/infra/http/routes/signup.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import moviesRouter from '@modules/movies/infra/http/routes/movies.routes';
import userMovieRouter from '@modules/users/infra/http/routes/user.movie.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/sign-up', signupRouter);

routes.use('/users', usersRouter);

routes.use('/movies', moviesRouter);

routes.use('/user-movie', userMovieRouter);

export default routes;
