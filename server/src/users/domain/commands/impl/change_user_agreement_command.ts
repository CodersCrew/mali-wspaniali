export class ChangeUserAgreementCommand {
  constructor(
    public readonly userId: string,
    public readonly agreementId: string,
  ) {}
}
