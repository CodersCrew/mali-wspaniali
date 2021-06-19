import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { KindergartenRepository } from '../../repositories/kindergarten_repository';
import { GetKindergartenWithUsersQuery } from '../impl/get_kindergarten_with_users_query';
import { ChildRepository } from '../../../../users/domain/repositories/child_repository';
import { UserRepository } from '../../../../users/domain/repositories/user_repository';
import { KindergartenWithUsersProps } from '../../models/kindergarten_with_users_model';
import { KindergartenMapper } from '../../mappers/kindergarten_mapper';

@QueryHandler(GetKindergartenWithUsersQuery)
export class GetKindergartenWithUsersHandler
  implements IQueryHandler<GetKindergartenWithUsersQuery> {
  constructor(
    private readonly kindergartenRepository: KindergartenRepository,
    private readonly childRepository: ChildRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute({
    ids,
  }: GetKindergartenWithUsersQuery): Promise<KindergartenWithUsersProps[]> {
    const kindergartensWithUser = [];

    for (const id of ids) {
      const kindergarten = await this.kindergartenRepository.get(id);

      const children = await this.childRepository.getByKindergarten(id);

      const parents = await this.userRepository.getByChildren(
        children.map(c => c.id),
      );

      const kindergartenWithUsers = {
        ...KindergartenMapper.toRaw(kindergarten),
        users: parents,
      };

      kindergartensWithUser.push(kindergartenWithUsers);
    }

    return kindergartensWithUser;
  }
}
