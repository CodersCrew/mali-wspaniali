export class CreateBulkKeyCodeCommand {
  constructor(
    public readonly createdBy: string,
    public readonly amount: number,
    public readonly target: string,
  ) {}
}
