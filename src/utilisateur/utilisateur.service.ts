import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { Utilisateur } from './entities/utilisateur.entity';
import { Repository, UpdateResult } from 'typeorm';
@Injectable()
export class UtilisateurService {
  constructor(
    @InjectRepository(Utilisateur)
    private UtilisateurRepository: Repository<Utilisateur>,
  ) {}
  async create(
    createUtilisateurDto: CreateUtilisateurDto,
  ): Promise<Utilisateur> {
    return await this.UtilisateurRepository.save(createUtilisateurDto);
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
