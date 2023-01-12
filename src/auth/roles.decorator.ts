import { SetMetadata } from '@nestjs/common';
import { RoleEnumType } from 'src/utilisateur/entities/utilisateur.entity';

//Début de la mise en place de sécurité d'un role (user, admin)
export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleEnumType[]) =>
  SetMetadata(ROLES_KEY, roles);
