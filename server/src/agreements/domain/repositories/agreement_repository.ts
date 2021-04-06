import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Agreement } from '../models/agreement';
import { AgreementMapper } from '../mappers/agreement_mapper';

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

  async get(id: string): Promise<Agreement | undefined> {
    const rawAgreement = await this.model.findById(id).lean();

    if (rawAgreement) return AgreementMapper.toDomain(rawAgreement);
  }

  getAll(): Promise<AgreementProps[]> {
    return this.model
      .find({}, {}, { sort: { date: -1 } })
      .exec()
      .then(agreements =>
        agreements.map(agreement => {
          const parsedAgreement = agreement.toObject();

          return { ...parsedAgreement, _id: parsedAgreement._id.toString() };
        }),
      );
  }

  create(createAgreementDTO: { text: string }): Promise<AgreementProps> {
    const createdAgreement = new this.model(createAgreementDTO);

    return createdAgreement.save().then(agreement => {
      const parsedAgreement = agreement.toObject();

      return { ...parsedAgreement, _id: agreement._id.toString() };
    });
  }
}
