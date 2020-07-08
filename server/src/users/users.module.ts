import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { CommandHandlers } from './domain/commands/handlers';
import { QueryHandlers } from './domain/queries/handlers';
import { UserSchema } from './schemas/user_schema';
import { UserRepository } from './domain/repositories/user_repository';
import { UserResolver } from './users.resolver';

@Module({
  imports: [
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
