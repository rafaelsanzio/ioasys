import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';

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
