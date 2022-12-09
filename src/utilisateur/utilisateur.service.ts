import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { Utilisateur } from './entities/utilisateur.entity';

@Injectable()
export class UtilisateurService {
  constructor(
    @InjectRepository(Utilisateur)
    private utilisateurRepository: Repository<Utilisateur>,
  ) {}

  async create(
    createUtilisateurDto: CreateUtilisateurDto,
  ): Promise<Utilisateur> {
    return await this.utilisateurRepository.save(createUtilisateurDto);
  }

  async findAll(): Promise<Utilisateur[]> {
    return await this.utilisateurRepository.find();
  }

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

  async update(
    idValue: string,
    updateUtilisateurDto: UpdateUtilisateurDto,
  ): Promise<Utilisateur> {
    const upDateUtilisateur = await this.utilisateurRepository.findOneBy({
      id: idValue,
    });
    (upDateUtilisateur.email = updateUtilisateurDto.email),
      (upDateUtilisateur.pseudo = updateUtilisateurDto.pseudo),
      (upDateUtilisateur.password = updateUtilisateurDto.password);

    return await this.utilisateurRepository.save(upDateUtilisateur);
  }

  async remove(id: string): Promise<string> {
    const result = await this.utilisateurRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`pas d'utilisateur trouvé avec l'id:${id}`);
    }
    return `This action removes a #${id} utilisateur`;
  }
}
