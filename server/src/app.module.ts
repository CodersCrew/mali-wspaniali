import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import { isProduction } from './utils/is_production';

@Module({
  imports: [
    ArticlesModule,
    GraphQLModule.forRoot({
      debug: !isProduction(),
      playground: !isProduction(),
      autoSchemaFile: 'schema.gql',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
