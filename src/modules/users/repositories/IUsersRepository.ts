import User from '../infra/typeorm/entities/User';

import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IUpdateUserDTO from '../dtos/IUpdateUserDTO';
import IUpdateUserRoleDTO from '../dtos/IUpdateUserRoleDTO';

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  update(data: IUpdateUserDTO): Promise<User>;
  updateRole(data: IUpdateUserRoleDTO): Promise<User>;
  delete(id: string): Promise<User>;
  save(data: User): Promise<User>;
}
