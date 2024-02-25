import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

import { AnswerOptionDto } from './answer-option.dto';
import { QuestionType } from '../enums/question-type.enum';

export class SaveQuestionDto {
  @IsNotEmpty()
  @IsNumber()
  position: number;

  @IsNotEmpty()
  @IsString()
  question: string;

  @IsNotEmpty()
  @IsEnum(QuestionType)
  type: QuestionType;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerOptionDto)
  answerOptions: AnswerOptionDto[];
}
