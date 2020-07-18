import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { KeyCodeSchema } from './schemas/key_codes.schema';
import { KeyCodesResolver } from './key_codes_resolver';
import { KeyCodeRepository } from './domain/repositories/key_code_repository';
import { KeyCodesCronService } from './key_codes_cron_service';
import { CommandHandlers } from './domain/commands/handlers';
import { QueryHandlers } from './domain/queries/handlers';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: 'KeyCode', schema: KeyCodeSchema }]),
  ],
  providers: [
    KeyCodesResolver,
    KeyCodeRepository,
    KeyCodesCronService,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  exports: [KeyCodeRepository],
})
export class KeyCodesModule {}
