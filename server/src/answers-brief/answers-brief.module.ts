import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnswersBriefController } from './answers-brief.controller';
import { AnswersBriefEntity } from './answers-brief.entity';
import { AnswersBriefService } from './answers-brief.service';

@Module({
  imports: [TypeOrmModule.forFeature([AnswersBriefEntity])],
  controllers: [AnswersBriefController],
  providers: [AnswersBriefService],
})
export class AnswersBriefModule {}
