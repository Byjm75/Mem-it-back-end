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
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { Tag } from './entities/tag.entity';

@Controller('tag')
@UseGuards(AuthGuard())
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  create(
    @Body() createTagDto: CreateTagDto,
    @GetUser() utilisateur: Utilisateur,
  ): Promise<Tag | string> {
    console.log(Utilisateur);
    return this.tagService.create(createTagDto, utilisateur);
  }

  @Get()
  findAllByUser(@GetUser() utilisateur: Utilisateur): Promise<Tag[]> {
    console.log(Tag);
    return this.tagService.findAllByUser(utilisateur);
  }

  @Get(':title')
  findOne(
    @Param('title') title: string,
    @GetUser() utilisateur: Utilisateur,
  ): Promise<Tag | string> {
    return this.tagService.findOne(title, utilisateur);
  }

  @Patch(':title')
  update(
    @Param('title') title: string,
    @Body() updateTagDto: UpdateTagDto,
    utilisateur: Utilisateur,
  ): Promise<Tag | string> {
    return this.tagService.update(title, updateTagDto, utilisateur);
  }

  @Delete(':title')
  remove(@Param('title') title: string, @GetUser() utilisateur: Utilisateur) {
    return this.tagService.remove(title, utilisateur);
  }
}
