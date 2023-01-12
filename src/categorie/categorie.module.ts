import { Module } from '@nestjs/common';
import { CategorieService } from './categorie.service';
import { CategorieController } from './categorie.controller';
import { Categorie } from './entities/categorie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Categorie, Utilisateur])],
  controllers: [CategorieController],
  providers: [CategorieService],
  exports: [CategorieService]
})
export class CategorieModule {}
