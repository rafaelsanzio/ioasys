import FakeMoviesRepository from '../repositories/fakes/FakeMoviesRepository';

import CreateMovieService from './CreateMovieService';

let fakeMoviesRepository: FakeMoviesRepository;
let createMovie: CreateMovieService;

describe('Create Movie', () => {
  beforeEach(() => {
    fakeMoviesRepository = new FakeMoviesRepository();

    createMovie = new CreateMovieService(fakeMoviesRepository);
  });

  it('should be able to create a new movie', async () => {
    const movie = await createMovie.execute({
      name: 'John filme',
      type: 'John type',
      actors: ['John Doe', 'John Three'],
      director: 'John Director',
    });

    expect(movie).toHaveProperty('id');
  });
});
