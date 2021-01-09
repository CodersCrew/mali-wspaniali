import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  AgreementDocument,
  AgreementProps,
} from '../../schemas/agreement_schema';

@Injectable()
export class AgreementRepository {
  constructor(
    @InjectModel('Agreement')
    private readonly model: Model<AgreementDocument>,
  ) {}

  async get(id: string): Promise<AgreementProps> {
    return await this.model
      .findById(id)
      .lean()
      .exec();
  }

  async getAll(): Promise<AgreementProps[]> {
    return await this.model
      .find({}, {}, { sort: { date: -1 } })
      .exec()
      .then(agreements => agreements.map(agreement => agreement.toObject()));
  }

  async create(createAgreementDTO: { text: string }): Promise<AgreementProps> {
    const createdAgreement = new this.model(createAgreementDTO);

    return await createdAgreement
      .save()
      .then(agreement => agreement.toObject());
  }
}
