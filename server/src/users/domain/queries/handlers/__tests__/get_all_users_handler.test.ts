import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';

import * as dbHandler from '@app/db_handler';
import { KeyCodesModule } from '../../../../../key_codes/key_codes_module';
import { UsersModule } from '../../../../users_module';
import { CreateKeyCodeHandler } from '../../../../../key_codes/domain/commands/handlers/create_key_code_handler';
import { User } from '../../../models/user_model';
import { CreateBulkKeyCodeCommand } from '../../../../../key_codes/domain/commands/impl/create_bulk_key_code_command';
import { AgreementsModule } from '../../../../../agreements/agreements_module';
import { UserInput } from '../../../../inputs/user_input';
import { KindergartenModule } from '../../../../../kindergartens/kindergarten_module';
import { GetAllUsersHandler } from '../get_all_users_handler';
import { GetAllUsersQuery } from '../../impl/get_all_users_query';
import { CreateUserHandler } from '../../../commands/handlers/create_user_handler';
import { CreateUserCommand } from '../../../commands/impl/create_user_command';
import { anonymizeUser } from '../../../../../test/helpers/app_mock';

describe('GetAllUsersHandler', () => {
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

  describe('when executed', () => {
    let fetchedUsers: User[];

    beforeEach(async () => {
      await createParent({ mail: 'user1@user.com' });
      await createParent({ mail: 'user2@user.com' });
      fetchedUsers = await getAllUsers();
    });

    it('returns users', async () => {
      expect(fetchedUsers.length).toBe(2);
      expect(fetchedUsers[0].mail).toBe('user1@user.com');
      expect(fetchedUsers[0].isDeleted()).toBe(false);
      expect(fetchedUsers[1].mail).toBe('user2@user.com');
      expect(fetchedUsers[1].isDeleted()).toBe(false);
    });
  });

  describe('when executed and some users are anonymized', () => {
    let fetchedUsers: User[];

    beforeEach(async () => {
      await createParent({ mail: 'user1@user.com' });

      const userToBeAnonymized = await createParent({ mail: 'user2@user.com' });

      await anonymizeUser(userToBeAnonymized.id);

      await createParent({ mail: 'user3@user.com' });
      fetchedUsers = await getAllUsers();
    });

    it('returns valid users', async () => {
      expect(fetchedUsers.length).toBe(2);
      expect(fetchedUsers[0].mail).toBe('user1@user.com');
      expect(fetchedUsers[0].isDeleted()).toBe(false);
      expect(fetchedUsers[1].mail).toBe('user3@user.com');
      expect(fetchedUsers[1].isDeleted()).toBe(false);
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

  function getAllUsers() {
    return app.get(GetAllUsersHandler).execute(new GetAllUsersQuery({}));
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
