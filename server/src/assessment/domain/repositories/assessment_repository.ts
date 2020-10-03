import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AssessmentDto } from '../../../assessment/domain/models/assessment_model';
import { Assessment } from '../models/assessment_model';

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

  async getAll(): Promise<AssessmentProps[]> {
    return await this.model
      .find({}, {}, { sort: { date: -1 } })
      .exec()
      .then(assessments =>
        assessments.map(assessment => assessment.toObject()),
      );
  }

  async create(initialData: AssessmentDto): Promise<Assessment> {
    const createdAssessment = new this.model(initialData);

    const result = await createdAssessment
      .save()
      .then(agreement => agreement.toObject());

    const assessment = Assessment.create(result);

    return assessment;
  }
}
