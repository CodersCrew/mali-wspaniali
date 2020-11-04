import { UpdatedChildInput } from '../../../inputs/child_input';

export class EditChildCommand {
  constructor(
    public readonly child: UpdatedChildInput,
    public readonly userId: string,
  ) {}
}
