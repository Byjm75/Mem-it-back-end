import { Module } from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { UtilisateurController } from './utilisateur.controller';
<<<<<<< HEAD
import { TypeOrmModule } from '@nestjs/typeorm';
import { Utilisateur } from './entities/utilisateur.entity';
=======
import { Utilisateur } from './entities/utilisateur.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Utilisateur } from './entities/utilisateur.entity';

>>>>>>> 4c312ad7ff39933879540de538ad049eefaede31
@Module({
  imports: [TypeOrmModule.forFeature([Utilisateur])],
  controllers: [UtilisateurController],
  providers: [UtilisateurService],
  imports: [TypeOrmModule.forFeature([Utilisateur])],
})
export class UtilisateurModule {}
