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

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: 'Kindergarten', schema: KindergartenSchema },
    ]),

    MongooseModule.forFeature([{ name: 'Child', schema: ChildSchema }]),
  ],
  providers: [
    ChildRepository,
    KindergartenResolver,
    KindergartenRepository,
    ...CommandHandlers,
    ...QueryHandlers,
    GqlAuthGuard,
  ],
  exports: [KindergartenRepository],
})
export class KindergartenModule {}
