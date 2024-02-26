import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnswerOptionEntity } from './answer-option.entity';
import { QuestionController } from './question.controller';
import { QuestionEntity } from './question.entity';
import { QuestionService } from './question.service';
import { BriefEntity } from '../brief/brief.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuestionEntity, AnswerOptionEntity, BriefEntity]),
  ],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
