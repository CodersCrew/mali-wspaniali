import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { CommandHandlers } from './domain/commands/handlers';
import { QueryHandlers } from './domain/queries/handlers';
import { UserSchema } from './schemas/user_schema';
import { UserRepository } from './domain/repositories/user_repository';
import { UserResolver } from './users.resolver';
import { KeyCodesModule } from '../key_codes/key_codes.module';
import { EventHandlers } from './domain/events/handlers';
import { GqlAuthGuard } from './guards/jwt_guard';
import { JwtStrategy } from './strategy/jwt_strategy';

@Module({
  imports: [
    KeyCodesModule,
    CqrsModule,
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [
    JwtStrategy,
    GqlAuthGuard,
    UserResolver,
    UserRepository,
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
  ],
})
export class UserModule {}
