import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { Utilisateur } from './entities/utilisateur.entity';
import { Repository } from 'typeorm';
@Injectable()
export class UtilisateurService {
  //Construction et rappel de la table (utilisateur)
  constructor(
    @InjectRepository(Utilisateur)
    private utilisateurRepository: Repository<Utilisateur>,
  ) {}

  // .Post pour la Création d'un utilisateur avec le rappel des éléments du DTO (interface)
  async create(
    createUtilisateurDto: CreateUtilisateurDto,
  ): Promise<Utilisateur> {
    return await this.utilisateurRepository.save(createUtilisateurDto);
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

    upDateUtilisateur.email = updateUtilisateurDto.email;
    upDateUtilisateur.pseudo = updateUtilisateurDto.pseudo;
    upDateUtilisateur.password = updateUtilisateurDto.password;
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
