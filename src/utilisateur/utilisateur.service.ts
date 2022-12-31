import { Injectable, NotFoundException } from '@nestjs/common';
<<<<<<< HEAD
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { Utilisateur } from './entities/utilisateur.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class UtilisateurService {
 constructor(
      @InjectRepository(Utilisateur)
      private utilisateurRepository: Repository<Utilisateur>,
    ) { }
=======
=======
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { Utilisateur } from './entities/utilisateur.entity';
import { Repository, Table } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UtilisateurService {
  constructor(
    @InjectRepository(Utilisateur)
    private utilisateurRepository: Repository<Utilisateur>,
  ) {}

>>>>>>> a71bb9d97d5db50db464254cb6cc0554416216e5
  //Construction et rappel de la table (utilisateur)

  // .Post pour la Création d'un utilisateur avec le rappel des éléments du DTO (interface)
  async create(
    createUtilisateurDto: CreateUtilisateurDto,
  ): Promise<Utilisateur> {
    //Construction et rappel de la table (utilisateur)
    return await this.utilisateurRepository.save(createUtilisateurDto);
    //Construction et rappel de la table (utilisateur)
  }

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

  //.patch pour modifier l'ensemble ou un élément de l'interface
  async update(
    idValue: string,
    updateUtilisateurDto: UpdateUtilisateurDto,
  ): Promise<Utilisateur> {
    const upDateUtilisateur = await this.utilisateurRepository.findOneBy({
      id: idValue,
    });
    const salt = await bcrypt.genSalt();
    let hashedPassword = await bcrypt.hash(upDateUtilisateur.password, salt);
    upDateUtilisateur.password = hashedPassword;
    upDateUtilisateur.email = updateUtilisateurDto.email;
    upDateUtilisateur.pseudo = updateUtilisateurDto.pseudo;
    hashedPassword = updateUtilisateurDto.password;
    upDateUtilisateur.picture = updateUtilisateurDto.picture;

    return await this.utilisateurRepository.save(upDateUtilisateur);
  }

  //.delete pour supprimer un utilisateur via son id
  async remove(id: string): Promise<string> {
    const result = await this.utilisateurRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`pas d'utilisateur trouvé avec l'id:${id}`);
    }
    return `This action removes a #${id} utilisateur`;
  }
  
}
