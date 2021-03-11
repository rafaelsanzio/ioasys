import AppError from '@shared/errors/AppError';

import FakeMoviesRepository from '../repositories/fakes/FakeMoviesRepository';

import CreateMovieService from './CreateMovieService';
import UpdateMovieService from './UpdateMovieService';

let fakeMoviesRepository: FakeMoviesRepository;
let createMovie: CreateMovieService;
let updateMovie: UpdateMovieService;

describe('Update Movie', () => {
  beforeEach(() => {
    fakeMoviesRepository = new FakeMoviesRepository();

    updateMovie = new UpdateMovieService(fakeMoviesRepository);
    createMovie = new CreateMovieService(fakeMoviesRepository);
  });

  it('should be able to update a movie', async () => {
    const newMovie = await createMovie.execute({
      name: 'New Film',
      type: 'New Terror',
      actors: ['New One', 'New Two'],
      director: 'New Director',
    });

    const movie = await updateMovie.execute({
      id: newMovie.id,
      name: 'John Film',
      type: 'John Terror',
      actors: ['John One', 'John Two'],
      director: 'John Director',
    });

    expect(movie.name).toBe('John Film');
    expect(movie.type).toBe('John Terror');
    expect(['John One', 'John Two']).toEqual(
      expect.arrayContaining(movie.actors),
    );
    expect(movie.director).toBe('John Director');
  });

  it('should not be able to update a movie that does not exists', async () => {
    await expect(
      updateMovie.execute({
        id: 'non-exist-id',
        name: 'John Film',
        type: 'John Terror',
        actors: ['John One', 'Jogn Two'],
        director: 'John Director',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
