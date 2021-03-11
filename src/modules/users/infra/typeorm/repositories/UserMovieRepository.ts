import { getRepository, Repository, Not, IsNull } from 'typeorm';

import UserMovie from '../entities/UserMovie';

import IUserMovieRepository from '@modules/users/repositories/IUserMovieRepository';
import ICreateUserMovieDTO from '@modules/users/dtos/ICreateUserMovieDTO';

class UserMovieRepository implements IUserMovieRepository {
  private ormRepository: Repository<UserMovie>;

  constructor() {
    this.ormRepository = getRepository(UserMovie);
  }

  public async create({
    user_id,
    movie_id,
    vote,
  }: ICreateUserMovieDTO): Promise<UserMovie> {
    const query = `
      INSERT INTO user_movie VALUES ($1, $2, $3) 
      ON CONFLICT(user_id, movie_id) DO UPDATE SET vote = $3 
      RETURNING *`;

    const userMovie = await this.ormRepository.query(query, [
      user_id,
      movie_id,
      vote,
    ]);

    return userMovie;
  }

  public async save(userMovie: UserMovie): Promise<UserMovie> {
    return this.ormRepository.save(userMovie);
  }
}

export default UserMovieRepository;
