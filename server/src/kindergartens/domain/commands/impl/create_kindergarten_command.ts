import { CreateKindergartenInput } from '../../../inputs/create_kindergarten_input';

export class CreateKindergartenCommand {
  constructor(public readonly kindergarten: CreateKindergartenInput) {}
}
