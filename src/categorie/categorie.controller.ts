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

@Controller('categorie')
export class CategorieController {
  constructor(private readonly categorieService: CategorieService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(
    @Body() createCategorieDto: CreateCategorieDto,
    @GetUser() utilisateur: Utilisateur,
  ): Promise<Categorie> {
    console.log(Utilisateur);
    return this.categorieService.create(createCategorieDto, utilisateur);
  }

  @Get()
  findAll() {
    return this.categorieService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categorieService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategorieDto: UpdateCategorieDto,
  ) {
    return this.categorieService.update(id, updateCategorieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categorieService.remove(id);
  }
}
