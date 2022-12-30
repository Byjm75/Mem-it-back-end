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
      userId: utilisateur,
    });
    return await this.TagRepository.save(newTag);
  }

  async findAll(): Promise<Tag[]> {
    return await this.TagRepository.find();
  }

  async findOne(
    title: string,
    utilisateur: Utilisateur,
  ): Promise<Tag | string> {
    const tagFound = await this.TagRepository.findOneBy({
      title,
      userId: utilisateur,
    });
    if (!tagFound) {
      throw new NotFoundException(`aucun tag trouvé avec le titre:${title}`);
    }
    return tagFound;
  }

  async update(
    title: string,
    updateTagDto: UpdateTagDto,
    utilisateur: Utilisateur,
  ): Promise<Tag | string> {
    const upDateTag = await this.TagRepository.findOneBy({
      title,
      userId: utilisateur,
    });
    upDateTag.title = updateTagDto.title;

    return await this.TagRepository.save(upDateTag);
  }

  async remove(title: string, utilisateur: Utilisateur): Promise<Tag | string> {
    const result = await this.TagRepository.delete({
      userId: utilisateur,
      title,
    });
    {
      if (result.affected === 0) {
        throw new NotFoundException(`aucun tag trouvé le titre:${title}`);
      }
      return `le tag avec le tire:${title} a été supprimé`;
    }
  }
}
