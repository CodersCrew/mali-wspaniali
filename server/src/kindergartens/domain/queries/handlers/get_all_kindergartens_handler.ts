import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetAllKindergartensQuery } from '../impl';
import { KindergartenProps } from '../../models/kindergarten_model';
import { KindergartenRepository } from '../../repositories/kindergarten_repository';

@QueryHandler(GetAllKindergartensQuery)
export class GetAllKindergartensHandler
  implements IQueryHandler<GetAllKindergartensQuery> {
  constructor(private readonly repository: KindergartenRepository) {}

  async execute(): Promise<KindergartenProps[]> {
    return this.repository.getAll();
  }
}
