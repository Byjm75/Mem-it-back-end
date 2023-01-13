import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Categorie } from 'src/categorie/entities/categorie.entity';
import { Tache } from 'src/tache/entities/tache.entity';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;




}