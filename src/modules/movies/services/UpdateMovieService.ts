import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Movie from '../infra/typeorm/entities/Movie';

import IMoviesRepository from '../repositories/IMoviesRepository';
import IUpdateMovieDTO from '../dtos/IUpdateMovieDTO';

@injectable()
class UpdateMovieService {
  constructor(
    @inject('MoviesRepository')
    private moviesRepository: IMoviesRepository,
  ) {}

  public async execute({
    id,
    name,
    type,
    actors,
    director,
  }: IUpdateMovieDTO): Promise<Movie> {
    const checkMovieExists = await this.moviesRepository.get(id);

    if (!checkMovieExists) {
      throw new AppError('Movie does not found', 404);
    }

    const movie = await this.moviesRepository.update({
      id,
      name,
      type,
      actors,
      director,
    });

    return movie;
  }
}

export default UpdateMovieService;
