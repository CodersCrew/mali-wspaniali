import { KindergartenInput } from '../../../inputs/kindergarten_input';

export class CreateKindergartenCommand {
  constructor(public readonly kindergarten: KindergartenInput) {}
}
