import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetUserQuery } from '../impl/get_user_query';
import { UserProps } from '../../models/user_model';
import { UserRepository } from '../../repositories/user_repository';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(private readonly repository: UserRepository) {}

  async execute({ id }: { id: string }): Promise<UserProps> {
    return this.repository.get(id);
  }
}
