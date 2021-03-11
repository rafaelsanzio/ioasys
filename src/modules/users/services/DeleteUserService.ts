import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';

import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(id: string): Promise<User> {
    const checkUserExists = await this.usersRepository.findById(id);

    if (!checkUserExists) {
      throw new AppError('User does not exists', 494);
    }

    const user = await this.usersRepository.delete(id);

    return user;
  }
}

export default DeleteUserService;
