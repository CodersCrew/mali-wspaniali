import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { KindergartenRepository } from '../../repositories/kindergarten_repository';
import { KindergartenWithUsersProps } from '../../models/kindergarten_with_users_model';
import { GetKindergartenQuery } from '../impl/get_kindergarten_query';
import { KindergartenProps } from '../../models/kindergarten_model';

@QueryHandler(GetKindergartenQuery)
export class GetKindergartenHandler
  implements IQueryHandler<GetKindergartenQuery> {
  constructor(
    private readonly kindergartenRepository: KindergartenRepository,
  ) {}

  async execute({ id }: GetKindergartenQuery): Promise<KindergartenProps> {
    const kindergarten = await this.kindergartenRepository.get(id);

    return kindergarten;
  }
}
