import { UpdatedKindergartenInput } from '../../../inputs/kindergarten_input';

export class EditKindergartenCommand {
  constructor(
    public readonly id: string,
    public readonly kindergarten: UpdatedKindergartenInput,
  ) {}
}
