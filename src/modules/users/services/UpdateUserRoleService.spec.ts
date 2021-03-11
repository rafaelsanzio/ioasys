import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import CreateUserService from './CreateUserService';
import UpdateUserRoleService from './UpdateUserRoleService';

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;
let fakeHashProvider: FakeHashProvider;
let updateUserRole: UpdateUserRoleService;

describe('Update User Role', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateUserRole = new UpdateUserRoleService(fakeUsersRepository);
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to update an user role', async () => {
    const newUser = await createUser.execute({
      name: 'New Doe',
      email: 'newdoe@mail.com',
      role: 'user',
      password: '123456',
    });

    const user = await updateUserRole.execute({
      id: newUser.id,
      role: 'admin',
    });

    expect(user.role).toBe('admin');
  });

  it('should not be able to update role of user that does not exists', async () => {
    await expect(
      updateUserRole.execute({
        id: 'non-exist-id',
        role: 'user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
