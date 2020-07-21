import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { AggrementSchema } from './schemas/aggrement_schema';
import { AggrementRepository } from './domain/repositories/aggrement_repository';
import { QueryHandlers } from './domain/queries/handlers';
import { AggrementsResolver } from './agreements_resolver';
import { CommandHandlers } from './domain/commands/handlers';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: 'Aggrement', schema: AggrementSchema }]),
  ],
  providers: [
    AggrementsResolver,
    AggrementRepository,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  exports: [AggrementRepository],
})
export class AggrementsModule {}
