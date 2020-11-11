import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { UserProps } from '../../models/user_model';
import { UserRepository } from '../../repositories/user_repository';
import { GetUsersQuery } from '../impl';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ ids }: GetUsersQuery): Promise<UserProps[]> {
    return await this.userRepository.getMany(ids);
  }
}
