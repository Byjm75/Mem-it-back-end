import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  UploadedFile,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
import { Image } from './entities/image.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { join } from 'path';
import type { Response } from 'express';
import { Categorie } from 'src/categorie/entities/categorie.entity';
import { CreateCategorieDto } from 'src/categorie/dto/create-categorie.dto';
import { CategorieService } from 'src/categorie/categorie.service';

@Controller('image')
@UseGuards(AuthGuard())
export class ImageController {
  constructor(
    private readonly imageService: ImageService,
    private categorieService: CategorieService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body,
    @GetUser() user,
  ) {
    console.log('CATEGORIE TTITLE', body.categorieTitle);
    console.log(file);

    const categorie1: CreateCategorieDto = {
      title: body.categorieTitle,
      image: file.filename,
    };
    const categorie2: CreateCategorieDto = {
      title: body.categorieTitle,
      image: '',
    };
    if (file.path.length < 1) {
      return this.categorieService.create(categorie2, user);
    } else {
      return this.categorieService.create(categorie1, user);
    }
    console.log('file path', file.path);

    // créer un objet categorie : { title : body.categorieTitle, imagePath: file.filename}
    // enregistrer dans la BDD la categorie
  }

  @Get(':filename')
  getFile(
    @Param('filename') filename: string,
    @Res({ passthrough: true }) res: Response,
  ): StreamableFile {
    const file = createReadStream(join(process.cwd(), `./files/${filename}`));
    res.set({
      'Content-Type': 'image/png',
    });
    return new StreamableFile(file);
  }
}
