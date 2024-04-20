import { Process, Processor } from '@nestjs/bull';
import { Inject } from '@nestjs/common';
import { ILoggerService } from '../../../common/loggers/domain/interfaces/logger-service.interface';
import { IMailService } from '../../../common/mail/domain/interfaces/mail.service.interface';
import { Job } from 'bull';
import { UserSendValidationEmailEvent } from '../../../common/events/user-send-validation-email.event';
import { IUsersProcessor } from './interfaces/users.processor.interface';

@Processor('users')
export class UsersProcessor implements IUsersProcessor {
  constructor(
    @Inject('ILoggerService')
    private readonly logger: ILoggerService,
    @Inject('IMailService')
    private readonly mailService: IMailService,
  ) {
    this.logger.contextName = UsersProcessor.name;
  }

  @Process('user.send.validation.email')
  async sendValidationEmail({ data }: Job<UserSendValidationEmailEvent>) {
    await this.mailService.sendTenantConfirmation({
      name: data.name,
      email: data.email,
      token: data.token,
    });

    this.logger.info('email enviado');
  }
}
