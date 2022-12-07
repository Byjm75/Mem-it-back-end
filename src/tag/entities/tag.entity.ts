import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tache } from 'src/tache/entities/tache.entity';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 50,
  })
  title: string;

  @ManyToMany(() => Tache)
  @JoinTable()
  taches: Tache[];

  @ManyToOne(() => Utilisateur, (tags) => tags.user_, { nullable: false })
  user: Utilisateur;
}
