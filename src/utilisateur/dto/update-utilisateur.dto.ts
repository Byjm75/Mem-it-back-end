//Ici je type et implante les éléments nécessaire à la modification d'un utilisteur nb: id va se générer tout seul.

import { PartialType } from '@nestjs/mapped-types';
import { CreateUtilisateurDto } from './create-utilisateur.dto';

export class UpdateUtilisateurDto extends PartialType(CreateUtilisateurDto) {
  email: string;
  pseudo: string;
  password: string;
  picture: string;
  hashedPassword: string;
}
