import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateBriefDto {
  @IsNotEmpty()
  @IsUUID()
  answerBriefId: string;

  @IsNotEmpty()
  @IsUUID()
  questionId: string;

  @IsNotEmpty()
  @IsString()
  answer: string;
}
