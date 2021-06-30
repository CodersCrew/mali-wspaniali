export class ChangePasswordCommand {
  constructor(public jwt: string, public password: string) {}
}
