import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Movie from '../infra/typeorm/entities/Movie';

import IMoviesRepository from '../repositories/IMoviesRepository';

@injectable()
class DeleteMovieService {
  constructor(
    @inject('MoviesRepository')
    private moviesRepository: IMoviesRepository,
  ) {}

  public async execute(id: string): Promise<Movie> {
    const checkMovieExists = await this.moviesRepository.get(id);

    if (!checkMovieExists) {
      throw new AppError('Movie does not exists', 494);
    }

    const movie = await this.moviesRepository.delete(id);

    return movie;
  }
}

export default DeleteMovieService;
