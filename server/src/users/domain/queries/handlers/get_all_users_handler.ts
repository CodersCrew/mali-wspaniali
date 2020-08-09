import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { UserProps } from '../../models/user_model';
import { UserRepository } from '../../repositories/user_repository';
import { GetAllUsersQuery } from '../impl/get_all_users_query';
import { ChildRepository } from '../../repositories/child_repository';
import * as mongoose from 'mongoose';

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersHandler implements IQueryHandler<GetAllUsersQuery> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly childRepository: ChildRepository,
  ) {}

  async execute(): Promise<UserProps[]> {
    return await this.userRepository.getAll();
  }
}
