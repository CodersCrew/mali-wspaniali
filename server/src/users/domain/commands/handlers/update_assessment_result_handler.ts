import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';

import { UpdateAssessmentResultCommand } from '../impl';
import { ChildAssessmentResultRepository } from '../../repositories/child_assessment_result_repository';
import { PartialChildResult } from '../../../inputs/child_result_input';

@CommandHandler(UpdateAssessmentResultCommand)
export class UpdateAssessmentResultHandler
  implements ICommandHandler<UpdateAssessmentResultCommand> {
  constructor(
    private readonly resultRepository: ChildAssessmentResultRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute({
    result,
  }: UpdateAssessmentResultCommand): Promise<PartialChildResult> {
    const updatedResult = this.publisher.mergeObjectContext(
      (await this.resultRepository.get(result._id!)) as any,
    );

    updatedResult.update(result);

    updatedResult.commit();

    return updatedResult.getProps();
  }
}
