import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UtilisateurModule } from './utilisateur/utilisateur.module';
import { CategorieModule } from './categorie/categorie.module';
import { TacheModule } from './tache/tache.module';
import { TagModule } from './tag/tag.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Utilisateur } from './utilisateur/entities/utilisateur.entity';
import { ConfigModule } from '@nestjs/config';
import { Categorie } from './categorie/entities/categorie.entity';
import { Tache } from './tache/entities/tache.entity';
import { Tag } from './tag/entities/tag.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Utilisateur, Categorie, Tache, Tag],
      synchronize: true,
    }),
    // UtilisateurModule,
    // CategorieModule,
    // TacheModule,
    // TagModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
