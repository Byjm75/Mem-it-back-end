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
<<<<<<< HEAD
import { title } from 'process';


=======
>>>>>>> a71bb9d97d5db50db464254cb6cc0554416216e5
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
  findAllCategoriesByUser(
    @GetUser() utilisateur: Utilisateur,
  ): Promise<Categorie[]> {
    return this.categorieService.findAllCategoriesByUser(utilisateur);
  }

  @Get(':title')
  findOne(
    @Param('title') title: string,
    @GetUser() utilisateur: Utilisateur,
  ): Promise<Categorie | string> {
    return this.categorieService.findOne(title, utilisateur);
  }

  @Patch(':title')
  update(
    @Param('title') title: string,
    @Body() updateCategorieDto: UpdateCategorieDto,
    utilisateur: Utilisateur,
  ): Promise<Categorie | string> {
    return this.categorieService.update(title, updateCategorieDto, utilisateur);
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
