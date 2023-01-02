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
  // update(
  //   id: string,
  //   updateUserDto: UpdateUserDto,
  // ): Promise<string | Utilisateur> {
  //   throw new Error('Method not implemented.');
  // }
  constructor(
    @InjectRepository(Utilisateur)
    private utilisateurRepository: Repository<Utilisateur>,
    private jwtService: JwtService,
  ) {}

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
    });

    try {
      // enregistrement de l'entité user
      const createdUser = await this.utilisateurRepository.save(user);
      //delete createdUser.password;
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
  async update(
    idValue: string,
    updateUserDto: UpdateUserDto,
  ): Promise<Utilisateur> {
    const upDateUtilisateur = await this.utilisateurRepository.findOneBy({
      id: idValue,
    });
    const { email, pseudo, password, picture } = updateUserDto;
    const salt = await bcrypt.genSalt();
    let hashedPassword = await bcrypt.hash(password, salt);
    if (upDateUtilisateur) {
      upDateUtilisateur.email = updateUserDto.email;
      (upDateUtilisateur.pseudo = updateUserDto.pseudo),
        (upDateUtilisateur.password = hashedPassword),
        (upDateUtilisateur.picture = updateUserDto.picture);
    }

    return await this.utilisateurRepository.save(upDateUtilisateur);
  }

  async login(loginDto: LoginDto) {
    const { pseudo, password } = loginDto;
    const utilisateur = await this.utilisateurRepository.findOneBy({
      pseudo,
    });

    if (utilisateur && (await bcrypt.compare(password, utilisateur.password))) {
      const payload = { pseudo };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException(
        'Ces identifiants ne sont pas bons, déso...',
      );
    }
  }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // // update(id: number, updateAuthDto: UpdateAuthDto) {
  // //   return `This action updates a #${id} auth`;
  // // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
