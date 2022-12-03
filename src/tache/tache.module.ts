import { Module } from '@nestjs/common';
import { TacheService } from './tache.service';
import { TacheController } from './tache.controller';

@Module({
  controllers: [TacheController],
  providers: [TacheService]
})
export class TacheModule {}
