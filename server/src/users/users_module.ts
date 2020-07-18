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
import { UsersResolver } from './users_resolver';
import { KeyCodesModule } from '../key_codes/key_codes.module';
import { EventHandlers } from './domain/events/handlers';
import { GqlAuthGuard } from './guards/jwt_guard';
import { JwtStrategy } from './strategy/jwt_strategy';
import { NotificationsModule } from '../notifications/notifications.module';
import { ChildRepository } from './domain/repositories/child_repository';
import { ChildSchema } from './schemas/child_schema';
import { ChildResultSchema } from './schemas/child_result_schema';
import { ChildResultRepository } from './domain/repositories/child_result_repository';
import { UsersController } from './users_controller';

@Module({
  imports: [
    KeyCodesModule,
    NotificationsModule,
    CqrsModule,
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Child', schema: ChildSchema }]),
    MongooseModule.forFeature([
      { name: 'ChildResult', schema: ChildResultSchema },
    ]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [
    JwtStrategy,
    GqlAuthGuard,
    UsersResolver,
    UserRepository,
    ChildRepository,
    ChildResultRepository,
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
  ],
  controllers: [UsersController],
  exports: [UserRepository],
})
export class UsersModule {}
