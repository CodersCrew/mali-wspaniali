import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { KindergartenResolver } from './kindergarten.resolver';
// import { ArticleSchema } from './schemas/articles.schema';
import { KindergartenRepository } from './domain/repositories/kindergarten_repository';
// import { CommandHandlers } from './domain/commands/handlers';
// import { EventHandlers } from './domain/events/handlers/index';
// import { QueryHandlers } from './domain/queries/handlers';
import { NotificationsModule } from '../notifications/notifications.module';
// import { UserModule } from '../users/users.module';
import { KindergartenService } from './kindergarten.service';

@Module({
  imports: [
    CqrsModule,
    NotificationsModule,
    // UserModule,
    // MongooseModule.forFeature([{ name: 'Article', schema: ArticleSchema }]),
  ],
  providers: [
    KindergartenResolver,
    KindergartenRepository,
    KindergartenService,
    // ...CommandHandlers,
    // ...EventHandlers,
    // ...QueryHandlers,
  ],
})
export class KindergartenModule {}
