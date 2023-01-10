import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
import { Categorie } from 'src/categorie/entities/categorie.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private TagRepository: Repository<Tag>,
    @InjectRepository(Utilisateur)
    private UtilisateurRepository: Repository<Utilisateur>,
  ) {}

  async create(
    createTagDto: CreateTagDto,
    utilisateur: Utilisateur,
  ): Promise<Tag | string> {
    const { title } = createTagDto;
    const query = this.TagRepository.createQueryBuilder();
    query.where({ title }).andWhere({ userId: utilisateur });
    const existAlready = await query.getOne();

    if (existAlready !== null) {
      return `Vous avez déja crée le Tag avec le titre:${title} ${utilisateur}`;
    }
    const newTache = await this.TagRepository.create({
      ...createTagDto,
      userId: utilisateur,
    });
    return await this.TagRepository.save(newTache);
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
    console.log(idValue);
    console.log('Utilisateurrrrrrrrrrrrrr', utilisateur);
    const { title } = updateTagDto;
    console.log('TITLE', title);
    const query = this.TagRepository.createQueryBuilder();
    query.where({ title }).andWhere({ userId: utilisateur });
    const existAlready = await query.getOne();
    console.log('updateeeeeee', existAlready);

    if (existAlready !== null) {
      return `Le Tag ${title} existe déjà avec l'utilisateur ${utilisateur}`;
    }
    const query2 = this.TagRepository.createQueryBuilder();
    query2.where({ id: idValue }).andWhere({ userId: utilisateur });
    const tagToUpdate = await query2.getOne();
    console.log('TO UPDATE ', tagToUpdate);

    if (!tagToUpdate) {
      throw new NotFoundException(`Tag non trouvée avec l'id:${idValue}`);
    }
    try {
      if (updateTagDto.title !== null) {
        tagToUpdate.title = updateTagDto.title;
      }
      return await this.TagRepository.save(tagToUpdate);
    } catch {
      throw new Error('autre erreur tag');
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
