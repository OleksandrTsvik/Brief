import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 32)
  username: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 32)
  password: string;
}
