import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { Utilisateur } from './entities/utilisateur.entity';
import { Repository, UpdateResult } from 'typeorm';
@Injectable()
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

  findAll() {
    return `This action returns all utilisateur`;
  }

  findOne(id: number) {
    return `This action returns a #${id} utilisateur`;
  }

  update(id: number, updateUtilisateurDto: UpdateUtilisateurDto) {
    return `This action updates a #${id} utilisateur`;
  }

  remove(id: number) {
    return `This action removes a #${id} utilisateur`;
  }
}
