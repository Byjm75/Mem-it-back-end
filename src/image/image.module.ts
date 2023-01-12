import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { Image } from './entities/image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
import { MulterModule } from '@nestjs/platform-express';
import { CategorieModule } from 'src/categorie/categorie.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Image, Utilisateur]),
    MulterModule.register({ dest: './files', }),
    CategorieModule
  ],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule { }
