import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { KindergartenResolver } from './kindergarten.resolver';
import { KindergartenSchema } from './schemas/kindergarten.schema';
import { KindergartenRepository } from './domain/repositories/kindergarten_repository';
// import { CommandHandlers } from './domain/commands/handlers';
// import { EventHandlers } from './domain/events/handlers/index';
import { QueryHandlers } from './domain/queries/handlers';
import { NotificationsModule } from '../notifications/notifications.module';
import { KindergartenService } from './kindergarten.service';

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
    KindergartenService,
    // ...CommandHandlers,
    // ...EventHandlers,
    ...QueryHandlers,
  ],
})
export class KindergartenModule {}
