import { UpdatedKindergartenInput } from '../../../inputs/kindergarten_input';

export class EditKindergartenCommand {
  constructor(
    public id: string,
    public kindergarten: UpdatedKindergartenInput,
  ) {}
}
