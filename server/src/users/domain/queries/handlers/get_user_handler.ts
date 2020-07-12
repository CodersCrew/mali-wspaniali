import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import * as mongoose from 'mongoose';

import { GetUserQuery } from '../impl/get_user_query';
import { UserProps } from '../../models/user_model';
import { UserRepository } from '../../repositories/user_repository';
import { NotificationRepository } from '../../../../notifications/domain/repositories/notification_repository';
import { ChildRepository } from '../../repositories/child_repository';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly childRepository: ChildRepository,
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async execute({ id }: { id: string }): Promise<UserProps> {
    const user = await this.userRepository.get(id);

    if (user) {
      user.notifications = await this.notificationRepository.getAll(user._id);
      user.children = await this.childRepository.get(
        user.children as mongoose.Schema.Types.ObjectId[],
      );
    }

    return user;
  }
}
