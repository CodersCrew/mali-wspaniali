import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { KeyCodeSchema } from './schemas/key_codes_schema';
import { KeyCodesResolver } from './key_codes_resolver';
import { KeyCodeRepository } from './domain/repositories/key_codes_repository';
import { KeyCodesCronService } from './key_codes_cron_service';
import { CommandHandlers } from './domain/commands/handlers';
import { QueryHandlers } from './domain/queries/handlers';
import { GqlAuthGuard } from '../users/guards/jwt_guard';

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
    GqlAuthGuard,
  ],
  exports: [KeyCodeRepository],
})
export class KeyCodesModule {}
