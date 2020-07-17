import { Injectable } from '@nestjs/common';
import { Kindergarten } from './interfaces/kindergarten.interface';
import { KindergartenInput } from './inputs/kindergarten_input';
import { KindergartenRepository } from './domain/repositories/kindergarten_repository';

@Injectable()
export class KindergartenService {
  constructor(private kindergartenRepository: KindergartenRepository) {}

  async create(
    createKindergartenDTO: KindergartenInput,
  ): Promise<Kindergarten> {
    return this.kindergartenRepository.create(createKindergartenDTO);
  }

  async findAll(): Promise<Kindergarten[]> {
    return this.kindergartenRepository.all();
  }

  async find(kindergartenId: string): Promise<Kindergarten> {
    return this.kindergartenRepository.get(kindergartenId);
  }
}
