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
import { UtilisateurService } from './utilisateur.service';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { AuthGuard } from '@nestjs/passport';
import { Utilisateur } from './entities/utilisateur.entity';
import { Tache } from 'src/tache/entities/tache.entity';
import { Categorie } from 'src/categorie/entities/categorie.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('utilisateur')
@UseGuards(AuthGuard())
export class UtilisateurController {
  constructor(private readonly utilisateurService: UtilisateurService) {}

  //Pour le create utilisateur voir => @Post Auth.
  // @Post()
  // create(@Body() createUtilisateurDto: CreateUtilisateurDto) {
  //   return this.utilisateurService.create(createUtilisateurDto);
  // }

  @Get()
  findAll(): Promise<Utilisateur[]> {
    return this.utilisateurService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id?: string): Promise<Utilisateur> {
    return this.utilisateurService.findOne(id);
  }

  // @Get('/tache')
  // findAllTaskCreatedByUser(
  //   @Param('id') user_id: string,
  //   @GetUser() utilisateur: Utilisateur,
  // ): Promise<Tache[]> {
  //   return this.utilisateurService.findAllTaskCreatedByUser(utilisateur);
  // }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUtilisateurDto: UpdateUtilisateurDto,
  ): Promise<Utilisateur | string> {
    return this.utilisateurService.update(id, updateUtilisateurDto);
  }

  //!!!!NE FONCTIONNE PAS!!!!
  // @Delete(':id')
  // remove(
  //   @Param('id') id: string,
  //   @Body()
  //   utilisateur: Utilisateur,
  // ) {
  //   return this.utilisateurService.remove(id, utilisateur);
  // }
}
