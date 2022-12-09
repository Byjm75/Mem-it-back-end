import { Module } from '@nestjs/common';
import { TacheService } from './tache.service';
import { TacheController } from './tache.controller';
import { Tache } from './entities/tache.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Tache])],
  controllers: [TacheController],
  providers: [TacheService],
})
export class TacheModule {}
