import FakeMoviesRepository from '@modules/movies/repositories/fakes/FakeMoviesRepository';
import FakeUserMovieRepository from '../repositories/fakes/FakeUserMovieRepository';

import CreateUserMovieService from './CreateUserMovieService';
import CreateMovieService from '@modules/movies/services/CreateMovieService';
import AppError from '@shared/errors/AppError';
import Movie from '@modules/movies/infra/typeorm/entities/Movie';

let fakeUserMovieRepository: FakeUserMovieRepository;
let fakeMoviesRepository: FakeMoviesRepository;
let createUserMovie: CreateUserMovieService;
let createMovie: CreateMovieService;

let movie: Movie;

describe('Create User Movie', () => {
  beforeEach(async () => {
    fakeUserMovieRepository = new FakeUserMovieRepository();
    fakeMoviesRepository = new FakeMoviesRepository();

    createUserMovie = new CreateUserMovieService(
      fakeUserMovieRepository,
      fakeMoviesRepository,
    );

    createMovie = new CreateMovieService(fakeMoviesRepository);

    movie = await createMovie.execute({
      name: 'John filme',
      type: 'John type',
      actors: ['John Doe', 'John Three'],
      director: 'John Director',
    });
  });

  it('should be able to create a new user movie', async () => {
    const userMovie = await createUserMovie.execute({
      user_id: 'user_id',
      movie_id: movie.id,
      vote: 4,
    });

    expect(userMovie).toHaveProperty('vote');
    expect(userMovie.vote).toBe(4);
  });

  it('should be able to update a vote for a movie', async () => {
    await createUserMovie.execute({
      user_id: 'user_id',
      movie_id: movie.id,
      vote: 4,
    });

    const updateUserMovie = await createUserMovie.execute({
      user_id: 'user_id',
      movie_id: movie.id,
      vote: 0,
    });

    expect(updateUserMovie.vote).toBe(0);
  });

  it('should not be able to create a user vote with a movie deleted or inexistent', async () => {
    await expect(
      createUserMovie.execute({
        user_id: 'user_id',
        movie_id: 'movie_id',
        vote: 0,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
