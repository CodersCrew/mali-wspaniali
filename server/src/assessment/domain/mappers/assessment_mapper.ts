import { Assessment, AssessmentDto } from '../models/assessment_model';
import { SimpleDate } from '../models/simple_date_value_object';
import { Result } from '../../../shared/domain/result';
import { ObjectId } from '../../../users/domain/models/object_id_value_object';
import { CreateAssessmentInput } from '../../inputs/create_assessment_input';
import { Title } from '../models/title_value_object';

export class AssessmentMapper {
  static inputToDomain({ kindergartenIds, ...value }: CreateAssessmentInput) {
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
    const mappedKindergartens = value.kindergartens.map(k => ({
      kindergartenId: ObjectId.create(k.kindergartenId).getValue(),
      instructorId: ObjectId.create(k.instructorId).getValue(),
    }));

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

  static toPersist(assessment: Assessment): AssessmentDto {
    let rawAssessment: AssessmentDto = {
      title: assessment.title.value,
      startDate: assessment.startDate.value,
      endDate: assessment.endDate.value,
      kindergartens: assessment.kindergartens.map(k => ({
        kindergartenId: k.kindergartenId.value,
        instructorId: k.instructorId.value,
      })),
    };

    if (!assessment.id.isEmpty()) {
      rawAssessment._id = assessment.id.value;
    }

    return rawAssessment;
  }
}
