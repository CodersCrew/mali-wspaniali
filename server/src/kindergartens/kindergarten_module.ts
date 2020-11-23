import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { KindergartenSchema } from './schemas/kindergarten_schema';
import { KindergartenResolver } from './kindergarten_resolver';
import { KindergartenRepository } from './domain/repositories/kindergarten_repository';
import { CommandHandlers } from './domain/commands/handlers';
import { QueryHandlers } from './domain/queries/handlers';
import { GqlAuthGuard } from '../users/guards/jwt_guard';
import { ChildRepository } from '../users/domain/repositories/child_repository';
import { ChildSchema } from '../users/schemas/child_schema';
import { UserRepository } from '../users/domain/repositories/user_repository';
import { UserSchema } from '../users/schemas/user_schema';
import { EventHandlers } from './domain/events/handlers';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    CqrsModule,
    NotificationsModule,
    MongooseModule.forFeature([
      { name: 'Kindergarten', schema: KindergartenSchema },
    ]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),

    MongooseModule.forFeature([{ name: 'Child', schema: ChildSchema }]),
  ],
  providers: [
    ChildRepository,
    KindergartenResolver,
    KindergartenRepository,
    UserRepository,
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
    GqlAuthGuard,
  ],
  exports: [KindergartenRepository],
})
export class KindergartenModule {}
