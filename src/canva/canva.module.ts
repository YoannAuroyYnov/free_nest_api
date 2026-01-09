import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CanvaService } from './canva.service';
import { CanvaController } from './canva.controller';
import { Canva } from './entities/canva.entity';
import { PixelLog } from './entities/pixel-log.entity';
import { User } from '../user/entities/user.entity';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [TypeOrmModule.forFeature([Canva, PixelLog, User]), CacheModule.register()],
  controllers: [CanvaController],
  providers: [CanvaService],
  exports: [CanvaService],
})
export class CanvaModule {}
