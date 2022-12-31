import { Module } from '@nestjs/common';
import { CategorieService } from './categorie.service';
import { CategorieController } from './categorie.controller';
import { Categorie } from './entities/categorie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
import { Tache } from 'src/tache/entities/tache.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Categorie, Utilisateur, Tache]),
  ],
  controllers: [CategorieController],
  providers: [CategorieService],
})
export class CategorieModule {}
