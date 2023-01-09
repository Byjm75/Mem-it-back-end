import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt/dist';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Utilisateur)
    private utilisateurRepository: Repository<Utilisateur>,
    private jwtService: JwtService,
  ) {}

  //Création d'un compte utilisateur
  async register(createAuthDto: CreateAuthDto) {
    const { email, pseudo, password, picture } = createAuthDto;
    // hashage du mot de passe
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    // création d'une entité user
    const user = this.utilisateurRepository.create({
      pseudo,
      email,
      password: hashedPassword,
      picture,
    });
    const pseudoExistAlready = await this.utilisateurRepository.findBy({
      pseudo,
    });
    const mailExistAlready = await this.utilisateurRepository.findBy({
      email,
    });
    if (pseudoExistAlready.length > 0) {
      return `L'utilisateur existe déja avec ce pseudo:${pseudo}`;
    } else if (mailExistAlready.length > 0) {
      return `L'utilisateur existe déja avec ce mail:${email}`;
    }
    try {
      const createdUser = await this.utilisateurRepository.save(user);
      return createdUser;
    } catch (error) {
      // gestion des erreurs
      if (error.code === '23505') {
        throw new ConflictException('username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  //Connexion d'un utilisateur
  async login(loginDto: LoginDto) {
    const { pseudo, email, password } = loginDto;
    const utilisateur = await this.utilisateurRepository.findOneBy({
      email,
    });
    console.log('je veux ton nom', pseudo);
    console.log('je veux ton mail', email);
    console.log('je veux ton mdp', password);

    if (utilisateur && (await bcrypt.compare(password, utilisateur.password))) {
      const payload = { email };
      console.log('je veux ton mail', email);
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException(
        'Ces identifiants ne sont pas bons, déso...',
      );
    }
  }

  //Modification d'un utilisateur
  async update(
    idValue: string,
    updateUserDto: UpdateUserDto,
    utilisateur: Utilisateur
  ): Promise<Utilisateur | string> {
    const upDateUtilisateur = await this.utilisateurRepository.findOneBy({
      id: idValue,utilisateur
    });
    const { email, pseudo, password, picture } = updateUserDto;
    const pseudoExistAlready = await this.utilisateurRepository.findBy({
      pseudo,
    });
    const mailExistAlready = await this.utilisateurRepository.findBy({
      email,
    });
    if (updateUserDto.pseudo&&pseudoExistAlready.length > 0) {
      throw new Error(`L'utilisateur existe déja avec ce pseudo:${pseudo}`);
    } else if (updateUserDto.email&&mailExistAlready.length > 0) {
      throw new Error(`L'utilisateur existe déja avec ce mail:${email}`);
    }
    console.log(updateUserDto.pseudo);
    try {
      if (updateUserDto.email) {
        upDateUtilisateur.email = updateUserDto.email;
      }
      if (updateUserDto.pseudo) {
        upDateUtilisateur.pseudo = updateUserDto.pseudo;
      }
      if (updateUserDto.picture) {
        upDateUtilisateur.picture = updateUserDto.picture;
      }
      if (updateUserDto.password) {
        const salt = await bcrypt.genSalt();
        let hashedPassword = await bcrypt.hash(password, salt);
        upDateUtilisateur.password = hashedPassword;
      }
      return await this.utilisateurRepository.save(upDateUtilisateur);
    } catch {
      throw new Error('à definir');
    }
  }

  //Suppression d'un compte utilisateur
  async remove(id: string): Promise<Utilisateur | string> {
    const result = await this.utilisateurRepository.delete({
      id,
    });
    if (result.affected === 0) {
      throw new NotFoundException(`pas d'utilisateur trouvé avec l'id:${id}`);
    }
    return `Cette action a supprmé l'utilisateur #${id}`;
  }
}
