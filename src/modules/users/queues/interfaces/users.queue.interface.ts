export interface IUsersQueue {
  userSendValidationEmail(
    name: string,
    email: string,
    token: string,
  ): Promise<void>;
}
