import { Inject, Injectable } from '@nestjs/common';
import { UserInputDto as UserInputDto } from '../presentation/dtos/user.input.dto';
import { EmailAlreadyRegisteredError } from '../../../common/errors/types/email-already-registered.error';
import { IHashingService } from '../../../common/hashing/domain/interfaces/hashing-service.interface';
import { ILoggerService } from '../../../common/loggers/domain/interfaces/logger-service.interface';
import { ConfigService } from '@nestjs/config';
import { IUsersRepository } from './interfaces/users.repository.interface';
import { IUsersQueue as IUsersQueue } from '../queues/interfaces/users.queue.interface';
import { User } from '@prisma/client';
import { UserOutputDto } from '../presentation/dtos/user.output.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('IUsersRepository')
    private readonly userRepository: IUsersRepository,
    @Inject('IHashingService')
    private readonly hashingService: IHashingService,
    @Inject('ILoggerService')
    private readonly logger: ILoggerService,
    @Inject('IUsersQueue')
    private readonly usersQueue: IUsersQueue,
    private readonly configService: ConfigService,
  ) { }

  async createUser(input: UserInputDto) {
    const existingUser = await this.userRepository.findByEmail(input.email);
    if (existingUser) {
      this.logger.contextName = `${UsersService.name}.createUser`;
      this.logger.error('This user is already registered in the system');
      throw new EmailAlreadyRegisteredError();
    }

    const token = await this.generateToken();

    await this.usersQueue.userSendValidationEmail(
      input.name,
      input.email,
      token,
    );

    const hashedPassword = await this.hashingService.hashingPassword(
      input.password,
      +this.configService.get<number>('SALT'),
    );

    const newUser = await this.userRepository.create({
      ...input,
      password: hashedPassword,
      token: token,
      validated: false,
    });

    return this.userToUserOutputDTO(newUser);
  }

  /**
   * Generates token for email validation
   * @returns string
   * @private
   */
  private async generateToken(): Promise<string> {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  private async userToUserOutputDTO(user: User): Promise<UserOutputDto> {
    return {
      name: user.name,
      email: user.email,
      token: user.token,
      validated: user.validated,
    };
  }
}
