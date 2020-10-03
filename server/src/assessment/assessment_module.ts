import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { AssessmentSchema } from './schemas/assessment_schema';
import { CommandHandlers } from './domain/commands/handlers';
import { AssessmentResolver } from './assessment_resolver';
import { AssessmentRepository } from './domain/repositories/assessment_repository';
import { EventHandlers } from './domain/events/handlers';
import { NotificationsModule } from '../notifications/notifications.module';
import { UsersModule } from '../users/users_module';

@Module({
  imports: [
    CqrsModule,
    NotificationsModule,
    UsersModule,
    MongooseModule.forFeature([
      { name: 'Assessment', schema: AssessmentSchema },
    ]),
  ],
  providers: [
    AssessmentResolver,
    AssessmentRepository,
    ...CommandHandlers,
    ...EventHandlers,
  ],
})
export class AssessmentModule {}
