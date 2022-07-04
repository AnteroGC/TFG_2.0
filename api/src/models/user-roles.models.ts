import { RolesBuilder } from 'nest-access-control';

export enum UserRoles {
  Admin = 'Admin',
  Reader = 'Reader',
  NoRegister = 'NoRegister',
}

export const roles: RolesBuilder = new RolesBuilder();

roles
  .grant(UserRoles.NoRegister)
  .readAny(['post'])
  .grant(UserRoles.Reader)
  .createOwn(['post'])
  .deleteOwn('post')
  .readAny(['post'])
  .grant(UserRoles.Admin)
  .extend(UserRoles.Reader)
  .updateAny(['post'])
  .createAny(['post'])
  .deleteAny(['post']);