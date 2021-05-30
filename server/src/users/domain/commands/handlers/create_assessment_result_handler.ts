import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateAssessmentResultCommand } from '../impl';
import { ChildAssessmentResultRepository } from '../../repositories/child_assessment_result_repository';
import { PartialChildResult } from '../../../inputs/child_result_input';

@CommandHandler(CreateAssessmentResultCommand)
export class CreateAssessmentResultHandler
  implements ICommandHandler<CreateAssessmentResultCommand> {
  constructor(
    private readonly resultRepository: ChildAssessmentResultRepository,
  ) {}

  async execute({
    result,
  }: CreateAssessmentResultCommand): Promise<PartialChildResult> {
    const createdResult = await this.resultRepository.create(result);

    return createdResult;
  }
}
