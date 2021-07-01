import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Agreement } from '../models/agreement';
import { AgreementMapper } from '../mappers/agreement_mapper';

import { AgreementDocument } from '../../schemas/agreement_schema';

@Injectable()
export class AgreementRepository {
  constructor(
    @InjectModel('Agreement')
    private model: Model<AgreementDocument>,
  ) {}

  async get(id: string): Promise<Agreement | undefined> {
    const agreement = await this.model.findOne({ _id: id }).lean();

    if (agreement) return AgreementMapper.toDomain(agreement);
  }

  getAll(): Promise<Agreement[]> {
    return this.model
      .find({}, {}, { sort: { date: -1 } })
      .exec()
      .then(agreements =>
        agreements.map(agreement => {
          return AgreementMapper.toDomain(agreement);
        }),
      );
  }

  async create(createAgreementDTO: { text: string }): Promise<Agreement> {
    const agreement = AgreementMapper.toDomain(createAgreementDTO);

    await new this.model(agreement.getProps()).save();

    return agreement;
  }
}
