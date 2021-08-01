import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import { KeyCodesModule } from '../../key_codes/key_codes_module';
import { KindergartenModule } from '../../kindergartens/kindergarten_module';
import { AgreementsModule } from '../../agreements/agreements_module';
import { UsersModule } from '../../users/users_module';
import * as dbHandler from '../../db_handler';
import { CreateKeyCodeHandler } from '../../key_codes/domain/commands/handlers/create_key_code_handler';
import { CreateUserHandler } from '../../users/domain/commands/handlers/create_user_handler';
import { UserInput } from '../../users/inputs/user_input';
import { User } from '../../users/domain/models/user_model';
import { CreateUserCommand } from '../../users/domain/commands/impl/create_user_command';
import { AnonymizeUserHandler } from '../../users/domain/commands/handlers/anonymize_user_handler';
import { AnonymizeUserCommand } from '../../users/domain/commands/impl/anonymize_user_command';
import { AddChildHandler } from '../../users/domain/commands/handlers/add_child_handler';
import { AddChildCommand } from '../../users/domain/commands/impl/add_child_command';
import { CreateKindergartenHandler } from '../../kindergartens/domain/commands/handlers/create_kindergarten_handler';
import { CreateKindergartenCommand } from '../../kindergartens/domain/commands/impl/create_kindergarten_command';
import { GetAllChildrenHandler } from '../../users/domain/queries/handlers/get_all_children_handler';
import { GetKindergartenHandler } from '../../kindergartens/domain/queries/handlers/get_kindergarten_handler';
import { GetKindergartenQuery } from '../../kindergartens/domain/queries/impl/get_kindergarten_query';
import { NotificationsModule } from '../../notifications/notifications.module';
import { GetNotificationsByUserHandler } from '../../notifications/domain/queries/handlers/get_notifications_by_user_handler';
import { GetNotificationsByUserQuery } from '../../notifications/domain/queries/impl/get_notifications_by_user_query';
import { ArticlesModule } from '../../articles/articles_module';
import { GetAllUsersHandler } from '../../users/domain/queries/handlers/get_all_users_handler';
import { GetAllUsersQuery } from '../../users/domain/queries/impl/get_all_users_query';
import { GetAllArticlesHandler } from '../../articles/domain/queries/handlers/get_all_articles_handler';
import { GetAllArticlesQuery } from '../../articles/domain/queries/impl/get_all_articles_query';
import { CreateKeyCodeCommand } from '../../key_codes/domain/commands/impl';

let app: TestingModule;

export async function setupTestApp() {
  const module = await Test.createTestingModule({
    imports: [
      dbHandler.rootMongooseTestModule(),
      CqrsModule,
      UsersModule,
      AgreementsModule,
      KeyCodesModule,
      KindergartenModule,
      NotificationsModule,
      ArticlesModule,
    ],
    providers: [CreateKeyCodeHandler, CreateUserHandler],
  }).compile();

  app = await module.init();
}

export async function closeTestApp() {
  await app.close();
}

export async function createParent(
  options: Partial<UserInput> = {},
): Promise<User> {
  if (!app) {
    await setupTestApp();
  }

  const keyCodeResult = await app
    .get(CreateKeyCodeHandler)
    .execute(new CreateKeyCodeCommand('admin', 'parent'));

  const parent = app.get(CreateUserHandler).execute(
    new CreateUserCommand({
      mail: 'my-mail@mail.com',
      password: 'my-password',
      keyCode: keyCodeResult.keyCode,
      ...options,
    }),
  );

  return parent;
}

export async function anonymizeUser(id: string) {
  if (!app) {
    await setupTestApp();
  }

  return app.get(AnonymizeUserHandler).execute(new AnonymizeUserCommand(id));
}

export async function addChild(
  options: {
    firstname?: string;
    kindergartenId?: string;
    birthYear?: number;
  } = {},
  parentId: string,
) {
  const validChildOptions = {
    birthYear: 2000,
    birthQuarter: 1,
    firstname: 'my-name',
    lastname: 'my-lastname',
    sex: 'male',
    kindergartenId: 'my-kindergartenId',
  };

  if (!app) {
    await setupTestApp();
  }

  return app.resolve(AddChildHandler).then(handler => {
    return handler.execute(
      new AddChildCommand({ ...validChildOptions, ...options }, parentId),
    );
  });
}

export async function createKindergartenWith(options: { name?: string } = {}) {
  const validKindergartenOptions = {
    number: 1,
    name: 'my-name',
    address: 'my-address',
    city: 'my-city',
  };

  if (!app) {
    await setupTestApp();
  }

  return app.resolve(CreateKindergartenHandler).then(handler =>
    handler.execute(
      new CreateKindergartenCommand({
        ...validKindergartenOptions,
        ...options,
      }),
    ),
  );
}

export async function getKindergarten(id: string) {
  if (!app) {
    await setupTestApp();
  }

  return app
    .resolve(GetKindergartenHandler)
    .then(handler => handler.execute(new GetKindergartenQuery(id)));
}

export async function getAllChildren() {
  if (!app) {
    await setupTestApp();
  }

  return app.resolve(GetAllChildrenHandler).then(handler => {
    return handler.execute();
  });
}

export async function getNotificationsForUser(user: string) {
  if (!app) {
    await setupTestApp();
  }

  return app.resolve(GetNotificationsByUserHandler).then(handler => {
    return handler.execute(new GetNotificationsByUserQuery(user));
  });
}

export async function getUsers(role = 'parent') {
  if (!app) {
    await setupTestApp();
  }

  return app.resolve(GetAllUsersHandler).then(handler => {
    return handler.execute(new GetAllUsersQuery({ role }));
  });
}

export async function getAllArticles(page = 1, perPage = 6) {
  if (!app) {
    await setupTestApp();
  }

  return app.resolve(GetAllArticlesHandler).then(handler => {
    return handler.execute(
      new GetAllArticlesQuery(page, perPage, {
        mail: 'admin@admin.com',
        role: 'admin',
        userId: '',
      }),
    );
  });
}
