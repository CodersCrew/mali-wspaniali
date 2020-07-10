export class CreateBulkKeyCodeCommand {
  constructor(
    public readonly createdBy: string,
    public readonly ammount: number,
  ) {}
}
