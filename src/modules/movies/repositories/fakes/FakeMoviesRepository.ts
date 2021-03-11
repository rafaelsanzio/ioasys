import { v4 } from 'uuid';

import AppError from '@shared/errors/AppError';

import Movie from '@modules/movies/infra/typeorm/entities/Movie';

import ICreateMovieDTO from '@modules/movies/dtos/ICreateMovieDTO';
import IUpdateMovieDTO from '@modules/movies/dtos/IUpdateMovieDTO';
import IListParamsDTO from '@modules/movies/dtos/IListParamsDTO';

import IMoviesRepository from '@modules/movies/repositories/IMoviesRepository';
import IGetMovieDTO from '@modules/movies/dtos/IGetMovieDTO';
import UserMovie from '@modules/users/infra/typeorm/entities/UserMovie';

class FakeMoviesRepository implements IMoviesRepository {
  private movies: Movie[] = [];
  private userMovies: UserMovie[] = [];

  public async get(id: string): Promise<IGetMovieDTO | undefined> {
    const movie = this.movies.find(
      movie => movie.id === id && movie.deleted_at === undefined,
    );

    if (!movie) {
      throw new AppError('Movie does not found', 404);
    }

    const avarage_votes = this.userMovies.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.vote / this.userMovies.length,
      0,
    );

    const getMovie: IGetMovieDTO = {
      avarage_votes,
      ...movie,
    };

    return getMovie;
  }

  public async list({
    name,
    type,
    actor,
    director,
  }: IListParamsDTO): Promise<Movie[]> {
    let movies = this.movies.filter(movie => movie.deleted_at === undefined);

    if (name) {
      movies = movies.filter(movie => movie.name.match(name));
    }
    if (type) {
      movies = movies.filter(movie => movie.type.match(type));
    }
    if (actor) {
      movies = movies.filter(movie => movie.actors.includes(actor));
    }
    if (director) {
      movies = movies.filter(movie => movie.director.match(director));
    }

    return movies;
  }

  public async create({
    name,
    type,
    actors,
    director,
  }: ICreateMovieDTO): Promise<Movie> {
    const movie = new Movie();

    Object.assign(movie, { id: v4() }, { name, type, actors, director });

    this.movies.push(movie);

    return movie;
  }

  public async update({
    id,
    name,
    type,
    actors,
    director,
  }: IUpdateMovieDTO): Promise<Movie> {
    const movie = this.movies.find(movie => movie.id === id);

    if (!movie) {
      throw new AppError('Movie does not found', 404);
    }

    movie.name = name;
    movie.type = type;
    movie.actors = actors;
    movie.director = director;

    return movie;
  }

  public async delete(id: string): Promise<Movie> {
    const movie = this.movies.find(movie => movie.id === id);

    if (!movie) {
      throw new AppError('Movie does not found', 404);
    }

    movie.deleted_at = new Date();

    return movie;
  }

  public async save(movie: Movie): Promise<Movie> {
    const findIndex = this.movies.findIndex(
      findMovie => findMovie.id === movie.id,
    );

    this.movies[findIndex] = movie;

    return movie;
  }
}

export default FakeMoviesRepository;
