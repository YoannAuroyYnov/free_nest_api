import { PassportStrategy } from '@nestjs/passport';
import { UnauthorizedException } from '@nestjs/common';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID') || 'undefined secret',
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET') || 'undefined secret',
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL') || 'undefined secret',
      scope: ['email', 'profile'],
    });
  }

  validate(_accessToken: string, _refreshToken: string, profile: Profile, done: VerifyCallback) {
    if (!profile.emails || !profile.emails.length || !profile.name) {
      return done(new UnauthorizedException('Missing Google profile info'), false);
    }

    const user = {
      googleId: profile.id,
      email: profile.emails[0].value,
      firstName: profile.name.givenName,
    };

    done(null, user);
  }
}
