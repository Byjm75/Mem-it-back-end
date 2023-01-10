import { SetMetadata } from '@nestjs/common';
import { RoleEnumType } from 'src/utilisateur/entities/utilisateur.entity';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleEnumType[]) =>
  SetMetadata(ROLES_KEY, roles);
