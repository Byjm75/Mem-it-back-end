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
import { TacheService } from './tache.service';
import { CreateTacheDto } from './dto/create-tache.dto';
import { UpdateTacheDto } from './dto/update-tache.dto';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
import { Tache } from './entities/tache.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('tache')
@UseGuards(AuthGuard())
export class TacheController {
  constructor(private readonly tacheService: TacheService) {}

  @Post()
  create(
    @Body() createTacheDto: CreateTacheDto,
    @GetUser() utilisateur: Utilisateur,
  ): Promise<Tache | string> {
    console.log(Utilisateur);
    return this.tacheService.create(createTacheDto, utilisateur);
  }

  @Get()
  findAll(@GetUser() utilisateur: Utilisateur): Promise<Tache[]> {
    console.log(Tache);
    return this.tacheService.findAll();
  }

  @Get(':title')
  findOne(
    @Param('title') title: string,
    @GetUser() utilisateur: Utilisateur,
  ): Promise<Tache | string> {
    return this.tacheService.findOne(title, utilisateur);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTacheDto: UpdateTacheDto,
    utilisateur: Utilisateur,
  ): Promise<Tache | string> {
    return this.tacheService.update(id, updateTacheDto, utilisateur);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Body()
    utilisateur: Utilisateur,
  ) {
    return this.tacheService.remove(id, utilisateur);
  }
}
