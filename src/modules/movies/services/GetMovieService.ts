import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';

import Movie from '../infra/typeorm/entities/Movie';

import IMoviesRepository from '../repositories/IMoviesRepository';

@injectable()
class GetMovieServices {
  constructor(
    @inject('MoviesRepository')
    private moviesRepository: IMoviesRepository,
  ) {}

  public async execute(id: string): Promise<Movie> {
    const movie = await this.moviesRepository.get(id);

    return movie;
  }
}

export default GetMovieServices;
