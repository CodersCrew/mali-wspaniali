import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import { isProduction, isTest } from './shared/utils/is_production';

@Module({
  imports: [
    ArticlesModule,
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
