import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompletedBriefController } from './completed-brief.controller';
import { CompletedBriefEntity } from './completed-brief.entity';
import { CompletedBriefService } from './completed-brief.service';

@Module({
  imports: [TypeOrmModule.forFeature([CompletedBriefEntity])],
  controllers: [CompletedBriefController],
  providers: [CompletedBriefService],
})
export class CompletedBriefModule {}
