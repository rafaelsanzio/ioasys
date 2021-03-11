import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';

import IUsersRepository from '../repositories/IUsersRepository';
import IUpdateUserRoleDTO from '../dtos/IUpdateUserRoleDTO';

@injectable()
class UpdateUserRoleService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ id, role }: IUpdateUserRoleDTO): Promise<User> {
    const checkUserExists = await this.usersRepository.findById(id);

    if (!checkUserExists) {
      throw new AppError('User does not found', 404);
    }

    const user = await this.usersRepository.updateRole({
      id,
      role,
    });

    return user;
  }
}

export default UpdateUserRoleService;
