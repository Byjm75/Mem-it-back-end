import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { UpdateCategorieDto } from './dto/update-categorie.dto';
import { Categorie } from './entities/categorie.entity';
import { Repository } from 'typeorm';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
import { title } from 'process';

@Injectable()
export class CategorieService {
  constructor(
    @InjectRepository(Categorie)
    private categorieRepository: Repository<Categorie>,
  ) {}

  async create(
    createCategorieDto: CreateCategorieDto, //Utilisation du DTO= Interface
    utilisateur: Utilisateur, //Ici j'utilise la table Utilisateur avec la clé qui joint les 2 tables (user_)
  ): Promise<Categorie | string> {
    const { title } = createCategorieDto;
    const existAlready = await this.categorieRepository.findOneBy({ title });
    console.log('Test Existtttttttttt', existAlready);
    if (existAlready) {
      return `Vous avez déja crée la catégorie avec le titre:${title}`;
    }
    const newCategorie = await this.categorieRepository.create({
      ...createCategorieDto,
      user_: utilisateur,
    });
    console.log('New cate createeeeeeeeeeee!', newCategorie);
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

  async remove(
    title: string,
    utilisateur: Utilisateur,
  ): Promise<Categorie | string> {
    const result = await this.categorieRepository.delete({
      user_: utilisateur,
      title,
    });
    if (result.affected === 0) {
      throw new NotFoundException(
        `Categorie non trouvé avec le titre:${title}`,
      );
    }
    return `Cette action entraine la suppresion de la catégorie:${title}`;
  }

  // async create(
  //   createCategorieDto: CreateCategorieDto,
  //   utilisateur: Utilisateur,
  // ): Promise<Categorie> {
  //   const newCategorie = this.categorieRepository.create({
  //     ...createCategorieDto,
  //     user_: utilisateur,
  //   });
  //   try {
  //     const createdCategorie = await this.categorieRepository.save(
  //       newCategorie,
  //     );
  //     return createdCategorie;
  //   } catch (error) {
  //     if (error.code === '23505') {
  //       throw new ConflictException('La catégorie exist');
  //     } else {
  //       throw new InternalServerErrorException();
  //     }
  //   }
  //   //return await this.categorieRepository.save(newCategorie);
  // }
  // async register(createAuthDto: CreateAuthDto) {
  //   const { email, pseudo, password } = createAuthDto;

  //   // création d'une entité user
  //   const user = this.utilisateurRepository.create({
  //     pseudo,
  //     email,
  //     password: hashedPassword,
  //   });

  //   try {
  //     // enregistrement de l'entité user
  //     const createdUser = await this.utilisateurRepository.save(user);
  //     //delete createdUser.password;
  //     return createdUser;
  //   } catch (error) {
  //     // gestion des erreurs
  //     if (error.code === '23505') {
  //       throw new ConflictException('username already exists');
  //     } else {
  //       throw new InternalServerErrorException();
  //     }
  //   }
  // }
}
