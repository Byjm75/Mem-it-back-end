import { forwardRef, Module } from '@nestjs/common';
import { TacheService } from './tache.service';
import { TacheController } from './tache.controller';
import { Tache } from './entities/tache.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Tache])],
  controllers: [TacheController],
  providers: [TacheService],
})
export class TacheModule {}
