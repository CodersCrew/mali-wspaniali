import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { CommandHandlers } from './domain/commands/handlers';
import { QueryHandlers } from './domain/queries/handlers';
import { UserSchema } from './schemas/user_schema';
import { UserRepository } from './domain/repositories/user_repository';
import { UserResolver } from './users.resolver';
import { KeyCodeRepository } from '../key_codes/domain/repositories/key_code_repository';
import { KeyCodesModule } from '../key_codes/key_codes.module';

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
  ],
})
export class UserModule {}
