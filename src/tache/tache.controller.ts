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
export class TacheController {
  constructor(private readonly tacheService: TacheService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(
    @Body() createTacheDto: CreateTacheDto,
    @GetUser() utilisateur: Utilisateur,
  ): Promise<Tache> {
    console.log(Utilisateur);
    return this.tacheService.create(createTacheDto, utilisateur);
  }

  @Get()
  findAll() {
    return this.tacheService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tacheService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTacheDto: UpdateTacheDto) {
    return this.tacheService.update(id, updateTacheDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tacheService.remove(id);
  }
}
