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
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('utilisateur')
@UseGuards(AuthGuard())
export class UtilisateurController {
  constructor(private readonly utilisateurService: UtilisateurService) {}
  //Pour admin
  @Get()
  findAllUser(): Promise<Utilisateur[]> {
    return this.utilisateurService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id?: string): Promise<Utilisateur> {
    return this.utilisateurService.findOne(id);
  }

}
