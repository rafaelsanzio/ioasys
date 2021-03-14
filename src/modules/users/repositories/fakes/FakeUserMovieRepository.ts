import UserMovie from '@modules/users/infra/typeorm/entities/UserMovie';

import ICreateUserMovieDTO from '@modules/users/dtos/ICreateUserMovieDTO';

import IUserMovieRepository from '../IUserMovieRepository';

export default class FakeUserMovieRepository implements IUserMovieRepository {
  private userMovies: UserMovie[] = [];

  public async create({
    user_id,
    movie_id,
    vote,
  }: ICreateUserMovieDTO): Promise<UserMovie> {
    const findUserMovie = this.userMovies.find(
      userMovie =>
        userMovie.user_id === user_id && userMovie.movie_id === movie_id,
    );

    if (findUserMovie) {
      findUserMovie.vote = vote;
      return findUserMovie;
    }

    const userMovie = new UserMovie();

    Object.assign(userMovie, { user_id, movie_id, vote });

    this.userMovies.push(userMovie);

    return userMovie;
  }

  public async save(userMovie: UserMovie): Promise<UserMovie> {
    const findIndex = this.userMovies.findIndex(
      findUser =>
        findUser.user_id === userMovie.user_id &&
        findUser.movie_id === userMovie.movie_id,
    );

    this.userMovies[findIndex] = userMovie;

    return userMovie;
  }
}
