import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class BriefDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 32)
  title: string;

  @IsOptional()
  isActive?: boolean;
}
