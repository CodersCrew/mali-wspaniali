import { ResultInput } from '../../../inputs/result_input';

export class AddChildResultCommand {
  constructor(
    public readonly result: ResultInput,
    public readonly childId: string,
  ) {}
}
