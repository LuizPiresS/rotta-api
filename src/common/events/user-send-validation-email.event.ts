export class UserSendValidationEmailEvent {
  constructor(
    readonly name: string,
    readonly email: string,
    readonly token: string,
  ) { }
}
