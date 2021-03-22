import {
  Assessment,
  AssessmentDto,
  AssessmentProps,
} from '../models/assessment_model';
import { SimpleDate } from '../models/simple_date_value_object';
import { Result } from '../../../shared/domain/result';
import { ObjectId } from '../../../users/domain/models/object_id_value_object';
import {
  AssessmentInput,
  UpdatedAssessmentInput,
} from '../../inputs/assessment_input';
import { Title } from '../models/title_value_object';
import { KindergartenWithInstructor } from '../models/kindergarten_with_instructor_value_object';

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
      status: 'active',
      firstMeasurementStatus: 'active',
      lastMeasurementStatus: 'active',
      kindergartens,
    });
  }
  static toDomain(
    value: AssessmentDto,
    options?: { isNew?: boolean },
  ): Assessment {
    const id = ObjectId.create(value._id);
    const title = Title.create(value.title);
    const startDate = SimpleDate.create(value.startDate);
    const endDate = SimpleDate.create(value.endDate);
    const firstMeasurementStartDate = SimpleDate.create(
      value.firstMeasurementStartDate,
    );
    const firstMeasurementEndDate = SimpleDate.create(
      value.firstMeasurementEndDate,
    );
    const lastMeasurementStartDate = SimpleDate.create(
      value.lastMeasurementStartDate,
    );
    const lastMeasurementEndDate = SimpleDate.create(
      value.lastMeasurementEndDate,
    );
    const mappedKindergartens = value.kindergartens.map(k => {
      const kindergartenWithInstructorResult = KindergartenWithInstructor.create(
        {
          kindergartenId: ObjectId.create(k.kindergartenId).getValue(),
          instructorId: ObjectId.create(k.instructorId).getValue(),
        },
      );

      if (kindergartenWithInstructorResult.isFailure) {
        throw new Error(kindergartenWithInstructorResult.error as string);
      }

      return kindergartenWithInstructorResult.getValue();
    });

    const results = Result.combine([startDate, endDate]);

    if (results.isFailure) throw new Error(results.error as string);

    const createAssessment =
      options && options.isNew ? Assessment.create : Assessment.recreate;

    return createAssessment({
      ...value,
      _id: id.getValue(),
      title: title.getValue(),
      startDate: startDate.getValue(),
      endDate: endDate.getValue(),
      firstMeasurementStartDate: firstMeasurementStartDate.getValue(),
      firstMeasurementEndDate: firstMeasurementEndDate.getValue(),
      lastMeasurementStartDate: lastMeasurementStartDate.getValue(),
      lastMeasurementEndDate: lastMeasurementEndDate.getValue(),
      kindergartens: mappedKindergartens,
    });
  }

  static toUpdated(value: UpdatedAssessmentInput): Partial<AssessmentProps> {
    let updated: Partial<AssessmentProps> = {};

    if (value.title) {
      const title = Title.create(value.title);

      if (title.isSuccess) {
        updated.title = title.getValue();
      } else {
        throw new Error(title.error.toString());
      }
    }

    if (value.startDate) {
      const startDate = SimpleDate.create(value.startDate);

      if (startDate.isSuccess) {
        updated.startDate = startDate.getValue();
      } else {
        throw new Error(startDate.error.toString());
      }
    }

    if (value.endDate) {
      const endDate = SimpleDate.create(value.endDate);

      if (endDate.isSuccess) {
        updated.endDate = endDate.getValue();
      } else {
        throw new Error(endDate.error.toString());
      }
    }

    if (value.firstMeasurementStartDate) {
      const date = SimpleDate.create(value.firstMeasurementStartDate);

      if (date.isSuccess) {
        updated.firstMeasurementStartDate = date.getValue();
      } else {
        throw new Error(date.error.toString());
      }
    }

    if (value.firstMeasurementEndDate) {
      const date = SimpleDate.create(value.firstMeasurementEndDate);

      if (date.isSuccess) {
        updated.firstMeasurementEndDate = date.getValue();
      } else {
        throw new Error(date.error.toString());
      }
    }

    if (value.lastMeasurementStartDate) {
      const date = SimpleDate.create(value.lastMeasurementStartDate);

      if (date.isSuccess) {
        updated.lastMeasurementStartDate = date.getValue();
      } else {
        throw new Error(date.error.toString());
      }
    }

    if (value.lastMeasurementEndDate) {
      const date = SimpleDate.create(value.lastMeasurementEndDate);

      if (date.isSuccess) {
        updated.lastMeasurementEndDate = date.getValue();
      } else {
        throw new Error(date.error.toString());
      }
    }

    if (value.kindergartens) {
      updated.kindergartens = value.kindergartens.map(k => {
        const kindergartenWithInstructorResult = KindergartenWithInstructor.create(
          {
            kindergartenId: ObjectId.create(k.kindergartenId).getValue(),
            instructorId: ObjectId.create(k.instructorId).getValue(),
          },
        );

        if (kindergartenWithInstructorResult.isFailure) {
          throw new Error(kindergartenWithInstructorResult.error as string);
        }

        return kindergartenWithInstructorResult.getValue();
      });
    }

    if ('isOutdated' in value) {
      updated.isOutdated = value.isOutdated;
    }

    if ('isDeleted' in value) {
      updated.isDeleted = value.isDeleted;
    }

    if (value.status) {
      updated.status = value.status;
    }

    if (value.firstMeasurementStatus) {
      updated.firstMeasurementStatus = value.firstMeasurementStatus;
    }

    if (value.lastMeasurementStatus) {
      updated.lastMeasurementStatus = value.lastMeasurementStatus;
    }

    return updated;
  }

  static toPersist(assessment: Assessment): AssessmentDto {
    let rawAssessment: AssessmentDto = {
      title: assessment.title.value,
      isOutdated: assessment.isOutdated,
      isDeleted: assessment.isDeleted,
      startDate: assessment.startDate.value,
      endDate: assessment.endDate.value,
      firstMeasurementStartDate: assessment.firstMeasurementStartDate.value,
      firstMeasurementEndDate: assessment.firstMeasurementEndDate.value,
      lastMeasurementStartDate: assessment.lastMeasurementStartDate.value,
      lastMeasurementEndDate: assessment.lastMeasurementEndDate.value,
      status: assessment.status,
      firstMeasurementStatus: assessment.firstMeasurementStatus,
      lastMeasurementStatus: assessment.lastMeasurementStatus,
      kindergartens: assessment.kindergartens.map(k => ({
        kindergartenId: k.value.kindergartenId.value,
        instructorId: k.value.instructorId.value,
      })),
    };

    if (!assessment.id.isEmpty()) {
      rawAssessment._id = assessment.id.value;
    }

    return rawAssessment;
  }
}
