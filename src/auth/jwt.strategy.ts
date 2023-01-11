import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Utilisateur)
    private utilisateursRepository: Repository<Utilisateur>,
  ) {
    super({
      secretOrKey: 'jaimelessushis',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: any): Promise<Utilisateur> {
    console.log('validate');
    const emailUtilisateurPayload = payload.utilisateur.email;
    console.log('mail', emailUtilisateurPayload.email);
    const user: Utilisateur = await this.utilisateursRepository.findOneBy({
      email: emailUtilisateurPayload,
    });

    if (!user) throw new UnauthorizedException();
    return user;
  }
}
