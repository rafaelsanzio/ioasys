import { getRepository, Repository, IsNull } from 'typeorm';

import IListParamsDTO from '@modules/movies/dtos/IListParamsDTO';
import ICreateMovieDTO from '@modules/movies/dtos/ICreateMovieDTO';
import IUpdateMovieDTO from '@modules/movies/dtos/IUpdateMovieDTO';

import IMoviesRepository from '@modules/movies/repositories/IMoviesRepository';

import Movie from '../entities/Movie';

import AppError from '@shared/errors/AppError';
import IGetMovieDTO from '@modules/movies/dtos/IGetMovieDTO';

class MoviesRepository implements IMoviesRepository {
  private ormRepository: Repository<Movie>;

  constructor() {
    this.ormRepository = getRepository(Movie);
  }

  public async get(id: string): Promise<IGetMovieDTO | undefined> {
    const query = `
      WITH avarage_movies AS (
        SELECT movie_id, AVG(vote) as avarage_votes
        FROM user_movie
        GROUP BY movie_id
      )
      SELECT movies.*, avarage_votes
      FROM movies
      LEFT JOIN avarage_movies ON avarage_movies.movie_id = movies.id
      WHERE movies.id = $1 
      AND movies.deleted_at IS NULL`;

    const movies = await this.ormRepository.query(query, [id]);
    const movie = movies[0];

    return movie;
  }

  public async list({
    name,
    type,
    director,
    actor,
  }: IListParamsDTO): Promise<Movie[]> {
    let query = this.ormRepository
      .createQueryBuilder('movies')
      .select(
        'id, name, type, actors, director, created_at, updated_at, deleted_at',
      )
      .where('deleted_at IS NULL');

    if (name) {
      query.andWhere('movies.name ILIKE :name', { name: `%${name}%` });
    }
    if (type) {
      query.andWhere('movies.type ILIKE :type', { type: `%${type}%` });
    }
    if (director) {
      query.andWhere('movies.director ILIKE :director', {
        director: `%${director}%`,
      });
    }
    if (actor) {
      query.andWhere(':actor = ANY(movies.actors)', { actor });
    }

    const movies = await query.getRawMany();
    console.log('movies', query.getSql());
    return movies;
  }

  public async create({
    name,
    type,
    director,
    actors,
  }: ICreateMovieDTO): Promise<Movie> {
    const movie = this.ormRepository.create({ name, type, director, actors });

    await this.ormRepository.save(movie);

    return movie;
  }

  public async update({
    id,
    name,
    type,
    director,
    actors,
  }: IUpdateMovieDTO): Promise<Movie> {
    const movie = await this.ormRepository.findOne(id, {
      where: { deleted_at: IsNull() },
    });

    if (!movie) {
      throw new AppError('Movie does not found', 404);
    }

    movie.name = name;
    movie.type = type;
    movie.director = director;
    movie.actors = actors;

    await this.ormRepository.save(movie);

    return movie;
  }

  public async delete(id: string): Promise<Movie> {
    const movie = await this.ormRepository.findOne(id);

    if (!movie) {
      throw new AppError('movie does not found', 404);
    }

    await this.ormRepository.update(id, { deleted_at: new Date() });

    movie.deleted_at = new Date();

    return movie;
  }

  public async save(movie: Movie): Promise<Movie> {
    return this.ormRepository.save(movie);
  }
}

export default MoviesRepository;
