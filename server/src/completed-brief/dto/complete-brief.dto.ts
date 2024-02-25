import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CompleteBriefDto {
  @IsNotEmpty()
  @IsUUID()
  questionId: string;

  @IsNotEmpty()
  @IsString()
  answer: string;
}
