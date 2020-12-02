import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Assessment } from '../models/assessment_model';
import { AssessmentMapper } from '../mappers/assessment_mapper';

import {
  AssessmentDocument,
  KindergartenWithInstructorDocumentProps,
} from '../../schemas/assessment_schema';

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
      .then(a => {
        const _id = (a._id as Types.ObjectId).toHexString();
        const stringifiedKindergartenWithInstructor = a.kindergartens.map(k =>
          this.mapToRawKindergarten(k),
        );

        if (!a) return null;

        return AssessmentMapper.toDomain({
          ...a,
          _id,
          kindergartens: stringifiedKindergartenWithInstructor,
        });
      });
  }

  getAll(): Promise<Assessment[]> {
    return this.model
      .find({}, {}, { sort: { date: -1 } })
      .lean()
      .exec()
      .then(assessments => {
        return assessments.map(a => {
          const _id = (a._id as Types.ObjectId).toHexString();

          const stringifiedKindergartenWithInstructor = a.kindergartens.map(k =>
            this.mapToRawKindergarten(k),
          );

          return AssessmentMapper.toDomain({
            ...a,
            _id,
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

  async update(assessment: Assessment): Promise<boolean> {
    const assessmentDocument = await this.model.findById(
      assessment.id.toString(),
    );

    const result = await assessmentDocument.update(
      AssessmentMapper.toPersist(assessment),
    );

    return result.ok === 1;
  }

  private mapToRawKindergarten(
    kindergarten: KindergartenWithInstructorDocumentProps,
  ) {
    return {
      kindergartenId: kindergarten.kindergartenId?.toHexString() || null,
      instructorId: kindergarten.instructorId?.toHexString() || null,
    };
  }
}
