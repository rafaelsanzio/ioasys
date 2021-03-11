import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import UpdateUserService from '@modules/users/services/UpdateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';
import UpdateUserRoleService from '@modules/users/services/UpdateUserRoleService';

export default class UsersController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { name, email } = request.body;

    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute({
      id,
      name,
      email,
    });

    return response.json(classToClass(user));
  }

  public async updateRole(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    const { role } = request.body;

    const updateUserRole = container.resolve(UpdateUserRoleService);

    const user = await updateUserRole.execute({
      id,
      role,
    });

    return response.json(classToClass(user));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteUser = container.resolve(DeleteUserService);

    const user = await deleteUser.execute(id);

    return response.json(classToClass(user));
  }
}
