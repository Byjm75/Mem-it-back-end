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

  // ---------------les catégories créées par un utilsateur-------------------------//
  
  async create(
    createCategorieDto: CreateCategorieDto,
    utilisateur: Utilisateur,
  ): Promise<Categorie | string> {
    const { title, image, favoris } = createCategorieDto;
    const query = this.categorieRepository.createQueryBuilder();
    query.where({ title }).andWhere({ user_: utilisateur });
    const existAlready = await query.getOne();

    if (existAlready !== null) {
      return `Vous avez déja crée la Catégorie avec le titre:${title} ${utilisateur}`;
    }
    const newCategorie = await this.categorieRepository.create({
      ...createCategorieDto,
      user_: utilisateur,
    });
    try {
      if (createCategorieDto.image.length < 1) {
        newCategorie.image =
          'https://www.lacourdespetits.com/wp-content/uploads/2015/12/logo_lacourdespetits.jpg';
      }
      console.log(createCategorieDto.image);
      if (createCategorieDto.image) {
        newCategorie.image = createCategorieDto.image;
      }
      if (createCategorieDto.title) {
        newCategorie.title = createCategorieDto.title;
      }
      return await this.categorieRepository.save(newCategorie);
    } catch {
      throw new Error('erreur test');
    }
  }

  async findAllCategoriesByUser(
    utilisateur: Utilisateur,
  ): Promise<Categorie[]> {
    const categorieFound = await this.categorieRepository.findBy({
      user_: utilisateur,
    });
    console.log('categorieFound', categorieFound);
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
    console.log('Utilisateurrrrrrrrrrrrrr', utilisateur);
    const { title } = updateCategorieDto;
    console.log('TITLE', title);
    const query = this.categorieRepository.createQueryBuilder();
    query.where({ title }).andWhere({ user_: utilisateur });
    const existAlready = await query.getOne();
    console.log('updateeeeeee', existAlready);

    if (existAlready !== null) {
      return `La tâche ${title} existe déjà avec l'utilisateur ${utilisateur}`;
    }
    const query2 = this.categorieRepository.createQueryBuilder();
    query2.where({ id: idValue }).andWhere({ user_: utilisateur });
    const cateToUpdate = await query2.getOne();
    console.log('TO UPDATE ', cateToUpdate);

    if (!cateToUpdate) {
      throw new NotFoundException(`Catégorie non trouvée avec l'id:${idValue}`);
    }

    try {
      if (updateCategorieDto.image !== null) {
        cateToUpdate.image = updateCategorieDto.image;
      }
      if (updateCategorieDto.title !== null) {
        cateToUpdate.title = updateCategorieDto.title;
      }
      if (updateCategorieDto.favoris !== null) {
        cateToUpdate.favoris = updateCategorieDto.favoris;
      }
      return await this.categorieRepository.save(cateToUpdate);
    } catch {
      throw new Error('autre erreur tâche');
    }
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
