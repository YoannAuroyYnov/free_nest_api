import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SecurityService } from 'src/common/security/security.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private readonly securityService: SecurityService,
  ) {}

  async signin(
    signInDto: SignInDto,
  ): Promise<{ accessToken: string } | undefined> {
    try {
      const { email, password } = signInDto;
      const user = await this.usersService.findOneByEmail(email);

      const { password: hashedPassword } = user;
      await this.securityService.compare(password, hashedPassword);

      const { accessToken } = await this.securityService.generateAccessToken({
        userId: user.id,
        email: user.email,
        firstName: user.firstName,
        age: user.age,
      });

      return { accessToken };
    } catch (error) {
      if (error instanceof Error)
        throw new UnauthorizedException('Invalid email or password');
    }
  }

  async signup(signUpDto: SignUpDto) {
    try {
      await this.usersService.create(signUpDto);
      return;
    } catch (error) {
      if (error instanceof Error) throw new InternalServerErrorException();
    }
  }
}
