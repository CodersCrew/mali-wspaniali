import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { KindergartenRepository } from '../../repositories/kindergarten_repository';
import { KindergartenWithUsersProps } from '../../models/kindergarten_with_users_model';
import { GetKindergartenQuery } from '../impl/get_kindergarten_query';
import {
  Kindergarten,
  KindergartenProps,
} from '../../models/kindergarten_model';
import { GetKindergartensQuery } from '../impl';

@QueryHandler(GetKindergartensQuery)
export class GetKindergartensHandler
  implements IQueryHandler<GetKindergartensQuery> {
  constructor(
    private readonly kindergartenRepository: KindergartenRepository,
  ) {}

  async execute({ ids }: GetKindergartensQuery): Promise<Kindergarten[]> {
    const kindergartens = await this.kindergartenRepository.getMany(ids);

    return kindergartens;
  }
}
