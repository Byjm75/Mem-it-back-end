import { Module } from '@nestjs/common';
import { CategorieService } from './categorie.service';
import { CategorieController } from './categorie.controller';
import { Categorie } from './entities/categorie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [CategorieController],
  providers: [CategorieService],
  imports: [TypeOrmModule.forFeature([Categorie])],
})
export class CategorieModule {}
