import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

import UpdateUserService from './UpdateUserService';

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;
let fakeHashProvider: FakeHashProvider;
let updateUser: UpdateUserService;

describe('Update User', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateUser = new UpdateUserService(fakeUsersRepository);
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to update an user', async () => {
    const newUser = await createUser.execute({
      name: 'New Doe',
      email: 'newdoe@mail.com',
      role: 'user',
      password: '123456',
    });

    const user = await updateUser.execute({
      id: newUser.id,
      name: 'John Doe',
      email: 'johndoe@mail.com',
    });

    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('johndoe@mail.com');
  });

  it('should not be able to update an user that does not exists', async () => {
    await expect(
      updateUser.execute({
        id: 'non-exist-id',
        name: 'John Doe',
        email: 'johndoe@mail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update an user that another email already exists', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      role: 'user',
      password: '123456',
    });

    await expect(
      updateUser.execute({
        id: user.id,
        name: 'John Doe',
        email: 'johndoe@mail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
