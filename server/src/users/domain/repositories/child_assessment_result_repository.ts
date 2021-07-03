import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ChildAssessmentResultDocument } from 'src/users/schemas/child_assessment_result_schema';
import {
  ChildAssessmentResult,
  ChildAssessmentResultCore,
} from '../models/child_assessment_result_model';
import { ChildAssessmentResultMapper } from '../mappers/child_assessment_result_mapper';
import {
  PartialChildResult,
  PartialUpdateChildResultInput,
} from 'src/users/inputs/child_result_input';

@Injectable()
export class ChildAssessmentResultRepository {
  constructor(
    @InjectModel('ChildAssessmentResult')
    private childResultModel: Model<ChildAssessmentResultDocument>,
  ) {}

  async create(
    childResult: ChildAssessmentResultCore,
  ): Promise<ChildAssessmentResult> {
    const createdResult = new this.childResultModel(childResult);

    const result = await createdResult.save();

    return ChildAssessmentResultMapper.toDomain(result.toObject());
  }

  async update(
    updatedInput: PartialUpdateChildResultInput,
  ): Promise<PartialChildResult> {
    const {
      _id,
      childId,
      kindergartenId,
      assessmentId,
      ...rest
    } = updatedInput;
    const foundResult = await this.childResultModel.findOne({
      _id: updatedInput._id,
    });

    await foundResult.update(rest).exec();

    return this.childResultModel.findById(updatedInput._id);
  }

  async getByKindergarten(
    kindergartenId: string,
    assessmentId: string,
  ): Promise<PartialChildResult[]> {
    const result = await this.childResultModel
      .find({
        assessmentId,
        kindergartenId,
      })
      .lean()
      .exec();

    return result;
  }

  async get(id: string): Promise<ChildAssessmentResult> {
    const result = await this.childResultModel
      .findOne({
        _id: id,
      })
      .lean()
      .exec()
      .then(value =>
        value
          ? ChildAssessmentResultMapper.toDomain(
              (value as unknown) as ChildAssessmentResultCore,
            )
          : value,
      );

    return (result as unknown) as Promise<ChildAssessmentResult>;
  }

  async getByChild(id: string): Promise<ChildAssessmentResult[]> {
    const result = await this.childResultModel
      .find({
        childId: id,
      })
      .lean()
      .exec()
      .then(ChildAssessmentResultMapper.toDomainMany);

    return result;
  }

  async getByAssessment(id: string): Promise<ChildAssessmentResult[]> {
    const result = await this.childResultModel
      .find({
        assessmentId: id,
      })
      .lean()
      .exec()
      .then(ChildAssessmentResultMapper.toDomainMany);

    return result;
  }

  getMany(childIds: string[]): Promise<ChildAssessmentResult[]> {
    return this.childResultModel
      .find({ childId: { $in: childIds }, isDeleted: false })
      .lean()
      .exec()
      .then(ChildAssessmentResultMapper.toDomainMany);
  }

  // for e2e purpose only
  async clearTable(): Promise<void> {
    await this.childResultModel.deleteMany({});
  }
}
