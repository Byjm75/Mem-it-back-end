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
import { AuthModule } from './auth/auth.module';
import { ImageModule } from './image/image.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { Image } from './image/entities/image.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MulterModule.register({ dest: './files' }),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'files') }),
    TypeOrmModule.forFeature([Image]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: Number(process.env.PORT),
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.NAME,
      entities: [Utilisateur, Categorie, Tache, Tag, Image],
      synchronize: process.env.MODE === 'DEV' ? true : false,
    }),
    UtilisateurModule,
    CategorieModule,
    TacheModule,
    TagModule,
    AuthModule,
    ImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
