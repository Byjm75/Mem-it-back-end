import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Categorie } from 'src/categorie/entities/categorie.entity';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';

@Entity()
export class Tache {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 50,
  })
  title: string;

  @CreateDateColumn()
  date_creation: Date;

  @Column({
    nullable: true,
    type: 'date',
  })
  date_event: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  body: string;

  @Column({
    nullable: true,
  })
  image: string;

  @Column({
    nullable: true,
  })
  url: string;

  @ManyToOne(() => Categorie, (categories) => categories.taches, {
    onDelete: 'CASCADE',
  })
  categorie_: Categorie;

  @ManyToOne(() => Utilisateur, (user_) => user_.id, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  user_: Utilisateur;
}
