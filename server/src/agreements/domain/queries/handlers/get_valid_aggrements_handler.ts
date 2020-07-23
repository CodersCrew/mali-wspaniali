import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { AggrementRepository } from '../../repositories/aggrement_repository';
import { AggrementProps } from '../../../schemas/aggrement_schema';
import { GetValidAggrementsQuery } from '../impl/get_valid_aggrements_query';

@QueryHandler(GetValidAggrementsQuery)
export class GetValidAggrementsHandler
  implements IQueryHandler<GetValidAggrementsQuery> {
  constructor(private readonly repository: AggrementRepository) {}

  async execute({ signed }: { signed: string[] }): Promise<AggrementProps[]> {
    const aggrements = await this.repository.getAll();

    const validAggrements = aggrements
      .filter(aggrement => !aggrement.isOutdated)
      .map(aggrement => {
        const isSigned = signed.includes(aggrement._id.toString());

        return {
          ...aggrement,
          isSigned,
        };
      });

    return validAggrements;
  }
}
