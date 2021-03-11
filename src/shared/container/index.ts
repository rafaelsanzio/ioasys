import { container } from 'tsyringe';

import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserMovieRepository from '@modules/users/repositories/IUserMovieRepository';
import UserMovieRepository from '@modules/users/infra/typeorm/repositories/UserMovieRepository';

import IMoviesRepository from '@modules/movies/repositories/IMoviesRepository';
import MoviesRepository from '@modules/movies/infra/typeorm/repositories/MoviesRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserMovieRepository>(
  'UserMovieRepository',
  UserMovieRepository,
);

container.registerSingleton<IMoviesRepository>(
  'MoviesRepository',
  MoviesRepository,
);
