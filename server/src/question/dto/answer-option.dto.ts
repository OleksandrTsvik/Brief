import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class AnswerOptionDto {
  @IsNotEmpty()
  @IsInt()
  position: number;

  @IsNotEmpty()
  @IsString()
  answerOption: string;
}
