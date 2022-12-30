import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
import { Repository } from 'typeorm';
import { CreateTacheDto } from './dto/create-tache.dto';
import { UpdateTacheDto } from './dto/update-tache.dto';
import * as bcrypt from 'bcrypt';
import { Tache } from './entities/tache.entity';

@Injectable()
export class TacheService {
  constructor(
    @InjectRepository(Tache)
    private TacheRepository: Repository<Tache>,
    @InjectRepository(Utilisateur)
    private UtilisateurRepository: Repository<Utilisateur>,
  ) {}

  async create(
    createTacheDto: CreateTacheDto,
    utilisateur: Utilisateur,
  ): Promise<Tache | string> {
    const { title, date_creation } = createTacheDto;
    const existAlready = await this.TacheRepository.findOneBy({ title });
    console.log('Tache Existtttttttttt', existAlready);
    if (existAlready) {
      return `Vous avez déja crée la Tâche avec le titre:${title} ${date_creation}`;
    }
    const newTache = await this.TacheRepository.create({
      ...createTacheDto,
      user_: utilisateur,
    });
    return await this.TacheRepository.save(newTache);
    // Cette action crée un nouveau mémo;
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

  async findOne(title: string, utilisateur: Utilisateur): Promise<Tache> {
    const taskFound = await this.TacheRepository.findOneBy({
      title,
      user_: utilisateur,
    });
    if (!taskFound) {
      throw new NotFoundException(`Tâche non trouvée avec le titre:${title}`);
    }
    return taskFound;
  }

  async update(
    title: string,
    updateTacheDto: UpdateTacheDto,
    utilisateur: Utilisateur,
  ): Promise<Tache | string> {
    const noExist = await this.TacheRepository.findOneBy({
      title,
    });
    if (!noExist) {
      throw new NotFoundException(`Tâche non trouvée avec le titre:${title}`);
    }
    const tacheToUpdate = await this.TacheRepository.findOneBy({
      title,
      user_: utilisateur,
    });
    (tacheToUpdate.body = updateTacheDto.body),
      (tacheToUpdate.date_event = updateTacheDto.date_event),
      (tacheToUpdate.image = updateTacheDto.image),
      (tacheToUpdate.title = updateTacheDto.title),
      (tacheToUpdate.url = updateTacheDto.url);
    return await this.TacheRepository.save(tacheToUpdate);
  }

  async remove(
    title: string,
    utilisateur: Utilisateur,
  ): Promise<Tache | string> {
    const result = await this.TacheRepository.delete({
      title,
      user_: utilisateur,
    });
    if (result.affected === 0) {
      throw new NotFoundException(`La tache:${title} n'a pas été trouvé`);
    }
    return `Cette action entraine la suppresion de la tache:${title} `;
  }
}
