import { CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

import * as dbHandler from '@app/db_handler';
import { UsersModule } from '../../../../users_module';
import { KeyCodesModule } from '../../../../../key_codes/key_codes_module';
import { KindergartenModule } from '../../../../../kindergartens/kindergarten_module';
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
import { Lastname } from '../../../models/lastname_value_object';
import { Sex } from '../../../models/sex_value_object';
import { Firstname } from '../../../models/firstname_value_object';
import { ObjectId } from '../../../models/object_id_value_object';
import { BirthYear } from '../../../models/birth_year_value_object';
import { BirthQuarter } from '../../../models/birth_quarter_value_object';

describe('EditChildHandler', () => {
  let module: TestingModule;
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
    module = await setup();

    await dbHandler.clearDatabase();

    parent = await createParent();

    kindergarten = await createKindergarten();
    newKindergarten = await createKindergarten();

    validChildOptions.kindergartenId = kindergarten.id.toString();
  });

  afterEach(async () => {
    await module.close();
  });

  describe('when executed', () => {
    describe('with correct data', () => {
      beforeEach(async () => {
        createdChild = await addChildCommandWith(validChildOptions, parent.id);
        updatedChild = await editChildCommandWith(
          {
            childId: createdChild.id.value,
            birthYear: 2001,
            firstname: 'changed-name',
            sex: 'female',
            kindergartenId: newKindergarten.id.toString(),
          },
          parent.id,
        );

        await awaitForResponse();
      });

      it('returns changed child instance', () => {
        expect(updatedChild).toBeInstanceOf(Child);
        expect(updatedChild.kindergarten).toBeInstanceOf(ObjectId);
        expect(updatedChild.kindergarten.toString()).toEqual(
          newKindergarten.id.toString(),
        );
        expect(updatedChild.sex).toBeInstanceOf(Sex);
        expect(updatedChild.sex.value).toEqual('female');
        expect(updatedChild.firstname).toBeInstanceOf(Firstname);
        expect(updatedChild.firstname.value).toEqual('changed-name');
        expect(updatedChild.lastname).toBeInstanceOf(Lastname);
        expect(updatedChild.lastname.value).toEqual('my-lastname');
        expect(updatedChild.birthYear).toBeInstanceOf(BirthYear);
        expect(updatedChild.birthYear.value).toEqual(2001);
        expect(updatedChild.birthQuarter).toBeInstanceOf(BirthQuarter);
        expect(updatedChild.birthQuarter.value).toEqual(1);
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
                childId: createdChild.id.value,
                birthYear: 2001,
                kindergartenId: '5fa2f8882e75d3426f0621c1',
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
          await expect(() =>
            editChildCommandWith(
              {
                childId: createdChild.id.value,
                firstname: 'm',
              },
              parent.id,
            ),
          ).rejects.toThrow('Firstname must be valid');
        });
      });
    });
  });

  function editChildCommandWith(options, parentId) {
    return module.resolve(EditChildHandler).then(handler => {
      return handler.execute(
        new EditChildCommand({ ...validChildOptions, ...options }, parentId),
      );
    });
  }

  function addChildCommandWith(options, parentId) {
    return module.resolve(AddChildHandler).then(handler => {
      return handler.execute(
        new AddChildCommand({ ...validChildOptions, ...options }, parentId),
      );
    });
  }

  async function createParent(): Promise<User> {
    const keyCode = await module
      .get(CreateKeyCodeHandler)
      .execute(new CreateBulkKeyCodeCommand('admin', 1, 'parent'));

    const parent = await module.get(CreateUserHandler).execute(
      new CreateUserCommand({
        mail: 'my-mail@mail.com',
        password: 'my-password',
        keyCode: keyCode.keyCode,
      }),
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
    providers: [
      AddChildHandler,
      EditChildHandler,
      CreateUserHandler,
      CreateKeyCodeHandler,
    ],
  }).compile();
}

function awaitForResponse(): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, 0));
}
