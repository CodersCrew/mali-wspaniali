import waitForExpect from 'wait-for-expect';

import { CreateKindergartenCommand } from '../../impl';
import { CreateKindergartenHandler } from '../create_kindergarten_handler';
import { Kindergarten } from '../../../models/kindergarten_model';
import { NotificationRepository } from '../../../../../notifications/domain/repositories/notification_repository';
import { UserRepository } from '../../../../../users/domain/repositories/user_repository';
import { User } from '../../../../../users/domain/models/user_model';
import { KindergartenInput } from '../../../../inputs/kindergarten_input';
import { getApp } from '../../../../../../setupTests';

describe('CreatKindergartenHandler', () => {
  let admin: User;

  const validKindergartenOptions = {
    number: 1,
    name: 'my-name',
    address: 'my-address',
    city: 'my-city',
  };

  let createdKindergarten: Kindergarten;

  describe('when executed with correct data', () => {
    beforeEach(async () => {
      admin = await createAdmin();
      createdKindergarten = await createKindergartenWith(
        validKindergartenOptions,
      );
    });

    it('returns Kindergarten instance', () => {
      expect(createdKindergarten).toBeInstanceOf(Kindergarten);
      expect(typeof createdKindergarten.id).toBe('string');
      expect(createdKindergarten.name).toEqual('my-name');
      expect(createdKindergarten.number).toEqual(1);
      expect(createdKindergarten.address).toEqual('my-address');
      expect(createdKindergarten.city).toEqual('my-city');
      expect(createdKindergarten.isDeleted).toEqual(false);
    });

    it('invokes child added notification', async () => {
      await waitForExpect(async () => {
        const notifications = await getNotificationsForUser(admin.id);

        expect(notifications[0].templateId).toBe('kindergarten_created');
        expect(notifications[0].values).toEqual(['my-name']);
      });
    });
  });

  describe('when executed with incorrect data', () => {
    it('throws an error', async () => {
      await expect(async () => {
        await createKindergartenWith({ name: 'my' });
      }).rejects.toBeDefined();
    });
  });

  function createKindergartenWith(options: Partial<KindergartenInput>) {
    return getApp()
      .get(CreateKindergartenHandler)
      .execute(
        new CreateKindergartenCommand({
          ...validKindergartenOptions,
          ...options,
        }),
      );
  }

  function getNotificationsForUser(user: string) {
    return getApp()
      .get(NotificationRepository)
      .getAll(user);
  }

  async function createAdmin() {
    const userRepository = getApp().get(UserRepository);

    await userRepository.createAdmin('admin@admin.com', 'adminadmin');

    return userRepository.getByMail('admin@admin.com');
  }
});
