import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AssessmentDto } from '../../../assessment/domain/models/assessment_model';
import { Assessment } from '../models/assessment_model';
import { ObjectId } from '../../../users/domain/models/object_id_value_object';

import {
  AssessmentDocument,
  AssessmentProps,
} from '../../schemas/assessment_schema';

@Injectable()
export class AssessmentRepository {
  constructor(
    @InjectModel('Assessment')
    private readonly model: Model<AssessmentDocument>,
  ) {}

  async get(id: string): Promise<AssessmentProps> {
    return await this.model.findById(id).exec();
  }

  async getAll(): Promise<AssessmentDto[]> {
    return await this.model
      .find({}, {}, { sort: { date: -1 } })
      .exec()
      .then(assessments =>
        assessments.map(assessment => assessment.toObject()),
      );
  }

  async create(initialData: AssessmentDto): Promise<Assessment> {
    const createdAssessment = new this.model(
      mapAssessmenDtotIntoModelInput(initialData),
    );

    const result = await createdAssessment.save().then(assessment => {
      const parsedAssessment = assessment.toObject();

      parsedAssessment.kindergartens = parsedAssessment.kindergartens.map(
        k => ({ kindergartenId: ObjectId.create(k.kindergartenId).getValue() }),
      );

      return parsedAssessment;
    });

    const assessment = Assessment.create(result);

    return assessment;
  }
}

function mapAssessmenDtotIntoModelInput(value: AssessmentDto) {
  return {
    ...value,
    kindergartens: value.kindergartenIds.map(k => ({ kindergartenId: k })),
  };
}
