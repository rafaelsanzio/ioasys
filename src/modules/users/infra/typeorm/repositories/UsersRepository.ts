import { getRepository, Repository, IsNull } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';
import IUpdateUserRoleDTO from '@modules/users/dtos/IUpdateUserRoleDTO';

import User from '../entities/User';
import AppError from '@shared/errors/AppError';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id, {
      where: { deleted_at: IsNull() },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email, deleted_at: IsNull() },
    });

    return user;
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({ name, email, password });

    await this.ormRepository.save(user);

    return user;
  }

  public async update({ id, name }: IUpdateUserDTO): Promise<User> {
    const user = await this.ormRepository.findOne(id, {
      where: { deleted_at: IsNull() },
    });

    if (!user) {
      throw new AppError('User does not found', 404);
    }

    user.name = name;

    await this.ormRepository.save(user);

    return user;
  }

  public async updateRole({ id, role }: IUpdateUserRoleDTO): Promise<User> {
    const user = await this.ormRepository.findOne(id, {
      where: { deleted_at: IsNull() },
    });

    if (!user) {
      throw new AppError('User does not found', 404);
    }

    user.role = role;

    await this.ormRepository.save(user);

    return user;
  }

  public async delete(id: string): Promise<User> {
    const user = await this.ormRepository.findOne(id);

    if (!user) {
      throw new AppError('User does not found', 404);
    }

    await this.ormRepository.update(id, { deleted_at: new Date() });

    user.deleted_at = new Date();

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
