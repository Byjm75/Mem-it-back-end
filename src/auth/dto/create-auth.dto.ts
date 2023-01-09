import { RoleEnumType } from "src/utilisateur/entities/utilisateur.entity";

export class CreateAuthDto {
  email: string;
  pseudo: string;
  password: string;
  picture: string;
  role: RoleEnumType;
}
