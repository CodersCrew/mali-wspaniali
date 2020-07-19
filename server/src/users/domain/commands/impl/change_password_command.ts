export class ChangePasswordCommand {
  constructor(public readonly jwt: string, public readonly password: string) {}
}
