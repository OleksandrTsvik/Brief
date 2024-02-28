import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompletedBriefController } from './completed-brief.controller';
import { CompletedBriefEntity } from './completed-brief.entity';
import { CompletedBriefService } from './completed-brief.service';
import { AnswerEntity } from '../answers-brief/answer.entity';
import { AnswersBriefEntity } from '../answers-brief/answers-brief.entity';
import { BriefEntity } from '../brief/brief.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CompletedBriefEntity,
      BriefEntity,
      AnswersBriefEntity,
      AnswerEntity,
    ]),
  ],
  controllers: [CompletedBriefController],
  providers: [CompletedBriefService],
})
export class CompletedBriefModule {}
