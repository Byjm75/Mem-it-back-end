import { RoleEnumType } from "src/utilisateur/entities/utilisateur.entity";

// Ici la class et propriétés nécessaire à la création d'un compte
export class CreateAuthDto {
  email: string;
  pseudo: string;
  password: string;
  picture: string;
  role: RoleEnumType;
}
