import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { UserProps } from '../../models/user_model';
import { UserRepository } from '../../repositories/user_repository';
import { GetAllUsersQuery } from '../impl/get_all_users_query';

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersHandler implements IQueryHandler<GetAllUsersQuery> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ role }: GetAllUsersQuery): Promise<UserProps[]> {
    return await this.userRepository.getAll(role);
  }
}
