import {
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  Body,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { Request } from 'express';
import { GoogleAuthUser } from './dto/google-auth-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @HttpCode(200)
  signin(
    @Body() signInDto: SignInDto,
  ): Promise<{ accessToken: string } | undefined> {
    return this.authService.signin(signInDto);
  }

  @Post('signup')
  signup(@Body() signUpDto: SignUpDto): Promise<void> {
    return this.authService.signup(signUpDto);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request) {
    const { user } = req;
    return this.authService.googleLogin(user as GoogleAuthUser);
  }
}
