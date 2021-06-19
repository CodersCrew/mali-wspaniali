import { ChildInput } from '../../../inputs/child_input';

export class AddChildCommand {
  constructor(public child: ChildInput, public userId: string) {}
}
