import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
      .then(fetchAssessment => {
        if (!fetchAssessment) return null;

        return AssessmentMapper.toDomain(fetchAssessment);
      });
  }

  getAll(): Promise<Assessment[]> {
    return this.model
      .find({}, {}, { sort: { date: -1 } })
      .lean()
      .exec()
      .then(fetchAssessments => {
        return fetchAssessments.map(assessment => {
          return AssessmentMapper.toDomain(assessment);
        });
      });
  }

  getAllAssignedToInstructor(instructorId: any): Promise<Assessment[]> {
    return this.model
      .find({
        status: {
          $ne: 'done',
        },
        'kindergartens.instructorId': instructorId,
      })
      .lean()
      .exec()
      .then(fetchAssessments => {
        return fetchAssessments.map(assessment => {
          const stringifiedKindergartenWithInstructor = assessment.kindergartens.filter(
            k => k.instructorId === instructorId,
          );

          return AssessmentMapper.toDomain({
            ...assessment,
            kindergartens: stringifiedKindergartenWithInstructor,
          });
        });
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

  async update(assessment: Assessment): Promise<Assessment> {
    const assessmentDocument = await this.model.findById(assessment.id);

    await assessmentDocument.update(AssessmentMapper.toPersist(assessment));

    return assessment;
  }
}
