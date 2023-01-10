import { RoleEnumType } from 'src/utilisateur/entities/utilisateur.entity';

export class LoginDto {
  pseudo: string;
  email: string;
  password: string;
  role: RoleEnumType;
}
