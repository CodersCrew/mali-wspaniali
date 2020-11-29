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

    return AssessmentMapper.toDomain({ ...value, kindergartens });
  }
  static toDomain(
    value: AssessmentDto,
    options?: { isNew?: boolean },
  ): Assessment {
    const id = ObjectId.create(value._id);
    const title = Title.create(value.title);
    const startDate = SimpleDate.create(value.startDate);
    const endDate = SimpleDate.create(value.endDate);
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

    if (results.isFailure) throw new Error(results.error);

    const createAssessment =
      options && options.isNew ? Assessment.create : Assessment.recreate;

    return createAssessment({
      ...value,
      _id: id.getValue(),
      title: title.getValue(),
      startDate: startDate.getValue(),
      endDate: endDate.getValue(),
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
        updated.startDate = endDate.getValue();
      } else {
        throw new Error(endDate.error.toString());
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

    return updated;
  }

  static toPersist(assessment: Assessment): AssessmentDto {
    let rawAssessment: AssessmentDto = {
      title: assessment.title.value,
      startDate: assessment.startDate.value,
      endDate: assessment.endDate.value,
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
