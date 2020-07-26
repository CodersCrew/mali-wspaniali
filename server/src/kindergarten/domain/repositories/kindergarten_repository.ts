import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Kindergarten } from '../../interfaces/kindergarten.interface';
import { KindergartenInput } from '../../inputs/kindergarten_input';
import { KindergartenProps } from '../models/kindergarten_model';

@Injectable()
export class KindergartenRepository {
  constructor(
    @InjectModel('Kindergarten')
    private readonly kindergartenModel: Model<Kindergarten>,
  ) {}

  async create(
    createKindergartenDTO: KindergartenInput,
  ): Promise<KindergartenProps> {
    const createdKindergarten = new this.kindergartenModel(
      createKindergartenDTO,
    );
    const kindergarten = await createdKindergarten.save();
    return kindergarten.toObject();
  }

  async all(): Promise<KindergartenProps[]> {
    const kindergartens = await this.kindergartenModel.find().exec();
    return kindergartens.map(kindergarten => kindergarten.toObject());
  }

  async get(id: string): Promise<KindergartenProps> {
    return await this.kindergartenModel
      .findById(id)
      .exec()
      .then(kindergarten => kindergarten.toObject());
  }
}
