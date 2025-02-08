import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

import * as bcyrpt from 'bcrypt';
import { EAuthErrorMessages } from './auth.enum';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentialsDto;

    const user = await this.usersRepository.findOne({ where: { username } });
    if (user && (await bcyrpt.compare(password, user.password))) {
      return 'success';
    }

    throw new UnauthorizedException(EAuthErrorMessages.WRONG_CREDENTIALS);
  }
}
