import { CreateUtilisateurDto } from './create-utilisateur.dto';

//Ici je type et implante les éléments nécessaire à la modification d'un utilisteur nb: id va se générer tout seul.

export class UpdateUtilisateurDto {
  email: string;
  pseudo: string;
}
