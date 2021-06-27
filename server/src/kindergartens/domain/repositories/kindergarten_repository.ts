import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Kindergarten } from '../models/kindergarten_model';
import { KindergartenDocument } from '../../schemas/kindergarten_schema';
import { KindergartenMapper } from '../mappers/kindergarten_mapper';
import { UpdatedKindergartenInput } from '../../inputs/kindergarten_input';

@Injectable()
export class KindergartenRepository {
  constructor(
    @InjectModel('Kindergarten')
    private model: Model<KindergartenDocument>,
  ) {}

  getAll(): Promise<Kindergarten[]> {
    return this.model
      .find({ isDeleted: false }, {}, { sort: { number: 1 } })
      .exec()
      .then(kindergartenList => {
        return kindergartenList.map(k => KindergartenMapper.toDomainFrom(k));
      });
  }

  get(id: string): Promise<Kindergarten | null> {
    return this.model
      .findOne({ _id: id, isDeleted: false })
      .lean()
      .exec()
      .then(kindergarten =>
        kindergarten ? KindergartenMapper.toDomainFrom(kindergarten) : null,
      );
  }

  getByProps(props: { [key: string]: unknown }): Promise<Kindergarten | null> {
    return this.model
      .findOne(props)
      .lean()
      .exec()
      .then(kindergarten =>
        kindergarten ? KindergartenMapper.toDomainFrom(kindergarten) : null,
      );
  }

  getMany(ids: string[]): Promise<Kindergarten[]> {
    return this.model
      .find(
        {
          _id: {
            $in: ids,
          },
          isDeleted: false,
        },
        null,
        { sort: { name: 1 } },
      )
      .exec()
      .then(kindergartenList => {
        return kindergartenList.map(k => KindergartenMapper.toDomainFrom(k));
      });
  }

  async create(createKindergarten: Kindergarten): Promise<Kindergarten> {
    const createdKindergarden = new this.model(
      KindergartenMapper.toPlain(createKindergarten),
    );

    const result = await createdKindergarden.save();

    return KindergartenMapper.toDomainFrom(result, { isNew: true });
  }

  async update(
    kindergartenId: string,
    options: UpdatedKindergartenInput,
  ): Promise<Kindergarten> {
    const updated = await this.model.findOneAndUpdate(
      { _id: kindergartenId, isDeleted: false },
      options,
      { new: true },
    );

    return KindergartenMapper.toDomainFrom(updated);
  }

  // for e2e purpose only
  async clearTable(): Promise<void> {
    await this.model.deleteMany({});
  }
}
