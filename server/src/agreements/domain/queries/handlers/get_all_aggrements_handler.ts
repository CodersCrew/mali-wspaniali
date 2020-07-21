import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { AggrementRepository } from '../../repositories/aggrement_repository';
import { GetAllAggrementsQuery } from '../impl/get_all_aggrements_query';
import { AggrementProps } from '../../../../agreements/schemas/aggrement_schema';

@QueryHandler(GetAllAggrementsQuery)
export class GetAllAggrementsHandler
  implements IQueryHandler<GetAllAggrementsQuery> {
  constructor(private readonly repository: AggrementRepository) {}

  async execute(): Promise<AggrementProps[]> {
    return this.repository.getAll();
  }
}
