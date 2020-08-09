import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { KindergartenProps } from '../models/kindergarten_model';
import { KindergartenDocument } from '../../schemas/kindergarten_schema';
import { CreateKindergartenInput } from '../../inputs/create_kindergarten_input';

@Injectable()
export class KindergartenRepository {
  constructor(
    @InjectModel('Kindergarten')
    private readonly model: Model<KindergartenDocument>,
  ) {}

  async getAll(): Promise<KindergartenProps[]> {
    return await this.model.find({}, {}, { sort: { number: 1 } }).exec();
  }

  async get(id: string): Promise<KindergartenProps> {
    return await this.model.findById(id).exec();
  }

  async getMany(ids: string[]): Promise<KindergartenProps[]> {
    return await this.model.find({ _id: ids }).exec();
  }

  async create(
    createKindergartenDTO: CreateKindergartenInput,
  ): Promise<KindergartenProps> {
    const createdKeyCode = new this.model(createKindergartenDTO);

    return await createdKeyCode.save();
  }

  async removeKindergarten(kindergartenId: string): Promise<void> {
    this.model.findByIdAndDelete(kindergartenId).exec();
  }

  // for e2e purpose only
  async clearTable(): Promise<void> {
    await this.model.deleteMany({});
  }
}
