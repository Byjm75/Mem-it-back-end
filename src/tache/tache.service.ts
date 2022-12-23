import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
import { Repository } from 'typeorm';
import { CreateTacheDto } from './dto/create-tache.dto';
import { UpdateTacheDto } from './dto/update-tache.dto';
import { Tache } from './entities/tache.entity';

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
    const existAlready = await this.TacheRepository.findOneBy({ title });
    console.log('Tache Existtttttttttt', existAlready);
    if (existAlready) {
      return `Vous avez déja crée la Tâche avec le titre:${title}`;
    }
    const newTache = await this.TacheRepository.create({
      ...createTacheDto,
      user_: utilisateur,
    });
    return await this.TacheRepository.save(newTache);
    // Cette action crée un nouveau mémo;
  }

  async findAll(): Promise<Tache[]> {
    return await this.TacheRepository.find();
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
    updateTacheDto: UpdateTacheDto,
    utilisateur: Utilisateur,
  ): Promise<Tache | string> {
    const { title } = updateTacheDto;
    const noExist = await this.TacheRepository.findOneBy({ title });
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

  // if (!tacheToUpdate) {
  //   throw new NotFoundException(`Tâche non trouvé avec le titre:${title}`);
  // }
  // Cette action met à jour un mémo;

  // refaire la méthode standard pour récupérer toutes les taches créées
  // async findAll(id: string, utilisateur: Utilisateur): Promise<Tache[]> {
  //   const allTaches = await this.TacheRepository.find({
  //     id: idValue,
  //     user_: utilisateur,
  //   });
  //   return await this.TacheRepository.find(id);
  // Cette action presente tout les mémos
  //}

  //  }

  async remove(id: string): Promise<string> {
    const result = await this.TacheRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`pas de bouquin avec l'id:${id}`);
    }
    return `This action removes a #${id} tache`;
    // Cette action supprime un mémo;
  }
}
