import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
//import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { Utilisateur } from './entities/utilisateur.entity';
import { Repository, Table } from 'typeorm';
import { Tache } from 'src/tache/entities/tache.entity';
import { Categorie } from 'src/categorie/entities/categorie.entity';
@Injectable()
export class UtilisateurService {
  constructor(
    @InjectRepository(Utilisateur)
    private utilisateurRepository: Repository<Utilisateur>,
    @InjectRepository(Tache)
    private tacheRepository: Repository<Tache>,
  ) {}

  //Construction et rappel de la table (utilisateur)

  // .Post pour la Création d'un utilisateur avec le rappel des éléments du DTO (interface)
  // async create(
  //   createUtilisateurDto: CreateUtilisateurDto,
  // ): Promise<Utilisateur> {
  //   return await this.utilisateurRepository.save(createUtilisateurDto);
  // }

  // .get pour trouver l'ensemble des utilisateurs contenus ds la table utilisateur
  async findAll(): Promise<Utilisateur[]> {
    return await this.utilisateurRepository.find();
  }

  //.get pour trouver un utilisateur via son ID
  async findOne(idValue: string): Promise<Utilisateur> {
    const utilisateurFound = await this.utilisateurRepository.findOneBy({
      id: idValue,
    });
    if (!utilisateurFound) {
      throw new NotFoundException(
        `pas d'utilisateur trouvé avec l'id:${idValue}`,
      );
    }
    return utilisateurFound;
  }

  //Récupérer toutes les tâches créées par un user

  // async findAllTaskCreatedByUser(utilisateur: Utilisateur): Promise<Tache[]> {
  //   //vérifier si userId correspond bien à un utilisateur
  //   const allTaches = await this.tacheRepository.find({});
  //   return allTaches;
  // }

  // async findAllTagCreatedByUser(userId: string) {
  // vérifier si userId correspond bien à un utilisateur
  // const allTaches = await this.tacheRepository.find({
  //   user_: {
  //     id: userId,
  //   }
  // });
  //   const allTags = await this.tacheRepository
  //     .createQueryBuilder('tag')
  //     .leftJoinAndSelect('tag.user_', 'user')
  //     .leftJoinAndSelect('tache.user_', 'tacheuser')
  //     .where('user.id = :id', { id: userId })
  //     .getMany();
  //   console.log('taches créées par le user : ', allTaches);
  //   return allTaches;
  // }

  //.patch pour modifier l'ensemble ou un élément de l'interface
  async update(
    id: string,
    updateUtilisateurDto: UpdateUtilisateurDto,
  ): Promise<Utilisateur | string> {
    const noExist = await this.utilisateurRepository.findOneBy({ id }); //!!!Ne prend pas erreur en compte ?????
    if (!noExist) {
      throw new NotFoundException(
        `L'utilisateur n'a pas été trouvé avec l'id:${id}`,
      );
    }
    const upDateUtilisateur = await this.utilisateurRepository.findOneBy({
      id: id,
    });
    (upDateUtilisateur.email = updateUtilisateurDto.email),
      (upDateUtilisateur.pseudo = updateUtilisateurDto.pseudo),
      (upDateUtilisateur.password = updateUtilisateurDto.password),
      (upDateUtilisateur.picture = updateUtilisateurDto.picture);
    return await this.utilisateurRepository.save(upDateUtilisateur);
  }

  //.delete pour supprimer un utilisateur via son id
  //!!!!NE FONCTIONNE PAS!!!!
  // async remove(
  //   id: string,
  //   utilisateur: Utilisateur,
  // ): Promise<Utilisateur | string> {
  //   const result = await this.utilisateurRepository.delete({
  //     id,
  //     user_: utilisateur,
  //   });
  //   if (result.affected === 0) {
  //     throw new NotFoundException(`pas d'utilisateur trouvé avec l'id:${id}`);
  //   }
  //   return `Cette action a supprmé l'utilisateur #${id}`;
  // }
}
