export class UserSignedAgreementEvent {
  constructor(
    public readonly userId: string,
    public readonly agreementId: string,
  ) {}
}
