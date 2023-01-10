import { RoleEnumType } from "../entities/utilisateur.entity";

//Ici je type et implante les éléments nécessaire à la création d'un utilisteur nb: id va se générer tout seul.
export class CreateUtilisateurDto {
  email: string;
  pseudo: string;
  password: string;
  picture: string;
  role: RoleEnumType;
}
