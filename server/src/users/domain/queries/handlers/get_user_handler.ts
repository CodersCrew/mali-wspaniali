import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetUserQuery } from '../impl/get_user_query';
import { User } from '../../models/user_model';
import { UserRepository } from '../../repositories/user_repository';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ id }: { id: string }): Promise<User> {
    return await this.userRepository.get(id);
  }
}
