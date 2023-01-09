import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Categorie } from 'src/categorie/entities/categorie.entity';
import { Tache } from 'src/tache/entities/tache.entity';
import { Tag } from 'src/tag/entities/tag.entity';

//Ici je crée l'interface de la table utilisateur
export enum RoleEnumType {
  USER = 'user',
  ADMIN = 'admin',
}
@Entity()
export class Utilisateur {
  //Je génére la clé primaire
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  //Je crée les colonnes
  @Column({
    nullable: false,
    type: 'varchar',
    length: 50,
  })
  email: string; //Je nomme le nom de la colonne et la type

  @Column({
    nullable: false,
    type: 'varchar',
    length: 50,
  }) //je précise le varchar car pas en 255.
  pseudo: string;
  //TypeOrm est typé par default en varchar 255 si autre le préciser

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    nullable: true,
  })
  picture?: string;

  @Column({
    type: 'enum',
    enum: RoleEnumType,
    default: RoleEnumType.USER,
  })
  role: RoleEnumType;

  //Je relis les tables suivant leurs cardinalités et par les clés étrangéres.
  @OneToMany(() => Categorie, (categories) => categories.user_, {
    onDelete: 'CASCADE',
  })
  categories: Categorie[];

  @OneToMany(() => Tache, (task) => task.user_, { onDelete: 'CASCADE' })
  taches: Tache[];

  @OneToMany(() => Tag, (userTag) => userTag.userId, { onDelete: 'CASCADE' })
  tags: Tag[];
}
