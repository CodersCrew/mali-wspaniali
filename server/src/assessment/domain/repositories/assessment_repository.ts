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
      .then(fetchAssessment => {
        if (!fetchAssessment) return null;

        const _id = (fetchAssessment._id as Types.ObjectId).toHexString();
        const stringifiedKindergartenWithInstructor = fetchAssessment.kindergartens.map(
          k => this.mapToRawKindergarten(k),
        );

        return AssessmentMapper.toDomain({
          ...fetchAssessment,
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
      .then(fetchAssessments => {
        return fetchAssessments.map(assessment => {
          const _id = (assessment._id as Types.ObjectId).toHexString();

          const stringifiedKindergartenWithInstructor = assessment.kindergartens.map(
            k => this.mapToRawKindergarten(k),
          );

          return AssessmentMapper.toDomain({
            ...assessment,
            _id,
            kindergartens: stringifiedKindergartenWithInstructor,
          });
        });
      });
  }

  getAllAssignedToInstructor(instructorId: any): Promise<Assessment[]> {
    return this.model
      .find({
        'kindergartens.instructorId': instructorId,
      })
      .lean()
      .exec()
      .then(fetchAssessments => {
        return fetchAssessments.map(assessment => {
          const _id = (assessment._id as Types.ObjectId).toHexString();

          const stringifiedKindergartenWithInstructor = assessment.kindergartens
            .map(k => this.mapToRawKindergarten(k))
            .filter(k => k.instructorId === instructorId);

          return AssessmentMapper.toDomain({
            ...assessment,
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

  async update(assessment: Assessment): Promise<Assessment> {
    const assessmentDocument = await this.model.findById(
      assessment.id.toString(),
    );

    await assessmentDocument.update(AssessmentMapper.toPersist(assessment));

    return assessment;
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
