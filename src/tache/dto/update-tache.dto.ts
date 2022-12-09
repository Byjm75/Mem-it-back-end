import { PartialType } from '@nestjs/mapped-types';
import { CreateTacheDto } from './create-tache.dto';

export class UpdateTacheDto extends PartialType(CreateTacheDto) {
    body: text;
    categorie_: string;
    date_event: string;
    image: string;
    title: string;
    url: string;
    
}
