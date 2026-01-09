import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';

export class payloadDto {
  @IsInt()
  @IsPositive()
  userId: number;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  age?: number;
}
