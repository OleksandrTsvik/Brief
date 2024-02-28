import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateBriefDto {
  @IsNotEmpty()
  @IsUUID()
  answerBriefId: string;

  @IsNotEmpty()
  @IsString()
  answer: string | string[];
}
