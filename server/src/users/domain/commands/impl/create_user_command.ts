export class CreateUserCommand {
  constructor(public readonly mail: string, public readonly password: string) {}
}
