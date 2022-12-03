import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UtilisateurModule } from './utilisateur/utilisateur.module';
import { CategorieModule } from './categorie/categorie.module';
import { TacheModule } from './tache/tache.module';
import { TagModule } from './tag/tag.module';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

@Module({
  imports: [UtilisateurModule, CategorieModule, TacheModule, TagModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
