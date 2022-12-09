import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CreateTacheDto } from './dto/create-tache.dto';
import { UpdateTacheDto } from './dto/update-tache.dto';
import { Tache } from './entities/tache.entity';

@Injectable()
export class TacheService {
  constructor(
    @InjectRepository(Tache)
    private TacheRepository: Repository<Tache>,
  ) {}

  async create(createTacheDto: CreateTacheDto): Promise<Tache> {
    return await this.TacheRepository.save(createTacheDto);
    // Cette action crée un nouveau mémo;
  }

  async findAll(): Promise<Tache[]> {
    return await this.TacheRepository.find();
    // Cette action presente tout les mémos
  }

  async findOne(idValue: number): Promise<Tache> {
    const taskFound = await this.TacheRepository.findOneBy({ id: idValue });
    if (!taskFound) {
      throw new NotFoundException(`pas de tâches avec l'id:${idValue}`)
    }
    return taskFound;
    //Cette action presente un mémo;
  }

  async update(id: number, updateTacheDto: UpdateTacheDto): Promise<Tache[]> {
    const tacheToUpdate = await this.findOne(id);
    tacheToUpdate.body = updateTacheDto.body;
    tacheToUpdate.categorie_ = updateTacheDto.categorie_;
    tacheToUpdate.date_event = updateTacheDto.date_event;
    tacheToUpdate.image = updateTacheDto.image;
    tacheToUpdate.title = updateTacheDto.title;
    tacheToUpdate.url = updateTacheDto.url;
    return await this.TacheRepository.save(updateTacheDto);
    // Cette action met à jour un mémo;
  }
    
    
    async remove(id: number): Promise<string> {
      const result = await this.TacheRepository.delete({ id });
      if (result.affected === 0) {
        throw new NotFoundException(`pas de bouquin avec l'id:${id}`)
      }
    return `This action removes a #${id} tache`;
      // Cette action supprime un mémo;
}
