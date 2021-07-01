import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { User } from '../../models/user_model';
import { UserRepository } from '../../repositories/user_repository';
import { GetUserByChildIdQuery } from '../impl';

@QueryHandler(GetUserByChildIdQuery)
export class GetUserByChildIdHandler
  implements IQueryHandler<GetUserByChildIdQuery> {
  constructor(private userRepository: UserRepository) {}

  async execute({ id }: GetUserByChildIdQuery): Promise<User> {
    return (await this.userRepository.getByChildren([id]))[0];
  }
}
