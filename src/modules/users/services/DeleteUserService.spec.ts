import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';
import DeleteUserService from './DeleteUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let deleteUser: DeleteUserService;

describe('Delete User', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    deleteUser = new DeleteUserService(fakeUsersRepository);
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to delete an user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      role: 'user',
      password: '123456',
    });

    const userDeleted = await deleteUser.execute(user.id);

    expect(userDeleted).toHaveProperty('deleted_at');
  });

  it('should not be able to delete an user that does not exists', async () => {
    await expect(deleteUser.execute('non-exist-id')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
