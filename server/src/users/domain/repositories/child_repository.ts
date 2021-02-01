import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ChildDocument } from '../../schemas/child_schema';
import { Child, ChildProps } from '../models/child_model';
import * as mongoose from 'mongoose';
import { ChildMapper } from '../mappers/child_mapper';
import { parseDateToAge } from '../../../shared/utils/parse_date_to_age';

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

  async addResult(childId: string, resultId: string): Promise<void> {
    await this.childModel.findByIdAndUpdate(childId, {
      $addToSet: { results: new mongoose.Types.ObjectId(resultId) as any },
    });
  }

  async get(childIds: string[]): Promise<Child[]> {
    return await this.childModel
      .find({
        _id: {
          $in: childIds,
        },
      })
      .lean()
      .exec()
      .then(childList => childList.map(child => ChildMapper.toDomain(child)));
  }

  async getByKindergarten(id: string): Promise<ChildProps[]> {
    const results = await this.childModel
      .find({ kindergarten: id })
      .lean()
      .exec();

    return results.filter(c => {
      const age = parseDateToAge(c.birthYear, c.birthQuarter);

      return age >= 3 && age <= 7;
    });
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
