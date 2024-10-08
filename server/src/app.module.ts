import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import { ArticlesModule } from './articles/articles_module';
import { isProduction, isTest } from './shared/utils/is_production';
import { UsersModule } from './users/users_module';
import { NotificationsModule } from './notifications/notifications.module';
import { NewslettersModule } from './newsletters/newsletters_module';
import { AgreementsModule } from './agreements/agreements_module';
import { KindergartenModule } from './kindergartens/kindergarten_module';
import { AssessmentModule } from './assessment/assessment_module';
import { KeyCodesModule } from './key_codes/key_codes_module';

@Module({
  imports: [
    ArticlesModule,
    KeyCodesModule,
    UsersModule,
    NotificationsModule,
    NewslettersModule,
    AgreementsModule,
    KindergartenModule,
    AssessmentModule,
    ScheduleModule.forRoot(),
    GraphQLModule.forRoot({
      debug: !isProduction(),
      playground: !isProduction(),
      autoSchemaFile: 'schema.gql',
      context: ({ req, res }) => ({ req, res }),
      cors: {
        origin: [new RegExp(process.env.SERVER_HOST)],
        credentials: true,
      },
      fieldResolverEnhancers: ['guards', 'interceptors'],
    }),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      isTest() ? process.env.MONGO_KEY_TEST : process.env.MONGO_KEY,
    ),
  ],
})
export class AppModule {}
