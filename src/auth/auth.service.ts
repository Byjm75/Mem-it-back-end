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
import { UpdateUtilisateurDto } from 'src/utilisateur/dto/update-utilisateur.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Utilisateur)
    private utilisateurRepository: Repository<Utilisateur>,
    private jwtService: JwtService,
  ) {}

  async register(createAuthDto: CreateAuthDto) {
    const { email, pseudo, password } = createAuthDto;

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

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const utilisateur = await this.utilisateurRepository.findOneBy({
      email,
    });

    if (utilisateur && (await bcrypt.compare(password, utilisateur.password))) {
      const payload = { email };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException(
        'Ces identifiants ne sont pas bons, déso...',
      );
    }
  }

  //.patch pour modifier l'ensemble ou un élément de l'interface
  async update(
    updateUtilisateurDto: UpdateUtilisateurDto,
    utilisateur: Utilisateur,
  ): Promise<Utilisateur> {
    const upDateUtilisateur = await this.utilisateurRepository.findOneBy({});
    const salt = await bcrypt.genSalt();
    let hashedPassword = await bcrypt.hash(upDateUtilisateur.password, salt);
    upDateUtilisateur.password = hashedPassword;
    upDateUtilisateur.email = updateUtilisateurDto.email;
    upDateUtilisateur.pseudo = updateUtilisateurDto.pseudo;
    hashedPassword = updateUtilisateurDto.password;
    upDateUtilisateur.picture = updateUtilisateurDto.picture;

    return await this.utilisateurRepository.save(upDateUtilisateur);
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
}
