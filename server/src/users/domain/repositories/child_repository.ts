import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ChildDocument } from '../../schemas/child_schema';
import { Child } from '../models/child_model';
import { ChildMapper } from '../mappers/child_mapper';
import { parseDateToAge } from '../../../shared/utils/parse_date_to_age';

@Injectable()
export class ChildRepository {
  constructor(
    @InjectModel('Child')
    private childModel: Model<ChildDocument>,
  ) {}

  async create(child: Child): Promise<Child> {
    const persistencedChild = ChildMapper.toPlain(child);
    const createdChild = new this.childModel(persistencedChild);

    const created = await createdChild.save();

    return ChildMapper.toDomain(created, { isNew: true });
  }

  async addResult(childId: string, resultId: string): Promise<void> {
    await this.childModel.findOneAndUpdate(
      { _id: childId },
      {
        $addToSet: { results: resultId },
      },
      {
        useFindAndModify: false,
      },
    );
  }

  async get(childIds: string[]): Promise<Child[]> {
    return await this.childModel
      .find(
        {
          _id: {
            $in: childIds,
          },
          isDeleted: false,
        },
        null,
        { sort: { firstname: 1 } },
      )
      .lean()
      .exec()
      .then(ChildMapper.toDomainMany);
  }

  async getByKindergarten(id: string): Promise<Child[]> {
    const results = await this.childModel
      .find({ kindergarten: id, isDeleted: false })
      .lean()
      .exec()
      .then(ChildMapper.toDomainMany);

    return results.filter(c => {
      const age = parseDateToAge(c.birthYear, c.birthQuarter);

      return age >= 3 && age <= 7 && !c.isDeleted;
    });
  }

  async getAll(): Promise<Child[]> {
    return await this.childModel
      .find({ isDeleted: false })
      .lean()
      .exec()
      .then(ChildMapper.toDomainMany);
  }

  async updateChild(
    id: string,
    update: { [index: string]: string | number | boolean | Date },
  ): Promise<Child> {
    const [child] = await this.get([id]);

    if (!child) {
      throw new Error('Child not found');
    }

    ChildMapper.toDomain({
      ...ChildMapper.toPlain(child),
      ...update,
    });

    const updated = await this.childModel.findOneAndUpdate(
      { _id: id },
      update,
      {
        new: true,
        useFindAndModify: false,
      },
    );

    return ChildMapper.toDomain(updated);
  }

  // for e2e purpose only
  async clearTable(): Promise<void> {
    await this.childModel.deleteMany({});
  }
}
