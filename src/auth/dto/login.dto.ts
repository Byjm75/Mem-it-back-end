import { RoleEnumType } from 'src/utilisateur/entities/utilisateur.entity';

// Ici la class et propriétés nécessaire à la connexion du compte utilisateur ou admin
export class LoginDto {
  pseudo: string;
  email: string;
  password: string;
  role: RoleEnumType;
}
