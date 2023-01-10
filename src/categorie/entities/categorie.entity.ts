import { Tache } from 'src/tache/entities/tache.entity';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Categorie {
  @PrimaryGeneratedColumn('uuid') // La fonction uuid est une dependencie et transforme l'Id de type number en type string.
  id?: string;

  

  @Column({
    nullable: false, // Ici le typage "nullable"= false indique que l'utilisateur doit obligatoirement remplire le title.
    type: 'varchar',
    length: 50,
  })
  title: string;

  @Column({
    nullable: true,
  })
  image: string;

  @Column({ default: false, nullable: false })
  favoris: boolean;

  @ManyToOne(() => Utilisateur, (user) => user.categories, {
    nullable: false,
    onDelete: 'CASCADE',
  }) //Cela permet de rendre nullable la clé primaire, ici user_id
  user_: Utilisateur;

  @OneToMany(() => Tache, (taches) => taches.categorie_, {
    onDelete: 'CASCADE',
  })
  taches: Tache[];
}
