import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';

import { CreateAssessmentResultCommand } from '../impl';
import { ChildAssessmentResultMapper } from '../../mappers/child_assessment_result_mapper';
import {
  ChildAssessmentResult,
  ChildAssessmentResultCore,
} from '../../models/child_assessment_result_model';

@CommandHandler(CreateAssessmentResultCommand)
export class CreateAssessmentResultHandler
  implements ICommandHandler<CreateAssessmentResultCommand> {
  constructor(private publisher: EventPublisher) {}

  async execute({
    result,
  }: CreateAssessmentResultCommand): Promise<ChildAssessmentResult> {
    const createdResult = this.publisher.mergeObjectContext(
      ChildAssessmentResultMapper.toDomain(
        result as ChildAssessmentResultCore,
        { isNew: true },
      ),
    );

    createdResult.commit();

    return createdResult;
  }
}
