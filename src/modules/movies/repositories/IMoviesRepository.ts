import Movie from '../infra/typeorm/entities/Movie';

import ICreateMovieDTO from '../dtos/ICreateMovieDTO';
import IUpdateMovieDTO from '../dtos/IUpdateMovieDTO';
import IListParamsDTO from '../dtos/IListParamsDTO';
import IGetMovieDTO from '../dtos/IGetMovieDTO';

export default interface IMoviesRepository {
  get(id: string): Promise<IGetMovieDTO>;
  list(params?: IListParamsDTO): Promise<Movie[]>;
  create(data: ICreateMovieDTO): Promise<Movie>;
  update(data: IUpdateMovieDTO): Promise<Movie>;
  delete(id: string): Promise<Movie>;
  save(data: Movie): Promise<Movie>;
}
