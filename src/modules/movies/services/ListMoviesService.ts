import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';

import Movie from '../infra/typeorm/entities/Movie';

import IMoviesRepository from '../repositories/IMoviesRepository';

import IListParamsDTO from '../dtos/IListParamsDTO';

@injectable()
class ListMoviesServices {
  constructor(
    @inject('MoviesRepository')
    private moviesRepository: IMoviesRepository,
  ) {}

  public async execute(params?: IListParamsDTO): Promise<Movie[]> {
    const movies = await this.moviesRepository.list(params);

    return movies;
  }
}

export default ListMoviesServices;
