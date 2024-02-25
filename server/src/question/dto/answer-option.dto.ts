import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AnswerOptionDto {
  @IsNotEmpty()
  @IsNumber()
  position: number;

  @IsNotEmpty()
  @IsString()
  answerOption: string;
}
