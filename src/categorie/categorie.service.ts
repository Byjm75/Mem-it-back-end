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
  ): Promise<Categorie | string> {
    const { title } = createCategorieDto;
    console.log('je veux tout', utilisateur.email);
    const existAlready = await this.categorieRepository.findBy({
      title,
      user_: utilisateur,
    });
    console.log('catégorie doublon trouvée', existAlready);
    if (existAlready.length > 0) {
      return `Vous avez déja crée la Catégorie avec le titre:${title} ${utilisateur}`;
    }
    const newCategorie = await this.categorieRepository.create({
      ...createCategorieDto,
      user_: utilisateur,
    });
    return await this.categorieRepository.save(newCategorie);
  }
  // les catégories créées par un utilsateur
  async findAllCategoriesByUser(
    utilisateur: Utilisateur,
  ): Promise<Categorie[]> {
    const categorieFound = await this.categorieRepository.findBy({
      user_: utilisateur,
    });
    if (!categorieFound) {
      throw new NotFoundException(`Catérorie non trouvée`);
    }
    return categorieFound;
  }

  async findOne(
    idValue: string,
    utilisateur: Utilisateur,
  ): Promise<Categorie | string> {
    const categorieFound = await this.categorieRepository.findOneBy({
      id: idValue,
      user_: utilisateur,
    });
    if (!categorieFound) {
      throw new NotFoundException(
        `Categorie non trouvé avec le titre:${idValue}`,
      );
    }
    return categorieFound;
  }

  async update(
    idValue: string,
    updateCategorieDto: UpdateCategorieDto,
    utilisateur: Utilisateur,
  ): Promise<Categorie | string> {
    console.log(idValue);
    console.log(utilisateur);
    const query = this.categorieRepository.createQueryBuilder();
    query.where({ id: idValue }).andWhere({ user_: utilisateur });
    const upDateCategorie = await query.getOne();
    console.log('update', upDateCategorie);

    console.log('upDateCategorie---------', upDateCategorie);
    const { title, image, favoris } = updateCategorieDto;
    const titleExist = await this.categorieRepository.findBy({
      title,
    });
    console.log(titleExist);
    // console.log('query------------', query);
    // if (titleExist.length > 0) {
    //   throw new Error(`La catégorie ${title}existe déjà`);
    // }
    // try {
    if (upDateCategorie.title !== undefined) {
      upDateCategorie.title = updateCategorieDto.title;
    }
    if (updateCategorieDto.image) {
      upDateCategorie.image = updateCategorieDto.image;
    }
    if (updateCategorieDto.favoris) {
      upDateCategorie.favoris = updateCategorieDto.favoris;
    }
    return await this.categorieRepository.save(upDateCategorie);
    // } catch {
    //   throw new Error('autre erreur categéorie');
    // }
  }

  async remove(
    idValue: string,
    utilisateur: Utilisateur,
  ): Promise<Categorie | string> {
    const result = await this.categorieRepository.delete({
      user_: utilisateur,
      id: idValue,
    });
    if (result.affected === 0) {
      throw new NotFoundException(
        `Categorie non trouvé avec le titre:${idValue}`,
      );
    }
    return `Cette action entraine la suppresion de la catégorie:${idValue}`;
  }
}
