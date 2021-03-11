import AppError from '@shared/errors/AppError';

import FakeMoviesRepository from '../repositories/fakes/FakeMoviesRepository';

import CreateMovieService from './CreateMovieService';
import ListMoviesService from './ListMoviesService';

let fakeMoviesRepository: FakeMoviesRepository;
let createMovie: CreateMovieService;
let listMovies: ListMoviesService;

describe('List Movies', () => {
  beforeEach(() => {
    fakeMoviesRepository = new FakeMoviesRepository();

    listMovies = new ListMoviesService(fakeMoviesRepository);
    createMovie = new CreateMovieService(fakeMoviesRepository);
  });

  it('should be able to list all movies', async () => {
    const movieOne = await createMovie.execute({
      name: 'New Film',
      type: 'New Terror',
      actors: ['New One', 'New Two'],
      director: 'New Director',
    });

    const movieTwo = await createMovie.execute({
      name: 'New Film 2',
      type: 'New Terror 2',
      actors: ['New One 2', 'New Two 2'],
      director: 'New Director 2',
    });

    const movies = [movieOne, movieTwo];

    const allMovies = await listMovies.execute({});

    expect(movies).toEqual(expect.arrayContaining(allMovies));
  });

  it('should be able to list movies filter by name', async () => {
    const movieOne = await createMovie.execute({
      name: 'New Film',
      type: 'New Terror',
      actors: ['New One', 'New Two'],
      director: 'New Director',
    });

    const movieTwo = await createMovie.execute({
      name: 'Film 2',
      type: 'Terror 2',
      actors: ['One 2', 'Two 2'],
      director: 'Director 2',
    });

    let movies = [movieOne, movieTwo];

    const allMovies = await listMovies.execute({ name: 'Film 2' });

    movies = movies.filter(movie => movie.name.match('Film 2'));

    expect(movies).toEqual(expect.arrayContaining(allMovies));
  });

  it('should be able to list movies filter by type', async () => {
    const movieOne = await createMovie.execute({
      name: 'New Film',
      type: 'New Terror',
      actors: ['New One', 'New Two'],
      director: 'New Director',
    });

    const movieTwo = await createMovie.execute({
      name: 'Film 2',
      type: 'Terror 2',
      actors: ['One 2', 'Two 2'],
      director: 'Director 2',
    });

    let movies = [movieOne, movieTwo];

    const allMovies = await listMovies.execute({ type: 'Terror 2' });

    movies = movies.filter(movie => movie.type.match('Terror 2'));

    expect(movies).toEqual(expect.arrayContaining(allMovies));
  });

  it('should be able to list movies filter by actor', async () => {
    const movieOne = await createMovie.execute({
      name: 'New Film',
      type: 'New Terror',
      actors: ['New One', 'New Two'],
      director: 'New Director',
    });

    const movieTwo = await createMovie.execute({
      name: 'Film 2',
      type: 'Terror 2',
      actors: ['One 2', 'Two 2'],
      director: 'Director 2',
    });

    let movies = [movieOne, movieTwo];

    const allMovies = await listMovies.execute({ actor: 'One 2' });

    movies = movies.filter(movie => movie.actors.includes('One 2'));

    expect(movies).toEqual(expect.arrayContaining(allMovies));
  });

  it('should be able to list movies filter by director', async () => {
    const movieOne = await createMovie.execute({
      name: 'New Film',
      type: 'New Terror',
      actors: ['New One', 'New Two'],
      director: 'New Director',
    });

    const movieTwo = await createMovie.execute({
      name: 'Film 2',
      type: 'Terror 2',
      actors: ['One 2', 'Two 2'],
      director: 'Director 2',
    });

    let movies = [movieOne, movieTwo];

    const allMovies = await listMovies.execute({ director: 'Director 2' });

    movies = movies.filter(movie => movie.director.match('Director 2'));

    expect(movies).toEqual(expect.arrayContaining(allMovies));
  });
});
