import { Test } from '@nestjs/testing';
import { AddChildHandler } from '../add_child_handler';
import { AddChildCommand, CreateUserCommand } from '../../impl';
import * as dbHandler from '../../../../../db_handler';
import { CreateUserHandler } from '../create_user_handler';
import { KeyCodesModule } from '../../../../../key_codes/key_codes_module';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersModule } from '../../../../users_module';
import { CreateKeyCodeHandler } from '../../../../../key_codes/domain/commands/handlers/create_key_code_handler';
import { User, UserProps } from '../../../../../users/domain/models/user_model';
import { Child } from '../../../models/child_model';
import { ObjectId } from '../../../models/object_id_value_object';
import { Sex } from '../../../models/sex_value_object';
import { Firstname } from '../../../models/firstname_value_object';
import { Lastname } from '../../../models/lastname_value_object';
import { BirthYear } from '../../../models/birth_year_value_object';
import { CreateBulkKeyCodeCommand } from '../../../../../key_codes/domain/commands/impl/create_bulk_key_code_command';
import { KindergartenModule } from '../../../../../kindergartens/kindergarten_module';
import { CreateKindergartenHandler } from '../../../../../kindergartens/domain/commands/handlers/create_kindergarten_handler';
import { CreateKindergartenCommand } from '../../../../../kindergartens/domain/commands/impl/create_kindergarten_command';

jest.setTimeout(60000);

describe('AddChildHandler', () => {
  let parent: UserProps;
  let kindergarten;
  let addedChild: Child;
  let module;

  const validChildOptions = {
    birthYear: 2000,
    firstname: 'my-name',
    lastname: 'my-lastname',
    sex: 'male',
    kindergartenId: 'my-kindergartenId',
  };

  beforeAll(async () => {
    module = await setup();
  });
  afterAll(async () => await dbHandler.closeInMongodConnection());
  beforeEach(async () => {
    await dbHandler.clearDatabase();

    const parentObj = await createParent();

    parent = parentObj.getProps() as UserProps;

    kindergarten = await createKindergarten();

    validChildOptions.kindergartenId = kindergarten._id;
  });

  describe('when executed', () => {
    describe('with correct data', () => {
      beforeEach(async () => {
        addedChild = await addChildCommandWith(validChildOptions, parent._id);
      });

      it('returns child instance', async () => {
        expect(addedChild).toBeInstanceOf(Child);
        expect(addedChild.id).toBeInstanceOf(ObjectId);
        expect(addedChild.id.isEmpty()).toEqual(false);
        expect(addedChild.isDeleted).toEqual(false);
        expect(addedChild.kindergarten).toBeInstanceOf(ObjectId);
        expect(addedChild.kindergarten.isEmpty()).toEqual(false);
        expect(addedChild.kindergarten.value.toString()).toEqual(
          kindergarten._id.toString(),
        );
        expect(addedChild.sex).toBeInstanceOf(Sex);
        expect(addedChild.sex.value).toEqual('male');
        expect(addedChild.firstname).toBeInstanceOf(Firstname);
        expect(addedChild.firstname.value).toEqual('my-name');
        expect(addedChild.lastname).toBeInstanceOf(Lastname);
        expect(addedChild.lastname.value).toEqual('my-lastname');
        expect(addedChild.birthYear).toBeInstanceOf(BirthYear);
        expect(addedChild.birthYear.value).toEqual(2000);
      });
    });

    describe('with invalid', () => {
      describe('with invalid firstname', () => {
        it('throws an error', async () => {
          await expect(
            addChildCommandWith({ firstname: 'my' }, parent._id),
          ).rejects.toEqual('Firstname must be valid');

          await expect(
            addChildCommandWith(
              { firstname: new Array(41).fill(' ').join('') },
              parent._id,
            ),
          ).rejects.toEqual('Firstname must be valid');

          await expect(
            addChildCommandWith({ firstname: null }, parent._id),
          ).rejects.toEqual('Firstname is null or undefined');

          await expect(
            addChildCommandWith({ firstname: undefined }, parent._id),
          ).rejects.toEqual('Firstname is null or undefined');
        });
      });

      describe('with invalid lastname', () => {
        it('throws an error', async () => {
          await expect(
            addChildCommandWith({ lastname: 'my' }, parent._id),
          ).rejects.toEqual('Lastname must be valid');

          await expect(
            addChildCommandWith(
              { lastname: new Array(51).fill(' ').join('') },
              parent._id,
            ),
          ).rejects.toEqual('Lastname must be valid');

          await expect(
            addChildCommandWith({ lastname: null }, parent._id),
          ).rejects.toEqual('Lastname is null or undefined');

          await expect(
            addChildCommandWith({ lastname: undefined }, parent._id),
          ).rejects.toEqual('Lastname is null or undefined');
        });
      });

      describe('with invalid birth year', () => {
        it('throws an error', async () => {
          await expect(
            addChildCommandWith({ birthYear: null }, parent._id),
          ).rejects.toEqual('BirthYear must be valid, but got "null"');

          await expect(
            addChildCommandWith({ birthYear: undefined }, parent._id),
          ).rejects.toEqual('BirthYear must be valid, but got "undefined"');
        });
      });

      describe('with invalid sex', () => {
        it('throws an error', async () => {
          await expect(
            addChildCommandWith({ sex: 'another' }, parent._id),
          ).rejects.toEqual(
            'Sex must be either "male" or "female", but got "another"',
          );

          await expect(
            addChildCommandWith({ sex: null }, parent._id),
          ).rejects.toEqual(
            'Sex must be either "male" or "female", but got "null"',
          );

          await expect(
            addChildCommandWith({ sex: undefined }, parent._id),
          ).rejects.toEqual(
            'Sex must be either "male" or "female", but got "undefined"',
          );
        });
      });

      describe('with invalid parent Id', () => {
        describe('because it does not exist', () => {
          it('throws an error', async () => {
            await expect(
              addChildCommandWith(
                validChildOptions,
                '5f944c57ac3334f90c8baeb0',
              ),
            ).rejects.toThrow('Parent not found');

            await expect(
              addChildCommandWith(validChildOptions, 'wrongId'),
            ).rejects.toThrow('Parent not found');
          });
        });
      });

      describe('with invalid kindergarten Id', () => {
        describe('because it does not exist', () => {
          it('throws an error', async () => {
            await expect(() =>
              addChildCommandWith({ kindergartenId: parent._id }, parent._id),
            ).rejects.toThrow('Kindergarten not found');

            await expect(() =>
              addChildCommandWith({ kindergartenId: 'wrongId' }, parent._id),
            ).rejects.toThrow('Kindergarten not found');
          });
        });
      });
    });
  });

  function addChildCommandWith(options, parentId) {
    return module
      .get(AddChildHandler)
      .execute(
        new AddChildCommand({ ...validChildOptions, ...options }, parentId),
      );
  }

  async function createParent(): Promise<User> {
    const keyCode = await module
      .get(CreateKeyCodeHandler)
      .execute(new CreateBulkKeyCodeCommand('admin', 1, 'parent'));

    const parent = await module
      .get(CreateUserHandler)
      .execute(
        new CreateUserCommand(
          'my-mail@mail.com',
          'my-password',
          keyCode.keyCode,
        ),
      );

    return parent;
  }

  function createKindergarten() {
    return module.get(CreateKindergartenHandler).execute(
      new CreateKindergartenCommand({
        number: 1,
        name: 'my-name',
        address: 'my-address',
        city: 'my-city',
      }),
    );
  }
});

async function setup() {
  return await Test.createTestingModule({
    imports: [
      dbHandler.rootMongooseTestModule(),
      CqrsModule,
      UsersModule,
      KeyCodesModule,
      KindergartenModule,
    ],
    providers: [AddChildHandler, CreateUserHandler, CreateKeyCodeHandler],
  }).compile();
}

export function awaitForResponse(): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, 0));
}
