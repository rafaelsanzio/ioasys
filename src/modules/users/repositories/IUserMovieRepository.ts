import UserMovie from '../infra/typeorm/entities/UserMovie';

import ICreateUserMovieDTO from '../dtos/ICreateUserMovieDTO';

export default interface IUserMovieRepository {
  create(data: ICreateUserMovieDTO): Promise<UserMovie>;
  save(data: UserMovie): Promise<UserMovie>;
}
