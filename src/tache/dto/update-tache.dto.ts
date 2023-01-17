import { Categorie } from "src/categorie/entities/categorie.entity";

export class updateTacheDto {
  body: string;
  date_event: string;
  image: string;
  title: string;
  url: string;
  categorie: Categorie;
}
