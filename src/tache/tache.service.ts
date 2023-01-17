import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
import { Repository } from 'typeorm';
import { CreateTacheDto } from './dto/create-tache.dto';
import { Tache } from './entities/tache.entity';
import { updateTacheDto } from './dto/update-tache.dto';

@Injectable()
export class TacheService {
  CategorieRepository: any;
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
    try{
       if(createTacheDto.title)
      {createTacheDto.title = newTache.title}
    
    if(createTacheDto.date_event)
      {createTacheDto.date_event = newTache.date_event}
    console.log(' create tache dto date',createTacheDto.date_event)
    if(createTacheDto.body)
      {createTacheDto.body = newTache.body}
      if(createTacheDto.image)
      {createTacheDto.image= newTache.image}
      if(createTacheDto.url)
      {createTacheDto.url= newTache.url}
    

    return await this.TacheRepository.save(newTache);
    }
  catch(e){
      throw new Error(e);
  }}

  async findAllTaskByUser(utilisateur: Utilisateur): Promise<Tache[]> {
    const taskFound = await this.TacheRepository.findBy({
      user_: utilisateur,
    });
    if (!taskFound) {
      throw new NotFoundException(`Tâche non trouvée`);
    }
    console.log(taskFound);
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
    console.log('TITLE', title);
    const query = this.TacheRepository.createQueryBuilder();
    query.where({ title }).andWhere({ user_: utilisateur });
    const existAlready = await query.getOne();
    console.log('updateeeeeee', existAlready);

    if (existAlready !== null) {
      return `La tâche ${title} existe déjà avec l'utilisateur ${utilisateur}`;
    }
    const query2 = this.TacheRepository.createQueryBuilder();
    query2.where({ id: idValue }).andWhere({ user_: utilisateur });
    const tacheToUpdate = await query2.getOne();
    console.log('TO UPDATE ', tacheToUpdate);

    if (!tacheToUpdate) {
      throw new NotFoundException(`Tâche non trouvée avec l'id:${idValue}`);
    }

    try {
      if (!updateTacheDto.body) {
        tacheToUpdate.body = tacheToUpdate.body;
      } else {
        tacheToUpdate.body = updateTacheDto.body;
      }
      if (!updateTacheDto.date_event) {
        tacheToUpdate.date_event = tacheToUpdate.date_event;
      } else {
        tacheToUpdate.date_event = updateTacheDto.date_event;
      }

      if (!updateTacheDto.title) {
        tacheToUpdate.title = tacheToUpdate.title;
      } else {
        tacheToUpdate.title = updateTacheDto.title;
      }
      if (!updateTacheDto.url) {
        tacheToUpdate.url = tacheToUpdate.url;
      } else {
        tacheToUpdate.url = updateTacheDto.url;
      }
      if (!updateTacheDto.categorie) {
        tacheToUpdate.categorie_ = tacheToUpdate.categorie_;
      }
      {
        tacheToUpdate.categorie_ = updateTacheDto.categorie;
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
