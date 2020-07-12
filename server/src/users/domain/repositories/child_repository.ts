import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ChildDocument } from '../../schemas/child_schema';
import { ChildProps } from '../models/child_model';
import * as mongoose from 'mongoose';

@Injectable()
export class ChildRepository {
  constructor(
    @InjectModel('Child')
    private readonly childModel: Model<ChildDocument>,
  ) {}

  async create(childDTO: ChildProps): Promise<ChildDocument> {
    const createdChild = new this.childModel(childDTO);

    return await createdChild.save();
  }

  async get(
    childIds: mongoose.Schema.Types.ObjectId[],
  ): Promise<ChildDocument[]> {
    return await this.childModel.find({ _id: childIds });
  }

  // for e2e purpose only
  async clearTable(): Promise<void> {
    await this.childModel.deleteMany({});
  }
}
