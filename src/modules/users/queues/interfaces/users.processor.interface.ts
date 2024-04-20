import { Job } from 'bull';
import { UserSendValidationEmailEvent } from '../../../../common/events/user-send-validation-email.event';

export interface IUsersProcessor {
  sendValidationEmail({
    data,
  }: Job<UserSendValidationEmailEvent>): Promise<void>;
}
