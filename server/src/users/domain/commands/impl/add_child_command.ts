import { ChildInput } from '../../../inputs/child_input';

export class AddChildCommand {
  constructor(
    public readonly child: ChildInput,
    public readonly userId: string,
  ) {}
}
