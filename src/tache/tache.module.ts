import { Module } from '@nestjs/common';
import { TacheService } from './tache.service';
import { TacheController } from './tache.controller';
import { Tache } from './entities/tache.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
import { Categorie } from 'src/categorie/entities/categorie.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Tache, Utilisateur, Categorie]),
  ],
  controllers: [TacheController],
  providers: [TacheService],
})
export class TacheModule {}
