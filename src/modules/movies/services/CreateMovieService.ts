import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';

import Movie from '../infra/typeorm/entities/Movie';

import IMoviesRepository from '../repositories/IMoviesRepository';
import ICreateMovieDTO from '../dtos/ICreateMovieDTO';

@injectable()
class CreateMovieService {
  constructor(
    @inject('MoviesRepository')
    private moviesRepositosy: IMoviesRepository,
  ) {}

  public async execute({
    name,
    type,
    actors,
    director,
  }: ICreateMovieDTO): Promise<Movie> {
    const movie = await this.moviesRepositosy.create({
      name,
      type,
      actors,
      director,
    });

    return movie;
  }
}

export default CreateMovieService;
