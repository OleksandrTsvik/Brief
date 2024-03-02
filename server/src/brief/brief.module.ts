import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BriefController } from './brief.controller';
import { BriefEntity } from './brief.entity';
import { BriefSeed } from './brief.seed';
import { BriefService } from './brief.service';

@Module({
  imports: [TypeOrmModule.forFeature([BriefEntity])],
  controllers: [BriefController],
  providers: [BriefService, BriefSeed],
})
export class BriefModule {}
