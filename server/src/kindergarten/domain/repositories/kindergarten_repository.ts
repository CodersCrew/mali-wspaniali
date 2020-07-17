import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Kindergarten } from '../../interfaces/kindergarten.interface';
import { KindergartenInput } from '../../inputs/kindergarten_input';

@Injectable()
export class KindergartenRepository {
  constructor(
    @InjectModel('Kindergarten')
    private readonly kindergarteneModel: Model<Kindergarten>,
  ) {}

  async create(
    createKindergartenDTO: KindergartenInput,
  ): Promise<Kindergarten> {
    const createdKindergarten = new this.kindergarteneModel(
      createKindergartenDTO,
    );
    return await createdKindergarten.save();
  }

  async all(): Promise<Kindergarten[]> {
    return await this.kindergarteneModel.find().exec();
  }

  async get(id: string): Promise<Kindergarten> {
    return await this.kindergarteneModel.findById(id).exec();
  }
}
