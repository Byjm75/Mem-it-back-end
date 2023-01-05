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
    const existAlready = await this.TagRepository.findBy({
      title,
      userId: utilisateur,
    });
    console.log('Title Existtttttttttt', existAlready);
    if (existAlready.length > 0) {
      return `Vous avez déja crée le tag avec le titre:${title} ${utilisateur}`;
    }
    const newTag = await this.TagRepository.create({
      ...createTagDto,
      userId: utilisateur,
    });
    return await this.TagRepository.save(newTag);
  }

  async findAllByUser(utilisateur: Utilisateur): Promise<Tag[]> {
    const tagFound = await this.TagRepository.findBy({
      userId: utilisateur,
    });
    if (!tagFound) {
      throw new NotFoundException(`Tag non trouvé`);
    }
    return tagFound;
  }

  async findOne(
    idValue: string,
    utilisateur: Utilisateur,
  ): Promise<Tag | string> {
    const tagFound = await this.TagRepository.findOneBy({
      id: idValue,
      userId: utilisateur,
    });
    if (!tagFound) {
      throw new NotFoundException(`aucun tag trouvé avec le titre:${idValue}`);
    }
    return tagFound;
  }

  async update(
    idValue: string,
    updateTagDto: UpdateTagDto,
    utilisateur: Utilisateur,
  ): Promise<Tag | string> {
    const upDateTag = await this.TagRepository.findOneBy({
      id: idValue,
      userId: utilisateur,
    });
    const { title } = updateTagDto;
    const titleExist = await this.TagRepository.findBy({
      title,
    });
    if (titleExist.length > 0) {
      throw new Error(`La catégorie ${title}existe déjà`);
    }
    try {
      if (updateTagDto.title) {
        upDateTag.title = updateTagDto.title;
      }
      return await this.TagRepository.save(upDateTag);
    } catch {
      throw new Error('autre erreur categéorie');
    }
  }

  async remove(
    idValue: string,
    utilisateur: Utilisateur,
  ): Promise<Tag | string> {
    const result = await this.TagRepository.delete({
      userId: utilisateur,
      id: idValue,
    });
    {
      if (result.affected === 0) {
        throw new NotFoundException(`aucun tag trouvé le titre:${idValue}`);
      }
      return `le tag avec le tire:${idValue} a été supprimé`;
    }
  }
}
