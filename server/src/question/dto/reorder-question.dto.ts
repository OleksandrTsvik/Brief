import { IsInt, IsNotEmpty, IsUUID } from 'class-validator';

export class ReorderQuestionDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsInt()
  position: number;
}
