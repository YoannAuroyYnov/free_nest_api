import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { payloadDto } from './dto/payload.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SecurityService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const rounds = this.configService.get<number>('AUTH_SALT_ROUNDS', 10);
    return bcrypt.hash(password, Number(rounds));
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async generateAccessToken(payloadDto: payloadDto): Promise<{ accessToken: string }> {
    const { userId, ...rest } = payloadDto;
    const payload = {
      sub: userId,
      ...rest,
    };

    const accessToken: string = await this.jwtService.signAsync(payload);

    return { accessToken };
  }
}
