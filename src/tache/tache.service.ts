import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
import { Repository } from 'typeorm';
import { CreateTacheDto } from './dto/create-tache.dto';
import * as bcrypt from 'bcrypt';
import { Tache } from './entities/tache.entity';
import { updateTacheDto } from './dto/update-tache.dto';

@Injectable()
export class TacheService {
  constructor(
    @InjectRepository(Tache)
    private TacheRepository: Repository<Tache>,
  ) {}

  async create(
    createTacheDto: CreateTacheDto,
    utilisateur: Utilisateur,
  ): Promise<Tache | string> {
    const { title } = createTacheDto;
    const query = this.TacheRepository.createQueryBuilder();
    query.where({ title }).andWhere({ user_: utilisateur });
    const existAlready = await query.getOne();

    if (existAlready !== null) {
      return `Vous avez déja crée la Tâche avec le titre:${title} ${utilisateur}`;
    }
    const newTache = await this.TacheRepository.create({
      ...createTacheDto,
      user_: utilisateur,
    });
    return await this.TacheRepository.save(newTache);
  }

  // les tâches créées par un utilsateur
  async findAllByUser(utilisateur: Utilisateur): Promise<Tache[]> {
    const taskFound = await this.TacheRepository.findBy({
      user_: utilisateur,
    });
    if (!taskFound) {
      throw new NotFoundException(`Tâche non trouvée`);
    }
    return taskFound;
  }

  async findOne(
    idValue: string,
    utilisateur: Utilisateur,
  ): Promise<Tache | string> {
    const taskFound = await this.TacheRepository.findOneBy({
      id: idValue,
      user_: utilisateur,
    });
    if (!taskFound) {
      throw new NotFoundException(`Tâche non trouvée avec l'id:${idValue}`);
    }
    return taskFound;
  }

  async update(
    idValue: string,
    updateTacheDto: updateTacheDto,
    utilisateur: Utilisateur,
  ): Promise<Tache | string> {
    console.log(idValue);
    console.log('Utilisateurrrrrrrrrrrrrr', utilisateur);
    const { title } = updateTacheDto;
    const query = this.TacheRepository.createQueryBuilder();
    query.where({ title }).andWhere({ user_: utilisateur });
    const existAlready = await query.getOne();
    console.log('updateeeeeee', existAlready);

    if (existAlready !== null) {
      return `La tâche ${title} existe déjà avec l'utilisateur ${utilisateur}`;
    }
    const tacheToUpdate = await this.TacheRepository.findOneBy({
      id: idValue,
      user_: utilisateur,
    });
    if (!tacheToUpdate) {
      throw new NotFoundException(`Tâche non trouvée avec le titre:${idValue}`);
    }

    try {
      if (updateTacheDto.body !== null) {
        tacheToUpdate.body = updateTacheDto.body;
      }
      if (updateTacheDto.date_event !== null) {
        tacheToUpdate.date_event = updateTacheDto.date_event;
      }
      if (updateTacheDto.image !== null) {
        tacheToUpdate.image = updateTacheDto.image;
      }
      if (updateTacheDto.title !== null) {
        tacheToUpdate.title = updateTacheDto.title;
      }
      if (updateTacheDto.url !== null) {
        tacheToUpdate.url = updateTacheDto.url;
      }
      return await this.TacheRepository.save(tacheToUpdate);
    } catch {
      throw new Error('autre erreur tâche');
    }
  }

  async remove(
    idValue: string,
    utilisateur: Utilisateur,
  ): Promise<Tache | string> {
    const result = await this.TacheRepository.delete({
      user_: utilisateur,
      id: idValue,
    });
    if (result.affected === 0) {
      throw new NotFoundException(`La tache:${idValue} n'a pas été trouvé`);
    }
    return `Cette action entraine la suppresion de la tache:${idValue} `;
  }
}
