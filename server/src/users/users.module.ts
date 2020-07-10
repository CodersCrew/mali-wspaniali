import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { CommandHandlers } from './domain/commands/handlers';
import { QueryHandlers } from './domain/queries/handlers';
import { UserSchema } from './schemas/user_schema';
import { UserRepository } from './domain/repositories/user_repository';
import { UserResolver } from './users.resolver';
import { KeyCodesModule } from '../key_codes/key_codes.module';
import { EventHandlers } from './domain/events/handlers';

@Module({
  imports: [
    KeyCodesModule,
    CqrsModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [
    UserResolver,
    UserRepository,
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
  ],
})
export class UserModule {}
