import { Module } from '@nestjs/common';
import { UsersService } from './domain/users.service';
import { PrismaClient } from '@prisma/client';
import { UsersRepository } from './domain/repositories/users.repository';
import { UsersController } from './presentation/controllers/users.controller';
import { LoggerModule } from '../../common/loggers/logger.module';
import { HashingService } from '../../common/hashing/domain/hashing.service';
import { HashingModule } from '../../common/hashing/hashing.module';
import { LoggerService } from '../../common/loggers/domain/logger.service';
import { MailService } from '../../common/mail/domain/mail.service';
import { BullModule } from '@nestjs/bull';
import { UsersProcessor } from './queues/users.processor';
import { UsersQueue } from './queues/users.queue';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'users',
    }),
    LoggerModule,
    HashingModule,
  ],
  providers: [
    UsersService,
    PrismaClient,
    { provide: 'IUsersRepository', useClass: UsersRepository },
    { provide: 'IHashingService', useClass: HashingService },
    { provide: 'ILoggerService', useClass: LoggerService },
    { provide: 'IMailService', useClass: MailService },
    { provide: 'IUsersProcessor', useClass: UsersProcessor },
    { provide: 'IUsersQueue', useClass: UsersQueue },
  ],
  controllers: [UsersController],
})
export class UsersModule { }
