import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from './user.entity';
import { DataSource, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ERROR_CODE_FOR_DUBLICATE } from 'src/assets/constants';
import { EAuthErrorMessages } from './auth.enum';
import * as bcyrpt from 'bcrypt';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private _dataSource: DataSource) {
    super(User, _dataSource.createEntityManager());
  }

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const salt = await bcyrpt.genSalt();
    const hashedPassword = await bcyrpt.hash(password, salt);

    const user = this.create({
      username,
      password: hashedPassword,
    });

    try {
      await this.save(user);
    } catch (error: unknown) {
      if ((error as { code?: string })?.code === ERROR_CODE_FOR_DUBLICATE) {
        throw new ConflictException(EAuthErrorMessages.USER_EXISTS);
      }

      throw new InternalServerErrorException();
    }
  }
}
