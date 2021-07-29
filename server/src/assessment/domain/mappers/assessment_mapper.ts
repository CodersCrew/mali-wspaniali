import { Assessment } from '../models/assessment_model';
import { AssessmentInput } from '../../inputs/assessment_input';
import { transformAndValidateSync } from 'class-transformer-validator';
import { AssessmentCore } from '../models/assessment_model';
import { classToPlain } from 'class-transformer';

export class AssessmentMapper {
  static inputToDomain({ kindergartenIds, ...value }: AssessmentInput) {
    const kindergartens = kindergartenIds.map(id => ({
      kindergartenId: id,
      instructorId: null,
    }));

    return AssessmentMapper.toDomain({
      ...value,
      isOutdated: false,
      isDeleted: false,
      firstMeasurementStatus: 'active',
      lastMeasurementStatus: 'active',
      kindergartens,
    });
  }
  static toDomain(
    value: AssessmentCore,
    options?: { isNew?: boolean },
  ): Assessment {
    const createAssessment =
      options && options.isNew ? Assessment.create : Assessment.recreate;

    return createAssessment(
      transformAndValidateSync(AssessmentCore, value, {
        transformer: { excludeExtraneousValues: true },
        validator: { validationError: { target: false, value: false } },
      }),
    );
  }

  static toPlain(assessment: Assessment): AssessmentCore {
    const props = assessment.getProps();

    return classToPlain(props, {
      excludeExtraneousValues: true,
    }) as AssessmentCore;
  }
}
