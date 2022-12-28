import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private TagRepository: Repository<Tag>,
  ) {}

  async create(
    createTagDto: CreateTagDto,
    utilisateur: Utilisateur,
  ): Promise<Tag | string> {
    const { title } = createTagDto;
    const existAlready = await this.TagRepository.findOneBy({ title });
    console.log('Title Existtttttttttt', existAlready);
    if (existAlready) {
      return `Vous avez déja crée la tache avec le titre:${title}`;
    }
    const newTag = this.TagRepository.create({
      ...createTagDto,
      user: utilisateur,
    });
    return await this.TagRepository.save(newTag);
  }

  async findAll(): Promise<Tag[]> {
    return await this.TagRepository.find();
  }

  async findOne(idValue: string): Promise<Tag> {
    const tagFound = await this.TagRepository.findOneBy({ id: idValue });
    if (!tagFound) {
      throw new NotFoundException(`aucun tag trouvé`);
    }
    return tagFound;
  }

  async update(id: string, updateTagDto: UpdateTagDto): Promise<Tag> {
    const upTag = await this.findOne(id);
    upTag.title = updateTagDto.title;
    return await this.TagRepository.save(upTag);
  }

  async remove(id: string): Promise<string> {
    const result = await this.TagRepository.delete({ id });
    {
      if (result.affected === 0) {
        throw new NotFoundException(`aucun tag trouvé à l'id ${id}`);
      }
      return `le tag n° ${id} a été supprimé`;
    }
  }
}
