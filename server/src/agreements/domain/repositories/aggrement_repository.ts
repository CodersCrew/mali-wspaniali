import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  AggrementDocument,
  AggrementProps,
} from '../../schemas/aggrement_schema';

@Injectable()
export class AggrementRepository {
  constructor(
    @InjectModel('Aggrement')
    private readonly model: Model<AggrementDocument>,
  ) {}

  async get(id: string): Promise<AggrementProps> {
    return await this.model.findById(id).exec();
  }

  async getAll(): Promise<AggrementProps[]> {
    return await this.model
      .find({}, {}, { sort: { date: -1 } })
      .exec()
      .then(aggrements => aggrements.map(aggrement => aggrement.toObject()));
  }

  async create(createAgreementDTO: { text: string }): Promise<AggrementProps> {
    const createdAggrement = new this.model(createAgreementDTO);

    return await createdAggrement
      .save()
      .then(aggrement => aggrement.toObject());
  }
}
