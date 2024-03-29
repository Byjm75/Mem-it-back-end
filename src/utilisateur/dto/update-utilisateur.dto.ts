import { PartialType } from '@nestjs/mapped-types';
import { RoleEnumType } from '../entities/utilisateur.entity';
import { CreateUtilisateurDto } from './create-utilisateur.dto';

//Ici je type et implante les éléments nécessaire à la modification d'un utilisteur nb: id va se générer tout seul.
export class UpdateUtilisateurDto extends PartialType(CreateUtilisateurDto) {
  email: string;
  pseudo: string;
  password: string;
  picture: string;
  hashedPassword: string;
  role: RoleEnumType;
}
