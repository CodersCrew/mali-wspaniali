import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ChildAssessmentResultProps } from '../models/child_result_model';
import { ChildAssessmentResultDocument } from 'src/users/schemas/child_assessment_result_schema';
import {
  PartialChildResult,
  PartialChildResultInput,
  PartialUpdateChildResultInput,
} from 'src/users/inputs/child_result_input';

@Injectable()
export class ChildAssessmentResultRepository {
  constructor(
    @InjectModel('ChildAssessmentResult')
    private readonly childResultModel: Model<ChildAssessmentResultDocument>,
  ) {}

  async create(
    childResult: PartialChildResultInput,
  ): Promise<ChildAssessmentResultProps> {
    const createdResult = new this.childResultModel({
      ...childResult,
    });

    const result = await createdResult.save();

    return result.toObject();
  }

  async update(updatedInput: PartialUpdateChildResultInput): Promise<void> {
    const {
      _id,
      childId,
      kindergartenId,
      assessmentId,
      ...rest
    } = updatedInput;
    const foundResult = await this.childResultModel.findById(updatedInput._id);

    await foundResult.update(rest).exec();
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
}
