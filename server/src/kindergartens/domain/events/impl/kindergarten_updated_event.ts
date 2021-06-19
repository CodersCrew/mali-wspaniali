import { KindergartenCore } from '../../models/kindergarten_model';

export class KindergartenUpdatedEvent {
  constructor(public id: string, public updates: Partial<KindergartenCore>) {}
}
