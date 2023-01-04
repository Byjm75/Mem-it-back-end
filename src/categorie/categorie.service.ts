import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { UpdateCategorieDto } from './dto/update-categorie.dto';
import { Categorie } from './entities/categorie.entity';
import { Repository } from 'typeorm';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';

@Injectable()
export class CategorieService {
  utilisateurRepository: Utilisateur[] | PromiseLike<Utilisateur[]>;
  constructor(
    @InjectRepository(Categorie)
    private categorieRepository: Repository<Categorie>,
  ) {}

  async create(
    createCategorieDto: CreateCategorieDto,
    utilisateur: Utilisateur,
  ): Promise<Categorie | string> {
    const { title } = createCategorieDto;
    const existAlready = await this.categorieRepository.findBy({
      title,
      user_: utilisateur,
    });
    console.log('Tache Existtttttttttt', existAlready);
    if (existAlready.length > 0) {
      return `Vous avez déja crée la Catégorie avec le titre:${title} ${utilisateur}`;
    }
    const newCategorie = await this.categorieRepository.create({
      ...createCategorieDto,
      user_: utilisateur,
    });
    return await this.categorieRepository.save(newCategorie);
    // Cette action crée un nouveau mémo;
  }

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
    const upDateCategorie = await this.categorieRepository.findOneBy({
      id: idValue,
      user_: utilisateur,
    });
    console.log(upDateCategorie);
    const { title, image, favoris } = updateCategorieDto;
    const titleExist = await this.categorieRepository.findBy({
      title,
    });
    console.log(titleExist);
    if (titleExist.length > 0) {
      throw new Error('Le nom de la catégorie existe déjà');
    }
    try {
      if (updateCategorieDto.title) {
        upDateCategorie.title = updateCategorieDto.title;
      }
      if (updateCategorieDto.image) {
        upDateCategorie.image = updateCategorieDto.image;
      }
      if (updateCategorieDto.favoris) {
        upDateCategorie.favoris = updateCategorieDto.favoris;
      }

      return await this.categorieRepository.save(upDateCategorie);
    } catch {
      throw new Error('autre erreur categéorie');
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
