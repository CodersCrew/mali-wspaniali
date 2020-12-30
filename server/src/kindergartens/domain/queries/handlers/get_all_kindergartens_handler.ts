import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetAllKindergartensQuery } from '../impl';
import { Kindergarten } from '../../models/kindergarten_model';
import { KindergartenRepository } from '../../repositories/kindergarten_repository';

@QueryHandler(GetAllKindergartensQuery)
export class GetAllKindergartensHandler
  implements IQueryHandler<GetAllKindergartensQuery> {
  constructor(private readonly repository: KindergartenRepository) {}

  async execute(): Promise<Kindergarten[]> {
    return this.repository.getAll();
  }
}
