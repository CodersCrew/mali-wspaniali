import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';

import { CreateUserCommand } from '../../impl';
import * as dbHandler from '../../../../../db_handler';
import { CreateUserHandler } from '../create_user_handler';
import { KeyCodesModule } from '../../../../../key_codes/key_codes_module';
import { UsersModule } from '../../../../users_module';
import { CreateKeyCodeHandler } from '../../../../../key_codes/domain/commands/handlers/create_key_code_handler';
import { User } from '../../../models/user_model';
import { CreateBulkKeyCodeCommand } from '../../../../../key_codes/domain/commands/impl/create_bulk_key_code_command';
import { NotificationsModule } from '../../../../../notifications/notifications.module';
import { AgreementsModule } from '../../../../../agreements/agreements_module';
import { CreateAgreementHandler } from '../../../../../agreements/domain/commands/handlers/create_agreement_handler';
import { AgreementProps } from '../../../../../agreements/schemas/agreement_schema';
import { CreateAgreementCommand } from '../../../../../agreements/domain/commands/impl/create_agreement_command';
import { UserInput } from '../../../../../users/inputs/user_input';

describe('CreateUserHandler', () => {
  let parent: User;
  let app: TestingModule;

  afterEach(async () => {
    await app.close();
  });

  beforeEach(async () => {
    app = await setup();

    await dbHandler.clearDatabase();
  });

  describe('when executed', () => {
    describe('with correct data', () => {
      beforeEach(async () => {
        parent = await createParent();
      });

      it('returns user instance', async () => {
        expect(parent).toBeInstanceOf(User);
        expect(parent.mail).toBe('my-mail@mail.com');
        expect(parent.agreements).toEqual([]);
      });
    });

    describe('with valid agreements', () => {
      let agreement: AgreementProps;

      beforeEach(async () => {
        agreement = await createAgreement();
        parent = await createParent({ agreements: [agreement._id] });
      });

      it('returns user instance', () => {
        expect(parent).toBeInstanceOf(User);
        expect(parent.agreements).toEqual([agreement._id]);
      });
    });

    describe('with invalid agreements', () => {
      beforeEach(async () => {
        await createAgreement();
      });

      it('throws an error', async () => {
        await expect(
          createParent({ agreements: ['invalid-agreement'] }),
        ).rejects.toEqual(new Error('Wrong agreements'));
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

  async function createAgreement(name: string = 'my-name') {
    return await app.get(CreateAgreementHandler).execute(
      new CreateAgreementCommand({
        text: name,
      }),
    );
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
      NotificationsModule,
    ],
    providers: [CreateKeyCodeHandler, CreateUserHandler],
  }).compile();

  return await module.init();
}
