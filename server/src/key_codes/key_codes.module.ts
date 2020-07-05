import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { KeyCodeSchema } from './schemas/key_codes.schema';
import { KeyCodesResolver } from './key_codes.resolver';
import { KeyCodeRepository } from './domain/repositories/key_code_repository';
import { KeyCodeCronService } from './cron_service';
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
    KeyCodeCronService,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class KeyCodesModule {}
