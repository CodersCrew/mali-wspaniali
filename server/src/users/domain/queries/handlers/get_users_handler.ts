import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { User } from '../../models/user_model';
import { UserRepository } from '../../repositories/user_repository';
import { GetUsersQuery } from '../impl';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(private userRepository: UserRepository) {}

  async execute({ ids }: GetUsersQuery): Promise<User[]> {
    return await this.userRepository.getMany(ids);
  }
}
