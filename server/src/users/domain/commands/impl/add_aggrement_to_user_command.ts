export class AddAggrementToUserCommand {
  constructor(
    public readonly userId: string,
    public readonly aggrementId: string,
  ) {}
}
