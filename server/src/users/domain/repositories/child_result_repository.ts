import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ChildResultProps } from '../models/child_result_model';
import { ChildResultDocument } from '../../schemas/child_result_schema';
import { ResultInput } from '../../inputs/result_input';

@Injectable()
export class ChildResultRepository {
  constructor(
    @InjectModel('ChildResult')
    private readonly childResultModel: Model<ChildResultDocument>,
  ) {}

  async create(childResultDTO: {
    test: ResultInput;
    childId: string;
  }): Promise<ChildResultDocument> {
    const createdChild = new this.childResultModel(childResultDTO);

    return await createdChild.save();
  }

  async get(childId: string): Promise<ChildResultProps[]> {
    return await this.childResultModel
      .find({ childId })
      .lean()
      .exec();
  }

  // for e2e purpose only
  async clearTable(): Promise<void> {
    await this.childResultModel.deleteMany({});
  }
}
