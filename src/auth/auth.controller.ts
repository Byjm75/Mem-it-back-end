import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UpdateUtilisateurDto } from 'src/utilisateur/dto/update-utilisateur.dto';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  utilisateurService: any;
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    return this.authService.login(loginDto);
  }

  @Patch('/update')
  update(
    @Body() updateUtilisateurDto: UpdateUtilisateurDto,
  ): Promise<Utilisateur | string> {
    return this.utilisateurService.update(updateUtilisateurDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(id);
  }
}
