import { ResultInput } from '../../../inputs/result_input';

export class AddChildResultCommand {
  constructor(
    public result: ResultInput,
    public childId: string,
    public rootResultId?: string,
  ) {}
}
