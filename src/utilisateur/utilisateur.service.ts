import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { Utilisateur } from './entities/utilisateur.entity';
import { Repository, Table } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { MethodNotAllowedException } from '@nestjs/common/exceptions';

@Injectable()
export class UtilisateurService {
  constructor(
    @InjectRepository(Utilisateur)
    private utilisateurRepository: Repository<Utilisateur>,
  ) {}
  //-------------------------------REQUETES UTILISATEUR------------------------//

  async findOne(
    idValue: string,
    utilisateur: Utilisateur,
  ): Promise<Utilisateur> {
    const utilisateurFound = await this.utilisateurRepository.findOneBy({
      id: idValue,
    });
    console.log('id utilisateur----------------', utilisateur.id);

    if (!utilisateurFound) {
      throw new NotFoundException(
        `pas d'utilisateur trouvé avec l'id:${idValue}`,
      );
    }
    return utilisateurFound;
  }

  async update(
    idValue: string,
    upDateUserDto: UpdateUtilisateurDto,
    utilisateur: Utilisateur,
  ): Promise<Utilisateur> {
    const upDateUtilisateur = await this.utilisateurRepository.findOneBy({
      id: idValue,
    });
    console.log('id requête utilisateur', idValue);
    console.log('id utilisateur', utilisateur.id);

    if (upDateUtilisateur.id !== utilisateur.id) {
      throw new MethodNotAllowedException(
        "Vous n'êtes pas autorisé à modifier ces informations",
      );
    }
    const { email, pseudo, password, picture } = upDateUserDto;
    const pseudoExistAlready = await this.utilisateurRepository.findBy({
      pseudo,
    });
    const mailExistAlready = await this.utilisateurRepository.findBy({
      email,
    });
    if (upDateUtilisateur.pseudo && pseudoExistAlready.length > 0) {
      throw new Error(`L'utilisateur existe déja avec ce pseudo:${pseudo}`);
    } else if (upDateUtilisateur.email && mailExistAlready.length > 0) {
      throw new Error(`L'utilisateur existe déja avec ce mail:${email}`);
    }
    console.log(upDateUserDto.pseudo);
    try {
      if (upDateUserDto.email) {
        upDateUtilisateur.email = upDateUserDto.email;
      }
      if (upDateUserDto.pseudo) {
        upDateUtilisateur.pseudo = upDateUserDto.pseudo;
      }
      if (upDateUserDto.picture) {
        upDateUtilisateur.picture = upDateUserDto.picture;
      }
      if (upDateUserDto.password) {
        const salt = await bcrypt.genSalt();
        let hashedPassword = await bcrypt.hash(password, salt);
        upDateUtilisateur.password = hashedPassword;
      }
      return await this.utilisateurRepository.save(upDateUtilisateur);
    } catch {
      throw new Error("Autre erreur, merci de contacter l'administrateur");
    }
  }

  async remove(id: string): Promise<Utilisateur | string> {
    const result = await this.utilisateurRepository.delete({
      id,
    });
    if (result.affected === 0) {
      throw new NotFoundException(`pas d'utilisateur trouvé avec l'id:${id}`);
    }
    return `Cette action a supprmé l'utilisateur #${id}`;
  }

  //----------------------------------REQUETES ADMIN-------------------------//

  async findAllUser(): Promise<Utilisateur[]> {
    return await this.utilisateurRepository.find();
  }

  async findOneUser(
    idValue: string,
    utilisateur: Utilisateur,
  ): Promise<Utilisateur> {
    const utilisateurFound = await this.utilisateurRepository.findOneBy({
      id: idValue,
    });
    console.log('id utilisateur----------------', utilisateur.id);
    if (!utilisateurFound) {
      throw new NotFoundException(
        `pas d'utilisateur trouvé avec l'id:${idValue}`,
      );
    }
    return utilisateurFound;
  }

  async removeByAdmin(idValue: string): Promise<Utilisateur | string> {
    const result = await this.utilisateurRepository.delete({
      id: idValue,
    });
    if (result.affected === 0) {
      throw new NotFoundException(
        `pas d'utilisateur trouvé avec l'id:${idValue}`,
      );
    }
    return `Cette action a supprimé l'utilisateur #${idValue}`;
  }
}
