import AppError from '@shared/errors/AppError';
import IGetMovieDTO from '../dtos/IGetMovieDTO';

import FakeMoviesRepository from '../repositories/fakes/FakeMoviesRepository';

import CreateMovieService from './CreateMovieService';
import GetMovieService from './GetMovieService';

let fakeMoviesRepository: FakeMoviesRepository;
let createMovie: CreateMovieService;
let getMovie: GetMovieService;

describe('Get Movie', () => {
  beforeEach(() => {
    fakeMoviesRepository = new FakeMoviesRepository();

    getMovie = new GetMovieService(fakeMoviesRepository);
    createMovie = new CreateMovieService(fakeMoviesRepository);
  });

  it('Should be able to get a movie', async () => {
    const movieOne = await createMovie.execute({
      name: 'New Film',
      type: 'New Terror',
      actors: ['New One', 'New Two'],
      director: 'New Director',
    });

    const movie = await getMovie.execute(movieOne.id);

    const movieTwo: IGetMovieDTO = {
      avarage_votes: 0,
      ...movieOne,
    };

    expect(movie).toEqual(movieTwo);
  });

  it('Should not be able to get a movie that does not exists', async () => {
    await expect(getMovie.execute('non-exist-id')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
