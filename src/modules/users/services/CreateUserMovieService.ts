import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import UserMovie from '../infra/typeorm/entities/UserMovie';

import IUserMovieRepository from '../repositories/IUserMovieRepository';
import ICreateUserMovieDTO from '../dtos/ICreateUserMovieDTO';
import IMoviesRepository from '@modules/movies/repositories/IMoviesRepository';

@injectable()
export default class CreateUserMovieService {
  constructor(
    @inject('UserMovieRepository')
    private userMovieRepository: IUserMovieRepository,

    @inject('MoviesRepository')
    private moviesRepository: IMoviesRepository,
  ) {}

  public async execute({
    user_id,
    movie_id,
    vote,
  }: ICreateUserMovieDTO): Promise<UserMovie> {
    const checkMovieIsNotDeleted = await this.moviesRepository.get(movie_id);

    if (!checkMovieIsNotDeleted) {
      throw new AppError('Movie does not exists or it has been deleted');
    }

    const userMovie = await this.userMovieRepository.create({
      user_id,
      movie_id,
      vote,
    });

    return userMovie;
  }
}
