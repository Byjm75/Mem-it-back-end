import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { AuthGuard } from '@nestjs/passport';
import { RoleEnumType, Utilisateur } from './entities/utilisateur.entity';
import { Body, Delete, Patch } from '@nestjs/common/decorators';
import { UpdateUserDto } from 'src/auth/dto/updateUser.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { resolveSoa } from 'dns';
import { Roles } from 'src/auth/roles.decorator';

@Controller('utilisateur')
@UseGuards(AuthGuard())
export class UtilisateurController {
  constructor(private readonly utilisateurService: UtilisateurService) {}

  //--------------------------------------------REQUETE UTILISATEURS------------------------------//

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @GetUser() utilisateur: Utilisateur,
  ): Promise<Utilisateur> {
    return this.utilisateurService.findOne(id, utilisateur);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUtilisateurDto: UpdateUtilisateurDto,
    @GetUser() utilisateur: Utilisateur,
  ): Promise<Utilisateur> {
    console.log(utilisateur);
    return this.utilisateurService.update(
      id,
      updateUtilisateurDto,
      utilisateur,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.utilisateurService.remove(id);
  }

  //-------------------------------REQUETES ADMIN---------------------------//
  //requetes avec route sécurisé pour l'Admin
  @Get('/admin')
  findAllUser(): Promise<Utilisateur[]> {
    return this.utilisateurService.findAllUser();
  }

  @Get('/admin/:id')
  findOneUser(
    @Param('id') id: string,
    @GetUser() utilisateur: Utilisateur,
  ): Promise<Utilisateur> {
    return this.utilisateurService.findOneUser(id, utilisateur);
  }

  @Delete('/admin/:id')
  removeByAdmin(@Param('id') id: string) {
    return this.utilisateurService.remove(id);
  }
}
