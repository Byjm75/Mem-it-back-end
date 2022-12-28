import { Module } from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { UtilisateurController } from './utilisateur.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Utilisateur } from './entities/utilisateur.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Categorie } from 'src/categorie/entities/categorie.entity';
import { Tache } from 'src/tache/entities/tache.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Utilisateur, Categorie, Tache]),
  ],
  controllers: [UtilisateurController],
  providers: [UtilisateurService],
  exports: [UtilisateurService],
})
export class UtilisateurModule {}
