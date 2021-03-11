import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ id, name, email }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findById(id);

    if (!checkUserExists) {
      throw new AppError('User does not found', 404);
    }

    const checkEmailUserExists = await this.usersRepository.findByEmail(email);

    if (checkEmailUserExists) {
      throw new AppError('This email has already registered', 400);
    }

    const user = await this.usersRepository.update({
      id,
      name,
      email,
    });

    return user;
  }
}

export default UpdateUserService;
