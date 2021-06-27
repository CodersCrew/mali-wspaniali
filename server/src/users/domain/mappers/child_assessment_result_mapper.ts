import {
  ChildAssessmentResultCore,
  ChildAssessmentResult,
} from '../models/child_assessment_result_model';
import { classToPlain } from 'class-transformer';
import { transformAndValidateSync } from 'class-transformer-validator';

export class ChildAssessmentResultMapper {
  static toDomain(
    value: ChildAssessmentResultCore,
    options: { isNew: boolean } = { isNew: false },
  ) {
    const createResult = options.isNew
      ? ChildAssessmentResult.create
      : ChildAssessmentResult.recreate;

    const result = createResult(
      transformAndValidateSync(ChildAssessmentResultCore, value, {
        transformer: { excludeExtraneousValues: true },
        validator: { validationError: { target: false, value: false } },
      }),
    );

    return result;
  }

  static toPlain(value: ChildAssessmentResult): ChildAssessmentResultCore {
    return classToPlain(value.getProps(), {
      excludeExtraneousValues: true,
    }) as ChildAssessmentResultCore;
  }

  static toPlainMany(
    values: ChildAssessmentResult[],
  ): ChildAssessmentResultCore[] {
    return values.map(ChildAssessmentResultMapper.toPlain);
  }
}
