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
    const findUserMovie = this.ormRepository.findOne({ user_id, movie_id });

    let userMovie: UserMovie;
    if (!findUserMovie) {
      userMovie = this.ormRepository.merge(findUserMovie, { vote });
    }

    userMovie = this.ormRepository.create({ user_id, movie_id, vote });

    await this.ormRepository.save(userMovie);

    return userMovie;
  }

  public async save(userMovie: UserMovie): Promise<UserMovie> {
    return this.ormRepository.save(userMovie);
  }
}

export default UserMovieRepository;
