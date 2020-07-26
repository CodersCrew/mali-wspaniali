import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetKindergartenByIdQuery } from '../impl/get_kindergarten_by_id_query';
import { KindergartenRepository } from '../../repositories/kindergarten_repository';
import { KindergartenProps } from '../../models/kindergarten_model';

@QueryHandler(GetKindergartenByIdQuery)
export class GetKindergartenByIdHandler
  implements IQueryHandler<GetKindergartenByIdQuery> {
  constructor(private readonly repository: KindergartenRepository) {}

  async execute(query: GetKindergartenByIdQuery): Promise<KindergartenProps> {
    return this.repository.get(query.id);
  }
}
