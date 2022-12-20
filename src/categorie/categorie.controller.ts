import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CategorieService } from './categorie.service';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { UpdateCategorieDto } from './dto/update-categorie.dto';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
import { Categorie } from './entities/categorie.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { title } from 'process';


@Controller('categorie')
@UseGuards(AuthGuard())
export class CategorieController {
  constructor(private readonly categorieService: CategorieService) {}

  @Post()
  create(
    @Body() createCategorieDto: CreateCategorieDto,
    @GetUser() utilisateur: Utilisateur,
  ): Promise<Categorie | string> {
    console.log(Utilisateur);
    return this.categorieService.create(createCategorieDto, utilisateur);
  }

  @Get()
  findAll(): Promise<Categorie[]> {
    console.log(Categorie);
    return this.categorieService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') title: string) {
    return this.categorieService.findOne(title);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategorieDto: UpdateCategorieDto,
    utilisateur: Utilisateur,
  ) {
    return this.categorieService.update(id, updateCategorieDto, utilisateur);
  }

  @Delete(':title')
  remove(
    @Param('title') title: string,
    @Body()
    utilisateur: Utilisateur,
  ) {
    return this.categorieService.remove(title, utilisateur);
  }
}
