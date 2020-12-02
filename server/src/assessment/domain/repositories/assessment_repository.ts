import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AssessmentDto } from '../../../assessment/domain/models/assessment_model';
import { Assessment } from '../models/assessment_model';
import { AssessmentMapper } from '../mappers/assessment_mapper';

import { AssessmentDocument } from '../../schemas/assessment_schema';

@Injectable()
export class AssessmentRepository {
  constructor(
    @InjectModel('Assessment')
    private readonly model: Model<AssessmentDocument>,
  ) {}

  get(id: string): Promise<Assessment> {
    return this.model
      .findById(id)
      .lean()
      .exec()
      .then(a => (a ? AssessmentMapper.toDomain(a) : null));
  }

  getAll(): Promise<Assessment[]> {
    return this.model
      .find({}, {}, { sort: { date: -1 } })
      .lean()
      .exec()
      .then(assessments => {
        return assessments.map(a => AssessmentMapper.toDomain(a));
      });
  }

  async create(newAssessment: Assessment): Promise<Assessment> {
    const createdAssessment = new this.model(
      AssessmentMapper.toPersist(newAssessment),
    );

    const result = await createdAssessment
      .save()
      .then(assessment => assessment.toObject());

    return AssessmentMapper.toDomain(result, { isNew: true });
  }

  async update(assessment: Assessment): Promise<boolean> {
    const assessmentDocument = await this.model.findById(
      assessment.id.toString(),
    );

    let result = await assessmentDocument.update(
      AssessmentMapper.toPersist(assessment),
    );

    return result.ok === 1;
  }
}
