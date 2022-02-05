import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';

import * as dbHandler from './src/db_handler';
import { UsersModule } from './src/users/users_module';
import { AgreementsModule } from './src/agreements/agreements_module';
import { KeyCodesModule } from './src/key_codes/key_codes_module';
import { KindergartenModule } from './src/kindergartens/kindergarten_module';
import { NewslettersModule } from './src/newsletters/newsletters_module';
import { CreateKeyCodeHandler } from './src/key_codes/domain/commands/handlers/create_key_code_handler';
import { CreateUserHandler } from './src/users/domain/commands/handlers/create_user_handler';
import { NotificationsModule } from './src/notifications/notifications.module';
import { ArticlesModule } from './src/articles/articles_module';
import { AssessmentModule } from './src/assessment/assessment_module';

expect.extend({
  async toHaveValidationError(received, error): Promise<any> {
    try {
      await received;
    } catch (e) {
      if (
        e.find(err =>
          Object.values(err.constraints).find(
            errMessage => errMessage === error,
          ),
        )
      ) {
        return {
          pass: true,
        };
      } else {
        return { pass: false, message: () => 'There is no such error' };
      }
    }
    if (!received.rejects) {
      return { pass: false, message: () => 'Response should be rejected' };
    }
  },

  toHaveValidationErrorSync(received, error): any {
    try {
      received();
    } catch (e) {
      if (
        e.find(err =>
          Object.values(err.constraints).find(
            errMessage => errMessage === error,
          ),
        )
      ) {
        return {
          pass: true,
        };
      } else {
        return { pass: false, message: () => 'There is no such error' };
      }
    }
    if (!received.rejects) {
      return { pass: false, message: () => 'Response should be rejected' };
    }
  },
});

async function setup() {
  const module = await Test.createTestingModule({
    imports: [
      dbHandler.rootMongooseTestModule(),
      AgreementsModule,
      ArticlesModule,
      AssessmentModule,
      CqrsModule,
      KeyCodesModule,
      KindergartenModule,
      NewslettersModule,
      NotificationsModule,
      UsersModule,
    ],
    providers: [CreateKeyCodeHandler, CreateUserHandler],
  }).compile();

  await module.init();

  return module;
}

let app: TestingModule;

beforeAll(async () => {
  app = await setup();
});

afterAll(async () => {
  await app.close();
});

beforeEach(async () => {
  await dbHandler.clearDatabase();
});

export function getApp() {
  return app;
}
