import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { SendMail } from '../shared/services/send_mail/send_mail';
import { SandboxProvider } from '../shared/services/send_mail/nodemailer_provider';
import { NotificationsModule } from '../notifications/notifications.module';
import { AgreementsModule } from '../agreements/agreements_module';
import { KeyCodesModule } from '../key_codes/key_codes_module';

import { KindergartenModule } from '../kindergartens/kindergarten_module';
import { CommandHandlers } from './domain/commands/handlers';
import { QueryHandlers } from './domain/queries/handlers';
import { UserSchema } from './schemas/user_schema';
import { UserRepository } from './domain/repositories/user_repository';
import { UsersResolver } from './users_resolver';
import { ChildResolver } from './child_resolver';
import { EventHandlers } from './domain/events/handlers';
import { GqlAuthGuard } from './guards/jwt_guard';
import { JwtStrategy } from './strategy/jwt_strategy';
import { ChildRepository } from './domain/repositories/child_repository';
import { ChildSchema } from './schemas/child_schema';
import { ChildrenController } from './children_controller';
import { UserChangePasswordJWT } from './schemas/user_change_password_jwt_schema';
import { UserChangePasswordRepository } from './domain/repositories/user_change_password_jwt_repository';
import { UserChangePasswordCronService } from './user_change_password_cron_service';
import { ChildAssessmentResultRepository } from './domain/repositories/child_assessment_result_repository';
import { ChildAssessmentResultSchema } from './schemas/child_assessment_result_schema';
import { FreshmailProvider } from '../shared/services/send_mail/freshmail_service';
import { ChildAssessmentResultResolver } from './child_assessment_result_resolver';

@Module({
  imports: [
    KeyCodesModule,
    NotificationsModule,
    CqrsModule,
    AgreementsModule,
    KindergartenModule,
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Child', schema: ChildSchema }]),
    MongooseModule.forFeature([
      { name: 'ChildAssessmentResult', schema: ChildAssessmentResultSchema },
    ]),
    MongooseModule.forFeature([
      { name: 'UserChangePasswordJWT', schema: UserChangePasswordJWT },
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
    ChildResolver,
    ChildAssessmentResultResolver,
    UserRepository,
    ChildRepository,
    ChildAssessmentResultRepository,
    UserChangePasswordRepository,
    SendMail,
    SandboxProvider,
    UserChangePasswordCronService,
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
    SendMail,
    FreshmailProvider,
  ],
  controllers: [ChildrenController],
  exports: [UserRepository, ChildRepository],
})
export class UsersModule {}
