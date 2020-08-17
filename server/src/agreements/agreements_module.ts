import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { AgreementSchema } from './schemas/agreement_schema';
import { AgreementRepository } from './domain/repositories/agreement_repository';
import { QueryHandlers } from './domain/queries/handlers';
import { AgreementsResolver } from './agreements_resolver';
import { CommandHandlers } from './domain/commands/handlers';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: 'Agreement', schema: AgreementSchema }]),
  ],
  providers: [
    AgreementsResolver,
    AgreementRepository,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  exports: [AgreementRepository, ...QueryHandlers],
})
export class AgreementsModule {}
