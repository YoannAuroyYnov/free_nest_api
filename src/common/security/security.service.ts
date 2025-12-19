import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SecurityService {
  constructor(private configService: ConfigService) {}

  async hashPassword(password: string): Promise<string> {
    const rounds = this.configService.get<number>('AUTH_SALT_ROUNDS', 10);
    return bcrypt.hash(password, Number(rounds));
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
