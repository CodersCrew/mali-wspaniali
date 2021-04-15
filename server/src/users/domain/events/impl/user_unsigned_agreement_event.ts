export class UserUnsignedAgreementEvent {
  constructor(
    public readonly userId: string,
    public readonly agreementId: string,
  ) {}
}
