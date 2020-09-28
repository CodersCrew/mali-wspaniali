export class CreateKeyCodeCommand {
  constructor(
    public readonly createdBy: string,
    public readonly target: string,
  ) {}
}
