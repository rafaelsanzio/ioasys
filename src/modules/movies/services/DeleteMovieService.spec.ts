import AppError from '@shared/errors/AppError';

import FakeMoviesRepository from '../repositories/fakes/FakeMoviesRepository';

import CreateMovieService from './CreateMovieService';
import DeleteMovieService from './DeleteMovieService';

let fakeMoviesRepository: FakeMoviesRepository;
let createMovie: CreateMovieService;
let deleteMovie: DeleteMovieService;

describe('Delete Movie', () => {
  beforeEach(() => {
    fakeMoviesRepository = new FakeMoviesRepository();

    deleteMovie = new DeleteMovieService(fakeMoviesRepository);
    createMovie = new CreateMovieService(fakeMoviesRepository);
  });

  it('should be able to delete a movie', async () => {
    const movie = await createMovie.execute({
      name: 'John filme',
      type: 'John type',
      actors: ['John Doe', 'John Three'],
      director: 'John Director',
    });

    const movieDeleted = await deleteMovie.execute(movie.id);

    expect(movieDeleted).toHaveProperty('deleted_at');
  });

  it('should not be able to delete a movie that does not exists', async () => {
    await expect(deleteMovie.execute('non-exist-id')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
