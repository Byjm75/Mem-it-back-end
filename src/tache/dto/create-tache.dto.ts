import { Categorie } from 'src/categorie/entities/categorie.entity';

export class CreateTacheDto {
  body: string;
  date_event: string;
  image: string;
  title: string;
  url: string;
  categorie_: Categorie;
}
