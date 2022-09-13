import { CreateUserCommand } from '../../impl';
import { CreateUserHandler } from '../create_user_handler';
import { CreateKeyCodeHandler } from '../../../../../key_codes/domain/commands/handlers/create_key_code_handler';
import { User } from '../../../models/user_model';
import { CreateBulkKeyCodeCommand } from '../../../../../key_codes/domain/commands/impl/create_bulk_key_code_command';
import { CreateAgreementHandler } from '../../../../../agreements/domain/commands/handlers/create_agreement_handler';
import { CreateAgreementCommand } from '../../../../../agreements/domain/commands/impl/create_agreement_command';
import { UserInput } from '../../../../../users/inputs/user_input';
import { Agreement } from '@app/agreements/domain/models/agreement';
import { getApp } from '../../../../../../setupTests';

describe('CreateUserHandler', () => {
  let parent: User;

  describe('when executed', () => {
    describe('with correct data', () => {
      beforeEach(async () => {
        parent = await createParent();
      });

      it('returns user instance', () => {
        expect(parent).toBeInstanceOf(User);
        expect(parent.mail).toBe('my-mail@mail.com');
        expect(parent.agreements).toEqual([]);
      });

      it('user is created as not confirmed', () => {
        expect(parent.isConfirmed).toBe(false);
      });
    });

    describe('with valid agreements', () => {
      let agreement: Agreement;

      beforeEach(async () => {
        agreement = await createAgreement();
        parent = await createParent({ agreements: [agreement.id] });
      });

      it('returns user instance', () => {
        expect(parent).toBeInstanceOf(User);
        expect(parent.agreements).toEqual([agreement.id]);
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
    const keyCode = await getApp()
      .get(CreateKeyCodeHandler)
      .execute(new CreateBulkKeyCodeCommand('admin', 1, 'parent'));

    const parent = getApp()
      .get(CreateUserHandler)
      .execute(
        new CreateUserCommand({
          mail: 'my-mail@mail.com',
          password: 'my-password',
          keyCode: keyCode.keyCode,
          ...options,
        }),
      );

    return parent;
  }

  async function createAgreement(name: string = 'my-name'): Promise<Agreement> {
    return await getApp()
      .get(CreateAgreementHandler)
      .execute(
        new CreateAgreementCommand({
          text: name,
        }),
      );
  }
});
