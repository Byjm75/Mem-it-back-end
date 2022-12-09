import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { UpdateCategorieDto } from './dto/update-categorie.dto';
import { Categorie } from './entities/categorie.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategorieService {
  constructor(
    @InjectRepository(Categorie)
    private categorieRepository: Repository<Categorie>,
  ) {}

  async create(createCategorieDto: CreateCategorieDto): Promise<Categorie> {
    return await this.categorieRepository.save(createCategorieDto);
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
  ): Promise<Categorie> {
    const upDateCategorie = await this.categorieRepository.findOneBy({
      id: idValue,
    });
    (upDateCategorie.title = updateCategorieDto.title),
      (upDateCategorie.image = updateCategorieDto.image),
      (upDateCategorie.favoris = updateCategorieDto.favoris);

    return await this.categorieRepository.save(upDateCategorie);
  }

  async remove(id: string): Promise<string> {
    const result = await this.categorieRepository.delete({
      id,
    });
    if (result.affected === 0) {
      throw new NotFoundException(`Categorie non trouvé avec l'id:${id}`);
    }
    return `This action removes a #${id} categorie`;
  }
}
