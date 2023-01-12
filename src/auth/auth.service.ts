import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Utilisateur)
    private utilisateurRepository: Repository<Utilisateur>,
    private jwtService: JwtService,
  ) {}

  //Création d'un compte utilisateur
  async register(createAuthDto: CreateAuthDto) {
    const { email, pseudo, password, picture, role } = createAuthDto;
    // hashage du mot de passe
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    // création d'une entité user
    const user = this.utilisateurRepository.create({
      pseudo,
      email,
      password: hashedPassword,
      picture,
      role,
    });
    //Ici on crée la gestion d'erreur (ne pouvant pas créer 2 fois le même compte).
    // On compare email et mot de passe pour savoir si le compte user existe déja.
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
    const { pseudo, email, password, role } = loginDto;
    const utilisateur = await this.utilisateurRepository.findOneBy({
      email,
    });
    console.log('je veux ton nom------------', pseudo);
    console.log('je veux ton mail-----------', email);
    console.log('je veux ton mdp------------', password);
    console.log('je veux ton role-----------', role);
    //Ici comparasaison du MP Hashé
    if (utilisateur && (await bcrypt.compare(password, utilisateur.password))) {
      //Supprime la propriété de taches de l'objet l'utilisateur
      delete utilisateur.taches;
      const payload = { utilisateur };
      console.log('je veux ton profil--------', utilisateur);
      //Ici envoie du Token d'accés
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException(
        'Ces identifiants ne sont pas bons, désolé...',
      );
    }
  }
}
