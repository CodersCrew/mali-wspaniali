import { KindergartenProps } from '../../models/kindergarten_model';

export class KindergartenUpdatedEvent {
  constructor(
    public readonly id: string,
    public readonly updates: Partial<KindergartenProps>,
  ) {}
}
