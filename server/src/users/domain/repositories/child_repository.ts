import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ChildDocument } from '../../schemas/child_schema';
import { Child, ChildProps } from '../models/child_model';
import * as mongoose from 'mongoose';
import { ChildMapper } from '../mappers/child_mapper';

@Injectable()
export class ChildRepository {
  constructor(
    @InjectModel('Child')
    private readonly childModel: Model<ChildDocument>,
  ) {}

  async create(child: Child): Promise<Child> {
    const persistencedChild = ChildMapper.toPersistence(child);
    const createdChild = new this.childModel(persistencedChild);

    const created = await createdChild.save();

    return ChildMapper.toDomain(created, { isNew: true });
  }

  async addResult(
    childId: string,
    resultId: mongoose.Schema.Types.ObjectId,
  ): Promise<void> {
    await this.childModel.findByIdAndUpdate(childId, {
      $addToSet: { results: resultId },
    });
  }

  async get(
    childIds: mongoose.Schema.Types.ObjectId[] | string[],
  ): Promise<Child[]> {
    return await this.childModel
      .find({ _id: childIds })
      .lean()
      .exec()
      .then(childList => childList.map(child => ChildMapper.toDomain(child)));
  }

  async getByKindergarten(id: string): Promise<ChildProps[]> {
    return await this.childModel.find({ kindergarten: id }).exec();
  }

  async getAll(): Promise<Child[]> {
    return await this.childModel
      .find()
      .lean()
      .exec()
      .then(childList => childList.map(child => ChildMapper.toDomain(child)));
  }

  async updateChild(
    id: string,
    update: { [index: string]: string | number },
  ): Promise<Child> {
    const [child] = await this.get([id]);

    if (!child) {
      throw new Error('Child not found');
    }

    ChildMapper.toDomain({
      ...ChildMapper.toPersistence(child),
      ...update,
    });

    const updated = await this.childModel.findByIdAndUpdate(id, update, {
      new: true,
    });

    return ChildMapper.toDomain(updated);
  }

  // for e2e purpose only
  async clearTable(): Promise<void> {
    await this.childModel.deleteMany({});
  }
}
