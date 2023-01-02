

import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { Utilisateur } from './entities/utilisateur.entity';
import { Repository, Table } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UtilisateurService {
  constructor(
    @InjectRepository(Utilisateur)
    private utilisateurRepository: Repository<Utilisateur>,
  ) {}

  // pour admin
  async findAllUser(): Promise<Utilisateur[]> {
    const userFound = await this.utilisateurRepository.find();
    if (!userFound) {
      throw new NotFoundException(`Utilisateur non trouvée`);
    }
    return userFound;
  }

  //.get pour trouver un utilisateur via son ID
  async findOne(idValue: string): Promise<Utilisateur> {
    const utilisateurFound = await this.utilisateurRepository.findOneBy({
      id: idValue,
    });
    if (!utilisateurFound) {
      throw new NotFoundException(
        `pas d'utilisateur trouvé avec l'id:${idValue}`,
      );
    }
    return utilisateurFound;
  }

  //.patch pour modifier l'ensemble ou un élément de l'interface
  async update(
    idValue: string,
    updateUtilisateurDto: UpdateUtilisateurDto,
  ): Promise<Utilisateur> {
    const upDateUtilisateur = await this.utilisateurRepository.findOneBy({
      id: idValue,
    });
    const salt = await bcrypt.genSalt();
    let hashedPassword = await bcrypt.hash(upDateUtilisateur.password, salt);
    upDateUtilisateur.password = hashedPassword;
    upDateUtilisateur.email = updateUtilisateurDto.email;
    upDateUtilisateur.pseudo = updateUtilisateurDto.pseudo;
    hashedPassword = updateUtilisateurDto.password;
    upDateUtilisateur.picture = updateUtilisateurDto.picture;

    return await this.utilisateurRepository.save(upDateUtilisateur);
  }

  // .delete pour supprimer un utilisateur via son id
  // !!!!NE FONCTIONNE PAS!!!!
  // async remove(pseudo: string): Promise<Utilisateur | string> {
  //   const result = await this.utilisateurRepository.delete({
  //     pseudo,
  //   });
  //   if (result.affected === 0) {
  //     throw new NotFoundException(
  //       `pas d'utilisateur trouvé avec l'id:${pseudo}`,
  //     );
  //   }
  //   return `Cette action a supprmé l'utilisateur #${pseudo}`;
  // }

}
