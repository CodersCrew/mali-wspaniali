import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';

import { AddChildCommand, CreateUserCommand } from '../../impl';
import * as dbHandler from '../../../../../db_handler';
import { CreateUserHandler } from '../create_user_handler';
import { KeyCodesModule } from '../../../../../key_codes/key_codes_module';
import { UsersModule } from '../../../../users_module';
import { CreateKeyCodeHandler } from '../../../../../key_codes/domain/commands/handlers/create_key_code_handler';
import { User } from '../../../models/user_model';
import { CreateBulkKeyCodeCommand } from '../../../../../key_codes/domain/commands/impl/create_bulk_key_code_command';
import { AgreementsModule } from '../../../../../agreements/agreements_module';
import { UserInput } from '../../../../inputs/user_input';
import { GetUserQuery } from '../../../queries/impl/get_user_query';
import { GetUserHandler } from '../../../queries/handlers/get_user_handler';
import { AnonymizeUserCommand } from '../../impl/anonymize_user_command';
import { AnonymizeUserHandler } from '../anonymize_user_handler';
import { AddChildHandler } from '../add_child_handler';
import { CreateKindergartenHandler } from '../../../../../kindergartens/domain/commands/handlers/create_kindergarten_handler';
import { CreateKindergartenCommand } from '../../../../../kindergartens/domain/commands/impl/create_kindergarten_command';
import { KindergartenModule } from '../../../../../kindergartens/kindergarten_module';
import waitForExpect from 'wait-for-expect';
import { NotificationRepository } from '../../../../../notifications/domain/repositories/notification_repository';
import { Child } from 'src/users/domain/models';
import { ChildRepository } from '../../../repositories/child_repository';

describe('AnonymizeUserHandler', () => {
  let app: TestingModule;

  afterAll(async () => {
    await app.close();
  });

  beforeAll(async () => {
    app = await setup();
  });

  beforeEach(async () => {
    await dbHandler.clearDatabase();
  });

  describe('when executed on parent without children', () => {
    let user: User;
    let anonymizedUser: User;
    let fetchedUser: User;

    beforeEach(async () => {
      user = await createParent({ mail: 'user1@user.com' });
      anonymizedUser = await anonymizeUser(user.id);
      // fetchedUser = await getParentById(user.id);
    });

    it('anonymize user', async () => {
      expect(user.mail).toBe('user1@user.com');
      expect(user.isDeleted()).toBe(false);

      expect(anonymizedUser.mail).toBe('');
      expect(anonymizedUser.isDeleted()).toBe(true);

      // expect(fetchedUser.mail).toBe('');
      // expect(fetchedUser.isDeleted()).toBe(true);
      // expect(fetchedUser.children).toEqual([]);

      await waitForExpect(async () => {
        const fetchedUser = await getParentById(user.id);

        expect(fetchedUser.mail).toBe('');
        expect(fetchedUser.isDeleted()).toBe(true);
        expect(fetchedUser.children).toEqual([]);
      });
    });
  });

  describe('when executed on parent with children', () => {
    let user: User;
    let anonymizedUser: User;
    let fetchedUser: User;
    let fetchedChild: Child;

    beforeEach(async () => {
      user = await createParent({ mail: 'user1@user.com' });
      await addChildCommandWith({}, user.id);
      anonymizedUser = await anonymizeUser(user.id);
      fetchedUser = await getParentById(user.id);
    });

    it('anonymize user', () => {
      expect(user.mail).toBe('user1@user.com');
      expect(user.isDeleted()).toBe(false);

      expect(anonymizedUser.mail).toBe('');
      expect(anonymizedUser.isDeleted()).toBe(true);

      expect(fetchedUser.mail).toBe('');
      expect(fetchedUser.isDeleted()).toBe(true);
      expect(fetchedUser.children.length).toBe(1);
    });

    it('anonymize children', async () => {
      await waitForExpect(async () => {
        [fetchedChild] = await getChildren(fetchedUser.children);

        expect(fetchedChild.isDeleted).toBe(true);
        expect(fetchedChild.firstname.value).toBe('anonymized');
        expect(fetchedChild.lastname.value).toBe('anonymized');
      });
    });
  });

  async function createParent(options: Partial<UserInput> = {}): Promise<User> {
    const keyCode = await app
      .get(CreateKeyCodeHandler)
      .execute(new CreateBulkKeyCodeCommand('admin', 1, 'parent'));

    const parent = app.get(CreateUserHandler).execute(
      new CreateUserCommand({
        mail: 'my-mail@mail.com',
        password: 'my-password',
        keyCode: keyCode.keyCode,
        ...options,
      }),
    );

    return parent;
  }

  async function getParentById(userId: string) {
    const parent = app.get(GetUserHandler).execute(new GetUserQuery(userId));

    return parent;
  }

  async function addChildCommandWith(options, parentId) {
    const validChildOptions = {
      birthYear: 2000,
      birthQuarter: 1,
      firstname: 'my-name',
      lastname: 'my-lastname',
      sex: 'male',
      kindergartenId: 'my-kindergartenId',
    };

    const kindergarten = await createKindergarten();

    const child = app.resolve(AddChildHandler).then(handler => {
      return handler.execute(
        new AddChildCommand(
          {
            ...validChildOptions,
            kindergartenId: kindergarten.id.toString(),
            ...options,
          },
          parentId,
        ),
      );
    });

    await waitForExpect(
      async () => {
        const [notification] = await getNotificationsForUser(parentId);

        expect(notification).toBeDefined();

        expect(notification.templateId).toBe('child_created');
        expect(notification.user).toBe(parentId);
      },
      9000,
      1000,
    );

    return child;
  }

  function getNotificationsForUser(user: string) {
    return app.get(NotificationRepository).getAll(user);
  }

  function getChildren(ids: string[]) {
    return app.get(ChildRepository).get(ids);
  }

  function createKindergarten() {
    return app.get(CreateKindergartenHandler).execute(
      new CreateKindergartenCommand({
        number: 1,
        name: 'my-name',
        address: 'my-address',
        city: 'my-city',
      }),
    );
  }

  async function anonymizeUser(id: string) {
    return await app
      .get(AnonymizeUserHandler)
      .execute(new AnonymizeUserCommand(id));
  }
});

async function setup() {
  const module = await Test.createTestingModule({
    imports: [
      dbHandler.rootMongooseTestModule(),
      CqrsModule,
      UsersModule,
      AgreementsModule,
      KeyCodesModule,
      KindergartenModule,
    ],
    providers: [CreateKeyCodeHandler, CreateUserHandler],
  }).compile();

  await module.init();

  return module;
}
