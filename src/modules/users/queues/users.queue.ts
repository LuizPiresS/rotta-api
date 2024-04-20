import { IUsersQueue } from './interfaces/users.queue.interface';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserSendValidationEmailEvent } from '../../../common/events/user-send-validation-email.event';

export class UsersQueue implements IUsersQueue {
  constructor(
    @InjectQueue('users') private readonly usersQueue: Queue,
    private readonly eventEmitter: EventEmitter2,
  ) { }

  async userSendValidationEmail(
    name: string,
    email: string,
    token: string,
  ): Promise<void> {
    this.eventEmitter.emit(
      'user.send.validation.email',
      new UserSendValidationEmailEvent(name, email, token),
    );
    await this.usersQueue.add(
      'user.send.validation.email',
      new UserSendValidationEmailEvent(name, email, token),
    );
  }
}
