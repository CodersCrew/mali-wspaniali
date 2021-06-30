import { UpdatedChildInput } from '../../../inputs/child_input';

export class EditChildCommand {
  constructor(public child: UpdatedChildInput, public userId: string) {}
}
