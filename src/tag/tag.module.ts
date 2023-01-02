import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
import { Categorie } from 'src/categorie/entities/categorie.entity';
import { Tache } from 'src/tache/entities/tache.entity';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Tag, Utilisateur])],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
