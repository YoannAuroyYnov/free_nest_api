import { IsEmail, IsNotEmpty, IsString, Equals } from 'class-validator';

export class GoogleAuthUser {
  @IsString()
  @Equals('google')
  provider: 'google';

  @IsString()
  @IsNotEmpty()
  googleId: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;
}
