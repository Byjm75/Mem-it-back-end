import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { UpdateCategorieDto } from './dto/update-categorie.dto';
import { Categorie } from './entities/categorie.entity';
import { Repository } from 'typeorm';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';

@Injectable()
export class CategorieService {
  constructor(
    @InjectRepository(Categorie)
    private categorieRepository: Repository<Categorie>,
  ) {}

  async create(
    createCategorieDto: CreateCategorieDto,
    utilisateur: Utilisateur,
  ): Promise<Categorie> {
    const newCategorie = this.categorieRepository.create({
      ...createCategorieDto,
      user_: utilisateur,
    });
    return await this.categorieRepository.save(newCategorie);
  }

  async findAll(): Promise<Categorie[]> {
    return await this.categorieRepository.find();
  }

  async findOne(idValue: string): Promise<Categorie> {
    const categorieFound = await this.categorieRepository.findOneBy({
      id: idValue,
    });
    if (!categorieFound) {
      throw new NotFoundException(`Categorie non trouvé avec l'id:${idValue}`);
    }
    return categorieFound;
  }

  async update(
    idValue: string,
    updateCategorieDto: UpdateCategorieDto,
    utilisateur: Utilisateur,
  ): Promise<Categorie> {
    const upDateCategorie = await this.categorieRepository.findOneBy({
      id: idValue,
      ...updateCategorieDto,
      user_: utilisateur,
    });
    (upDateCategorie.title = updateCategorieDto.title),
      (upDateCategorie.image = updateCategorieDto.image),
      (upDateCategorie.favoris = updateCategorieDto.favoris);

    return await this.categorieRepository.save(upDateCategorie);
  }

  async remove(id: string, title: string): Promise<string> {
    const result = await this.categorieRepository.delete({
      id,
    });
    if (result.affected === 0) {
      throw new NotFoundException(`Categorie non trouvé avec l'id:${id}`);
    }
    return `This action removes a ${title} categorie`;
  }
}
