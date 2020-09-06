import { EditKindergartenInput } from 'src/kindergartens/inputs/edit_kindergarten_input';

export class EditKindergartenCommand {
  constructor(
    public readonly id: string,
    public readonly kindergarten: EditKindergartenInput,
  ) {}
}
