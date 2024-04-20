import { Test, TestingModule } from '@nestjs/testing';
import { UsersService as UsersService } from './users.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerService } from '../../../common/loggers/domain/logger.service';
import { LoggerModule } from '../../../common/loggers/logger.module';
import { HashingModule } from '../../../common/hashing/hashing.module';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { EmailAlreadyRegisteredError } from '../../../common/errors/types/email-already-registered.error';
import { IHashingService } from '../../../common/hashing/domain/interfaces/hashing-service.interface';
import { UsersProcessor as UsersProcessor } from '../queues/users.processor';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IUsersQueue as IUsersQueue } from '../queues/interfaces/users.queue.interface';
import { MailService } from '../../../common/mail/domain/mail.service';
import { MailerService } from '@nestjs-modules/mailer';

export const usersRepositoryMock = {
  create: jest.fn(),
  findById: jest.fn(),
  findByEmail: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

export const hashingServiceMock: IHashingService = {
  hashingPassword: jest.fn(),
};

export const usersQueueMock: IUsersQueue = {
  userSendValidationEmail: jest.fn(),
};

export class MailerServiceMock {
  async sendMail(mailOptions: any): Promise<any> {
    return Promise.resolve();
  }
}

describe('UsersService', () => {
  let service: UsersService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        ConfigService,
        PrismaService,
        UsersProcessor,
        EventEmitter2,

        {
          provide: 'IHashingService',
          useValue: hashingServiceMock,
        },

        {
          provide: MailerService,
          useClass: MailerServiceMock, // Aqui, usamos useClass para fornecer o mock em vez do serviço real.
        },
        {
          provide: 'IMailService',
          useClass: MailService,
        },

        {
          provide: 'ILoggerService',
          useFactory: () => {
            const loggerService = new LoggerService(new ConfigService());
            loggerService.info = jest.fn().mockResolvedValue({});
            loggerService.error = jest.fn().mockResolvedValue({});
            return loggerService;
          },
        },

        { provide: 'IUsersRepository', useValue: usersRepositoryMock },
        { provide: 'IUsersQueue', useValue: usersQueueMock },
      ],
      imports: [LoggerModule, ConfigModule, HashingModule],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('# defined', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('# createUser', () => {
    const input = {
      email: 'random@random.com',
      name: 'Random Name',
      password: 'password',
    };
    it('should create a new user', async () => {
      usersRepositoryMock.create.mockResolvedValue({});

      const result = await service.createUser(input);

      expect(usersRepositoryMock.findByEmail).toHaveBeenCalledTimes(1);
      expect(hashingServiceMock.hashingPassword).toHaveBeenCalledTimes(1);
      expect(usersQueueMock.userSendValidationEmail).toHaveBeenCalledTimes(1);
      expect(result).toEqual({});
    });

    it('not should be created a new user if user already registered', async () => {
      usersRepositoryMock.create.mockResolvedValue({});
      usersRepositoryMock.findByEmail.mockResolvedValue({});

      expect(usersRepositoryMock.findByEmail).toHaveBeenCalledTimes(1);
      await expect(service.createUser(input)).rejects.toThrow(
        new EmailAlreadyRegisteredError(),
      );
    });
  });
});
