import { v4 } from 'uuid';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUpdateUserRoleDTO from '@modules/users/dtos/IUpdateUserRoleDTO';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(user => user.id === id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(user => user.email === email);

    return user;
  }

  public async create({
    name,
    email,
    role,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: v4() }, { name, email, role, password });

    this.users.push(user);

    return user;
  }

  public async update({ id, name, email }: IUpdateUserDTO): Promise<User> {
    const user = this.users.find(user => user.id === id);

    if (!user) {
      throw new AppError('User does not found', 404);
    }

    const checkEmailUserExists = this.users.find(user => user.email === email);

    if (checkEmailUserExists) {
      throw new AppError('This email has already registered', 400);
    }

    user.name = name;
    user.email = email;

    return user;
  }

  public async updateRole({ id, role }: IUpdateUserRoleDTO): Promise<User> {
    const user = this.users.find(user => user.id === id);

    if (!user) {
      throw new AppError('User does not found', 404);
    }

    user.role = role;

    return user;
  }

  public async delete(id: string): Promise<User> {
    const user = this.users.find(user => user.id === id);

    if (!user) {
      throw new AppError('User does not found', 404);
    }

    user.deleted_at = new Date();

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }
}

export default FakeUsersRepository;
