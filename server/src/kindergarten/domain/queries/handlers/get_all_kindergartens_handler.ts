import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetAllKindergartensQuery } from '../impl/get_all_kindergartens_query';
import { KindergartenRepository } from '../../repositories/kindergarten_repository';
import { KindergartenProps } from '../../models/kindergarten_model';

@QueryHandler(GetAllKindergartensQuery)
export class GetAllKindergartensHandler
  implements IQueryHandler<GetAllKindergartensQuery> {
  constructor(private readonly repository: KindergartenRepository) {}

  async execute(query: GetAllKindergartensQuery): Promise<KindergartenProps[]> {
    return this.repository.all();
  }
}
