import { Test, TestingModule } from '@nestjs/testing';
import { AddChildHandler } from '../add_child_handler';
import { AddChildCommand, CreateUserCommand } from '../../impl';
import * as dbHandler from '../../../../../db_handler';
import { CreateUserHandler } from '../create_user_handler';
import { KeyCodesModule } from '../../../../../key_codes/key_codes_module';
import waitForExpect from 'wait-for-expect';
import { UsersModule } from '../../../../users_module';
import { CreateKeyCodeHandler } from '../../../../../key_codes/domain/commands/handlers/create_key_code_handler';
import { User } from '../../../../../users/domain/models/user_model';
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
import { KindergartenProps } from '../../../../../kindergartens/domain/models/kindergarten_model';
import { NotificationsModule } from '../../../../../notifications/notifications.module';
import { NotificationRepository } from '../../../../../notifications/domain/repositories/notification_repository';
import { BirthQuarter } from '../../../models/birth_quarter_value_object';

let app: TestingModule;

afterAll(async () => {
  await dbHandler.closeInMongodConnection();
  await app.close();
});

beforeAll(async () => {
  await dbHandler.connect();
});

describe('AddChildHandler', () => {
  let parent: User;
  let kindergarten: KindergartenProps;
  let addedChild: Child;

  const validChildOptions = {
    birthYear: 2000,
    birthQuarter: 1,
    firstname: 'my-name',
    lastname: 'my-lastname',
    sex: 'male',
    kindergartenId: 'my-kindergartenId',
  };

  beforeEach(async () => {
    app = await setup();

    await dbHandler.clearDatabase();

    parent = await createParent();

    kindergarten = await createKindergarten();

    validChildOptions.kindergartenId = kindergarten._id;
  });

  describe('when executed', () => {
    describe('with correct data', () => {
      beforeEach(async () => {
        addedChild = await addChildCommandWith(validChildOptions, parent.id);

        await awaitForResponse();
      });

      it('returns child instance', async () => {
        expect(addedChild).toBeInstanceOf(Child);
        expect(addedChild.id).toBeInstanceOf(ObjectId);
        expect(addedChild.id.isEmpty()).toEqual(false);
        expect(addedChild.isDeleted).toEqual(false);
        expect(addedChild.kindergarten).toBeInstanceOf(ObjectId);
        expect(addedChild.kindergarten.isEmpty()).toEqual(false);
        expect(addedChild.kindergarten.toString()).toEqual(
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
        expect(addedChild.birthQuarter).toBeInstanceOf(BirthQuarter);
        expect(addedChild.birthQuarter.value).toEqual(1);
      });

      it('invokes child added notification', async () => {
        await waitForExpect(async () => {
          return expect(await getNotificationsForUser(parent.id)).toEqual(
            jasmine.arrayContaining([
              jasmine.objectContaining({
                templateId: 'child_created',
                user: parent.id,
              }),
            ]),
          );
        });
      });
    });

    describe('with invalid', () => {
      describe('with invalid firstname', () => {
        it('throws an error', async () => {
          await expect(() =>
            addChildCommandWith({ firstname: 'my' }, parent.id),
          ).rejects.toThrow('Firstname must be valid');

          await expect(() =>
            addChildCommandWith(
              { firstname: new Array(41).fill(' ').join('') },
              parent.id,
            ),
          ).rejects.toThrow('Firstname must be valid');

          await expect(() =>
            addChildCommandWith({ firstname: null }, parent.id),
          ).rejects.toThrow('Firstname is null or undefined');

          await expect(() =>
            addChildCommandWith({ firstname: undefined }, parent.id),
          ).rejects.toThrow('Firstname is null or undefined');
        });
      });

      describe('with invalid lastname', () => {
        it('throws an error', async () => {
          await expect(() =>
            addChildCommandWith({ lastname: 'my' }, parent.id),
          ).rejects.toThrow('Lastname must be valid');

          await expect(() =>
            addChildCommandWith(
              { lastname: new Array(51).fill(' ').join('') },
              parent.id,
            ),
          ).rejects.toThrow('Lastname must be valid');

          await expect(() =>
            addChildCommandWith({ lastname: null }, parent.id),
          ).rejects.toThrow('Lastname is null or undefined');

          await expect(() =>
            addChildCommandWith({ lastname: undefined }, parent.id),
          ).rejects.toThrow('Lastname is null or undefined');
        });
      });

      describe('with invalid birth year', () => {
        it('throws an error', async () => {
          await expect(() =>
            addChildCommandWith({ birthYear: null }, parent.id),
          ).rejects.toThrow('BirthYear must be valid, but got "null"');

          await expect(() =>
            addChildCommandWith({ birthYear: undefined }, parent.id),
          ).rejects.toThrow('BirthYear must be valid, but got "undefined"');
        });
      });

      describe('with invalid birth quarter', () => {
        it('throws an error', async () => {
          await expect(() =>
            addChildCommandWith({ birthQuarter: 4 }, parent.id),
          ).rejects.toThrow('BirthQuarter must be valid, but got "4"');

          await expect(() =>
            addChildCommandWith({ birthQuarter: null }, parent.id),
          ).rejects.toThrow('BirthQuarter must be valid, but got "null"');

          await expect(() =>
            addChildCommandWith({ birthQuarter: undefined }, parent.id),
          ).rejects.toThrow('BirthQuarter must be valid, but got "undefined"');
        });
      });

      describe('with invalid sex', () => {
        it('throws an error', async () => {
          await expect(() =>
            addChildCommandWith({ sex: 'another' }, parent.id),
          ).rejects.toThrow(
            'Sex must be either "male" or "female", but got "another"',
          );

          await expect(() =>
            addChildCommandWith({ sex: null }, parent.id),
          ).rejects.toThrow(
            'Sex must be either "male" or "female", but got "null"',
          );

          await expect(() =>
            addChildCommandWith({ sex: undefined }, parent.id),
          ).rejects.toThrow(
            'Sex must be either "male" or "female", but got "undefined"',
          );
        });
      });

      describe('with invalid parent Id', () => {
        describe('because it does not exist', () => {
          it('throws an error', async () => {
            await expect(() =>
              addChildCommandWith(
                validChildOptions,
                '5f944c57ac3334f90c8baeb0',
              ),
            ).rejects.toThrow('Parent not found');

            await expect(() =>
              addChildCommandWith(validChildOptions, 'wrongId'),
            ).rejects.toThrow('Parent not found');
          });
        });
      });

      describe('with invalid kindergarten Id', () => {
        describe('because it does not exist', () => {
          it('throws an error', async () => {
            await expect(() =>
              addChildCommandWith({ kindergartenId: parent.id }, parent.id),
            ).rejects.toThrow('Kindergarten not found');

            await expect(() =>
              addChildCommandWith({ kindergartenId: 'wrongId' }, parent.id),
            ).rejects.toThrow('Kindergarten not found');
          });
        });
      });
    });
  });

  function addChildCommandWith(options, parentId) {
    return app.resolve(AddChildHandler).then(handler => {
      return handler.execute(
        new AddChildCommand({ ...validChildOptions, ...options }, parentId),
      );
    });
  }

  async function createParent(): Promise<User> {
    const keyCode = await app
      .get(CreateKeyCodeHandler)
      .execute(new CreateBulkKeyCodeCommand('admin', 1, 'parent'));

    const parent = await app
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
    return app.get(CreateKindergartenHandler).execute(
      new CreateKindergartenCommand({
        number: 1,
        name: 'my-name',
        address: 'my-address',
        city: 'my-city',
      }),
    );
  }

  function getNotificationsForUser(user: string) {
    return app.get(NotificationRepository).getAll(user);
  }
});

async function setup() {
  const module = await Test.createTestingModule({
    imports: [
      dbHandler.rootMongooseTestModule(),
      UsersModule,
      KeyCodesModule,
      NotificationsModule,
      KindergartenModule,
    ],
  }).compile();

  await module.init();

  return module;
}

function awaitForResponse(): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, 0));
}
