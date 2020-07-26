import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { KindergartenResolver } from './kindergarten.resolver';
import { KindergartenSchema } from './schemas/kindergarten.schema';
import { KindergartenRepository } from './domain/repositories/kindergarten_repository';
import { CommandHandlers } from './domain/commands/handlers';
import { QueryHandlers } from './domain/queries/handlers';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    CqrsModule,
    NotificationsModule,
    KindergartenModule,
    MongooseModule.forFeature([
      { name: 'Kindergarten', schema: KindergartenSchema },
    ]),
  ],
  providers: [
    KindergartenResolver,
    KindergartenRepository,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class KindergartenModule {}
