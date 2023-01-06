import { Injectable, NotFoundException } from '@nestjs/common';
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
  ) {}

  // pour admin
  async findAllUser(): Promise<Utilisateur[]> {
    const userFound = await this.utilisateurRepository.find();
    if (!userFound) {
      throw new NotFoundException(`Utilisateur non trouvée`);
    }
    return userFound;
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
}
