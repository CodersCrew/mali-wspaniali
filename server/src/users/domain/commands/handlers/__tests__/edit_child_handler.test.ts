import { AddChildHandler } from '../add_child_handler';
import { User } from '../../../models/user_model';
import { CreateKeyCodeHandler } from '../../../../../key_codes/domain/commands/handlers/create_key_code_handler';
import { CreateBulkKeyCodeCommand } from '../../../../../key_codes/domain/commands/impl/create_bulk_key_code_command';
import { CreateUserHandler } from '../create_user_handler';
import { CreateUserCommand } from '../../impl/create_user_command';
import { CreateKindergartenHandler } from '../../../../../kindergartens/domain/commands/handlers/create_kindergarten_handler';
import { CreateKindergartenCommand } from '../../../../../kindergartens/domain/commands/impl/create_kindergarten_command';
import { Kindergarten } from '../../../../../kindergartens/domain/models/kindergarten_model';
import { EditChildHandler } from '../edit_child_handler';
import { EditChildCommand } from '../../impl/edit_child_command';
import { Child } from '../../../models/child_model';
import { AddChildCommand } from '../../impl';
import { getApp } from '../../../../../../setupTests';

describe('EditChildHandler', () => {
  let parent: User;
  let kindergarten: Kindergarten;
  let updatedChild: Child;
  let createdChild: Child;
  let newKindergarten: Kindergarten;

  const validChildOptions = {
    birthYear: 2000,
    birthQuarter: 1,
    firstname: 'my-name',
    lastname: 'my-lastname',
    sex: 'male',
    kindergartenId: 'my-kindergartenId',
  };

  beforeEach(async () => {
    parent = await createParent();

    kindergarten = await createKindergarten();
    newKindergarten = await createKindergarten();

    validChildOptions.kindergartenId = kindergarten.id;
  });

  describe('when executed', () => {
    describe('with correct data', () => {
      beforeEach(async () => {
        createdChild = await addChildCommandWith(validChildOptions, parent.id);
        updatedChild = await editChildCommandWith(
          {
            childId: createdChild.id,
            birthYear: 2001,
            firstname: 'changed-name',
            sex: 'female',
            kindergartenId: newKindergarten.id,
          },
          parent.id,
        );

        await awaitForResponse();
      });

      it('returns changed child instance', () => {
        expect(updatedChild).toBeInstanceOf(Child);
        expect(typeof updatedChild.kindergarten).toBe('string');
        expect(updatedChild.kindergarten).toEqual(newKindergarten.id);
        expect(updatedChild.sex).toEqual('female');
        expect(updatedChild.firstname).toEqual('changed-name');
        expect(updatedChild.lastname).toEqual('my-lastname');
        expect(updatedChild.birthYear).toEqual(2001);
        expect(updatedChild.birthQuarter).toEqual(1);
      });
    });

    describe('with incorrect data', () => {
      describe('because kindergarten does not exists', () => {
        beforeEach(async () => {
          createdChild = await addChildCommandWith(
            validChildOptions,
            parent.id,
          );

          await awaitForResponse();
        });

        it('throws an error', async () => {
          await expect(() =>
            editChildCommandWith(
              {
                childId: createdChild.id,
                birthYear: 2001,
                kindergartenId: 'wrong-id',
              },
              parent.id,
            ),
          ).rejects.toThrow('Kindergarten not found');
        });
      });

      describe('because first name is too short', () => {
        beforeEach(async () => {
          createdChild = await addChildCommandWith(
            validChildOptions,
            parent.id,
          );

          await awaitForResponse();
        });

        it('throws an error', async () => {
          await expect(
            editChildCommandWith(
              {
                childId: createdChild.id,
                firstname: 'm',
              },
              parent.id,
            ),
          ).toHaveValidationError(
            'firstname must be longer than or equal to 3 characters',
          );
        });
      });
    });
  });

  function editChildCommandWith(options, parentId) {
    return getApp()
      .resolve(EditChildHandler)
      .then(handler => {
        return handler.execute(
          new EditChildCommand({ ...validChildOptions, ...options }, parentId),
        );
      });
  }

  function addChildCommandWith(options, parentId) {
    return getApp()
      .resolve(AddChildHandler)
      .then(handler => {
        return handler.execute(
          new AddChildCommand({ ...validChildOptions, ...options }, parentId),
        );
      });
  }

  async function createParent(): Promise<User> {
    const keyCode = await getApp()
      .get(CreateKeyCodeHandler)
      .execute(new CreateBulkKeyCodeCommand('admin', 1, 'parent'));

    const parent = await getApp()
      .get(CreateUserHandler)
      .execute(
        new CreateUserCommand({
          mail: 'my-mail@mail.com',
          password: 'my-password',
          keyCode: keyCode.keyCode,
        }),
      );

    return parent;
  }

  function createKindergarten() {
    return getApp()
      .get(CreateKindergartenHandler)
      .execute(
        new CreateKindergartenCommand({
          number: 1,
          name: 'my-name',
          address: 'my-address',
          city: 'my-city',
        }),
      );
  }
});

function awaitForResponse(): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, 0));
}
