import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateMovieService from '@modules/movies/services/CreateMovieService';
import DeleteMovieService from '@modules/movies/services/DeleteMovieService';
import UpdateMovieService from '@modules/movies/services/UpdateMovieService';
import ListMoviesServices from '@modules/movies/services/ListMoviesService';
import GetMovieServices from '@modules/movies/services/GetMovieService';

export default class MovieController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, type, actors, director } = request.body;

    const createMovie = container.resolve(CreateMovieService);

    const movie = await createMovie.execute({
      name,
      type,
      actors,
      director,
    });

    return response.json(movie);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteMovie = container.resolve(DeleteMovieService);

    const movie = await deleteMovie.execute(id);

    return response.json(movie);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, type, actors, director } = request.body;

    const updateMovie = container.resolve(UpdateMovieService);

    const movie = await updateMovie.execute({
      id,
      name,
      type,
      actors,
      director,
    });

    return response.json(movie);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const { name, type, actor, director } = request.query;

    const updateMovie = container.resolve(ListMoviesServices);

    const movie = await updateMovie.execute({
      name,
      type,
      actor,
      director,
    });

    return response.json(movie);
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getMovie = container.resolve(GetMovieServices);

    const movie = await getMovie.execute(id);

    return response.json(movie);
  }
}
