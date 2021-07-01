export class CreateBulkKeyCodeCommand {
  constructor(
    public createdBy: string,
    public amount: number,
    public target: string,
  ) {}
}
