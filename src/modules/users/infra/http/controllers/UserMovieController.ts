import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateUserMovieService from '@modules/users/services/CreateUserMovieService';

export default class UserMovieController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { movie_id, vote } = request.body;

    const createUserMovie = container.resolve(CreateUserMovieService);

    const userMovie = await createUserMovie.execute({
      user_id: id,
      movie_id,
      vote,
    });

    return response.json(userMovie);
  }
}
