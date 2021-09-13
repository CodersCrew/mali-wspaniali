import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';

import { CreateUserCommand } from '../../impl';
import * as dbHandler from '@app/db_handler';
import { CreateUserHandler } from '../create_user_handler';
import { KeyCodesModule } from '../../../../../key_codes/key_codes_module';
import { UsersModule } from '../../../../users_module';
import { CreateKeyCodeHandler } from '../../../../../key_codes/domain/commands/handlers/create_key_code_handler';
import { User } from '../../../models/user_model';
import { CreateBulkKeyCodeCommand } from '../../../../../key_codes/domain/commands/impl/create_bulk_key_code_command';
import { NotificationsModule } from '../../../../../notifications/notifications.module';
import { AgreementsModule } from '../../../../../agreements/agreements_module';
import { CreateAgreementHandler } from '../../../../../agreements/domain/commands/handlers/create_agreement_handler';
import { CreateAgreementCommand } from '../../../../../agreements/domain/commands/impl/create_agreement_command';
import { UserInput } from '../../../../../users/inputs/user_input';
import { ChangeUserAgreementCommand } from '../../impl/change_user_agreement_command';
import { ChangeUserAgreementHandler } from '../change_user_agreement_handler';
import { GetUserQuery } from '../../../queries/impl/get_user_query';
import { GetUserHandler } from '../../../queries/handlers/get_user_handler';
import { Agreement } from '@app/agreements/domain/models/agreement';

describe('CreateUserHandler', () => {
  let parent: User;
  let viewAgreement: Agreement;
  let marketingAgreement: Agreement;
  let app: TestingModule;

  afterEach(async () => {
    await app.close();
  });

  beforeEach(async () => {
    app = await setup();

    await dbHandler.clearDatabase();
  });

  describe('when executed', () => {
    describe('and user does not signed any agreement', () => {
      beforeEach(async () => {
        parent = await createParent();
        viewAgreement = await createAgreement('my-view-agreement');
        marketingAgreement = await createAgreement('my-marketing-agreement');
      });

      it('returns user with no agreement', async () => {
        expect(parent.agreements).toEqual([]);
      });
    });

    describe('and user signed all agreements', () => {
      let signViewAgreementResult: Agreement;
      let signMarketingAgreementResult: Agreement;
      let reFetchedParent: User;

      beforeEach(async () => {
        parent = await createParent();
        viewAgreement = await createAgreement('my-view-agreement');
        marketingAgreement = await createAgreement('my-marketing-agreement');
      });

      it('returns user with agreements', async () => {
        signViewAgreementResult = await signAgreement(
          parent.id,
          viewAgreement.id,
        );

        expect(signViewAgreementResult.isSigned()).toBe(true);
        reFetchedParent = await getParentById(parent.id);

        expect(reFetchedParent.agreements).toEqual([viewAgreement.id]);

        signMarketingAgreementResult = await signAgreement(
          parent.id,
          marketingAgreement.id,
        );
        expect(signMarketingAgreementResult.isSigned()).toBe(true);
        reFetchedParent = await getParentById(parent.id);

        expect(reFetchedParent.agreements).toEqual([
          viewAgreement.id,
          marketingAgreement.id,
        ]);
      });
    });

    describe('and user unsigned agreement', () => {
      let signViewAgreementResult: Agreement;
      let signMarketingAgreementResult: Agreement;
      let reFetchedParent: User;

      beforeEach(async () => {
        parent = await createParent();
        viewAgreement = await createAgreement('my-view-agreement');
        marketingAgreement = await createAgreement('my-marketing-agreement');
        signViewAgreementResult = await signAgreement(
          parent.id,
          viewAgreement.id,
        );
        signMarketingAgreementResult = await signAgreement(
          parent.id,
          marketingAgreement.id,
        );
      });

      it('returns user with agreements', async () => {
        reFetchedParent = await getParentById(parent.id);

        expect(reFetchedParent.agreements).toEqual([
          viewAgreement.id,
          marketingAgreement.id,
        ]);

        signViewAgreementResult = await signAgreement(
          parent.id,
          viewAgreement.id,
        );

        reFetchedParent = await getParentById(parent.id);

        expect(reFetchedParent.agreements).toEqual([marketingAgreement.id]);
      });
    });
  });

  async function signAgreement(
    userId: string,
    agreementId: string,
  ): Promise<Agreement> {
    const agreement = app
      .get(ChangeUserAgreementHandler)
      .execute(new ChangeUserAgreementCommand(userId, agreementId));

    return agreement;
  }

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

  async function createAgreement(name = 'my-name'): Promise<Agreement> {
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
