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
    const { title } = createTacheDto;
    const existAlready = await this.TacheRepository.findBy({
      title,
      user_: utilisateur,
    });
    console.log('Tache Existtttttttttt', existAlready);
    if (existAlready.length > 0) {
      return `Vous avez déja crée la Tâche avec le titre:${title} ${utilisateur}`;
    }
    const newTache = await this.TacheRepository.create({
      ...createTacheDto,
      user_: utilisateur,
    });
    return await this.TacheRepository.save(newTache);
  }

  async findAll(): Promise<Tache[]> {
    return await this.TacheRepository.find();
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
      throw new NotFoundException(`Tâche non trouvée avec le titre:${idValue}`);
    }
    return taskFound;
  }

  async update(
    idValue: string,
    updateTacheDto: UpdateTacheDto,
    utilisateur: Utilisateur,
  ): Promise<Tache | string> {
    const upDateTache = await this.TacheRepository.findOneBy({
      id: idValue,
      user_: utilisateur,
    });
    console.log(upDateTache);
    const { body, date_event, image, title, url } = updateTacheDto;
    const titleExist = await this.TacheRepository.findBy({
      title,
    });
    console.log(titleExist);
    if (titleExist.length > 0) {
      throw new Error(`La tâche ${title} existe déjà`);
    }
    try {
      if (updateTacheDto.body) {
        upDateTache.body = updateTacheDto.body;
      }
      if (updateTacheDto.date_event) {
        upDateTache.date_event = updateTacheDto.date_event;
      }
      if (updateTacheDto.image) {
        upDateTache.image = updateTacheDto.image;
      }
      if (updateTacheDto.title) {
        upDateTache.title = updateTacheDto.title;
      }
      if (updateTacheDto.url) {
        upDateTache.url = updateTacheDto.url;
      }
      return await this.TacheRepository.save(upDateTache);
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
