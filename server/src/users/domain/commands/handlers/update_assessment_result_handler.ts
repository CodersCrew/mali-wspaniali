import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';

import { UpdateAssessmentResultCommand } from '../impl';
import { ChildAssessmentResultRepository } from '../../repositories/child_assessment_result_repository';
import { PartialChildResult } from '../../../inputs/child_result_input';

@CommandHandler(UpdateAssessmentResultCommand)
export class UpdateAssessmentResultHandler
  implements ICommandHandler<UpdateAssessmentResultCommand> {
  constructor(
    private readonly resultRepository: ChildAssessmentResultRepository,
  ) {}

  async execute({ result }: UpdateAssessmentResultCommand): Promise<void> {
    const createdResult = await this.resultRepository.update(result);

    // return createdResult;
  }
}
