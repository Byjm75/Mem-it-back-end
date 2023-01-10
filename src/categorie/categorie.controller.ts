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
import { GetUser } from 'src/auth/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
@Controller('categorie')
@UseGuards(AuthGuard())
export class CategorieController {
  constructor(private readonly categorieService: CategorieService) {}

  @Post()
  create(
    @Body() createCategorieDto: CreateCategorieDto,
    @GetUser() utilisateur: Utilisateur,
  ): Promise<Categorie | string> {
    console.log('mais qui es tu ? ', utilisateur.email);
    return this.categorieService.create(createCategorieDto, utilisateur);
  }

  @Get()
  findAllCategoriesByUser(
    @GetUser() utilisateur: Utilisateur,
  ): Promise<Categorie[]> {
    return this.categorieService.findAllCategoriesByUser(utilisateur);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @GetUser() utilisateur: Utilisateur,
  ): Promise<Categorie | string> {
    return this.categorieService.findOne(id, utilisateur);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategorieDto: UpdateCategorieDto,
    @GetUser() utilisateur: Utilisateur,
  ): Promise<Categorie | string> {
    return this.categorieService.update(id, updateCategorieDto, utilisateur);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Body()
    utilisateur: Utilisateur,
  ) {
    return this.categorieService.remove(id, utilisateur);
  }
}
