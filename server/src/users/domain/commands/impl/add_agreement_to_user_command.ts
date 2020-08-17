export class AddAgreementToUserCommand {
  constructor(
    public readonly userId: string,
    public readonly agreementId: string,
  ) {}
}
