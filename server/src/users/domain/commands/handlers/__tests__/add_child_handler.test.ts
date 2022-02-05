import waitForExpect from 'wait-for-expect';

import { AddChildHandler } from '../add_child_handler';
import { AddChildCommand } from '../../impl';
import { User } from '../../../../../users/domain/models/user_model';
import { Child } from '../../../models/child_model';
import { Kindergarten } from '../../../../../kindergartens/domain/models/kindergarten_model';
import { NotificationRepository } from '../../../../../notifications/domain/repositories/notification_repository';
import {
  createKindergartenWith,
  createParent,
} from '../../../../../test/helpers/app_mock';
import { ChildInput } from '../../../../inputs/child_input';
import { getApp } from '../../../../../../setupTests';

jest.setTimeout(10000);

describe('AddChildHandler', () => {
  let parent: User;
  let kindergarten: Kindergarten;
  let addedChild: Child;

  const validChildOptions: ChildInput = {
    birthYear: 2000,
    birthQuarter: 1,
    firstname: 'my-name',
    lastname: 'my-lastname',
    sex: 'male',
    kindergartenId: 'my-kindergartenId',
  };

  beforeEach(async () => {
    await awaitForResponse();

    parent = await createParent();

    await awaitForResponse();

    kindergarten = await createKindergartenWith();

    validChildOptions.kindergartenId = kindergarten.id;

    await awaitForResponse();
  });

  describe('when executed', () => {
    describe('with correct data', () => {
      beforeEach(async () => {
        addedChild = await addChildCommandWith(validChildOptions, parent.id);
        await awaitForResponse();
      });

      it('returns child instance', async () => {
        expect(addedChild).toBeInstanceOf(Child);
        expect(typeof addedChild.id).toBe('string');
        expect(addedChild.isDeleted).toEqual(false);
        expect(typeof addedChild.kindergarten).toBe('string');
        expect(addedChild.kindergarten).toEqual(kindergarten.id);
        expect(addedChild.sex).toEqual('male');
        expect(addedChild.firstname).toEqual('my-name');
        expect(addedChild.lastname).toEqual('my-lastname');
        expect(addedChild.birthYear).toEqual(2000);
        expect(addedChild.birthQuarter).toEqual(1);
      });

      it('invokes child added notification', async () => {
        const parentId = parent.id;

        await waitForExpect(
          async () => {
            await awaitForResponse();
            const [notification] = await getNotificationsForUser(parentId);

            expect(notification).toBeDefined();

            expect(notification.templateId).toBe('child_created');
            expect(notification.user).toBe(parentId);
          },
          9000,
          1000,
        );
      });
    });

    describe('with invalid', () => {
      describe('with invalid firstname', () => {
        it('throws an error', async () => {
          await expect(
            addChildCommandWith({ firstname: 'my' }, parent.id),
          ).toHaveValidationError(
            'firstname must be longer than or equal to 3 characters',
          );

          await expect(
            addChildCommandWith({ firstname: null }, parent.id),
          ).toHaveValidationError(
            'firstname must be longer than or equal to 3 characters',
          );

          await expect(
            addChildCommandWith({ firstname: undefined }, parent.id),
          ).toHaveValidationError(
            'firstname must be longer than or equal to 3 characters',
          );
        });
      });

      describe('with invalid lastname', () => {
        it('throws an error', async () => {
          await expect(
            addChildCommandWith({ lastname: 'my' }, parent.id),
          ).toHaveValidationError(
            'lastname must be longer than or equal to 3 characters',
          );

          await expect(
            addChildCommandWith(
              { lastname: new Array(51).fill(' ').join('') },
              parent.id,
            ),
          ).toHaveValidationError(
            'lastname must be shorter than or equal to 50 characters',
          );

          await expect(
            addChildCommandWith({ lastname: null }, parent.id),
          ).toHaveValidationError(
            'lastname must be longer than or equal to 3 characters',
          );

          await expect(
            addChildCommandWith({ lastname: undefined }, parent.id),
          ).toHaveValidationError(
            'lastname must be longer than or equal to 3 characters',
          );
        });
      });

      describe('with invalid birth quarter', () => {
        it('throws an error', async () => {
          await expect(
            addChildCommandWith({ birthQuarter: 4 }, parent.id),
          ).toHaveValidationError('birthQuarter must not be greater than 3');

          await expect(() =>
            addChildCommandWith({ birthQuarter: null }, parent.id),
          ).rejects.toEqual(
            jasmine.arrayContaining([
              jasmine.objectContaining({
                constraints: {
                  max: 'birthQuarter must not be greater than 3',
                  min: 'birthQuarter must not be less than 0',
                },
              }),
            ]),
          );

          await expect(() =>
            addChildCommandWith({ birthQuarter: undefined }, parent.id),
          ).rejects.toEqual(
            jasmine.arrayContaining([
              jasmine.objectContaining({
                constraints: {
                  max: 'birthQuarter must not be greater than 3',
                  min: 'birthQuarter must not be less than 0',
                },
              }),
            ]),
          );
        });
      });

      describe('with invalid sex', () => {
        it('throws an error', async () => {
          await expect(
            addChildCommandWith({ sex: 'another' }, parent.id),
          ).toHaveValidationError(
            'sex must be one of the following values: male,female',
          );

          await expect(
            addChildCommandWith({ sex: null }, parent.id),
          ).toHaveValidationError(
            'sex must be one of the following values: male,female',
          );

          await expect(
            addChildCommandWith({ sex: undefined }, parent.id),
          ).toHaveValidationError(
            'sex must be one of the following values: male,female',
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

  async function addChildCommandWith(
    options: Partial<ChildInput>,
    parentId: string,
  ) {
    return getApp()
      .resolve(AddChildHandler)
      .then(handler => {
        return handler.execute(
          new AddChildCommand({ ...validChildOptions, ...options }, parentId),
        );
      });
  }

  function getNotificationsForUser(user: string) {
    return getApp()
      .get(NotificationRepository)
      .getAll(user);
  }
});

function awaitForResponse(): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, 0));
}
