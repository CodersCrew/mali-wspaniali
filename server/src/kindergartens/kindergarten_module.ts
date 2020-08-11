import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { KindergartenSchema } from './schemas/kindergarten_schema';
import { KindergartenResolver } from './kindergarten_resolver';
import { KindergartenRepository } from './domain/repositories/kindergarten_repository';
import { CommandHandlers } from './domain/commands/handlers';
import { QueryHandlers } from './domain/queries/handlers';
import { GqlAuthGuard } from '../users/guards/jwt_guard';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: 'Kindergarten', schema: KindergartenSchema },
    ]),
  ],
  providers: [
    KindergartenResolver,
    KindergartenRepository,
    ...CommandHandlers,
    ...QueryHandlers,
    GqlAuthGuard,
  ],
  exports: [KindergartenRepository],
})
export class KindergartenModule {}
