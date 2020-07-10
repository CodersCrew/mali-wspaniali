import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import { isProduction, isTest } from './shared/utils/is_production';
import { KeyCodesModule } from './key_codes/key_codes.module';
import { UserModule } from './users/users.module';

@Module({
  imports: [
    ArticlesModule,
    KeyCodesModule,
    UserModule,
    ScheduleModule.forRoot(),
    GraphQLModule.forRoot({
      debug: !isProduction(),
      playground: !isProduction(),
      autoSchemaFile: 'schema.gql',
    }),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      isTest() ? process.env.MONGO_KEY_TEST : process.env.MONGO_KEY,
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
