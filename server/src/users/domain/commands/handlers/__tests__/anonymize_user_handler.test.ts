import { AddChildCommand } from '../../impl';
import * as dbHandler from '@app/db_handler';
import { User } from '../../../models/user_model';
import { GetUserQuery } from '../../../queries/impl/get_user_query';
import { GetUserHandler } from '../../../queries/handlers/get_user_handler';
import { AnonymizeUserCommand } from '../../impl/anonymize_user_command';
import { AnonymizeUserHandler } from '../anonymize_user_handler';
import { AddChildHandler } from '../add_child_handler';
import { CreateKindergartenHandler } from '../../../../../kindergartens/domain/commands/handlers/create_kindergarten_handler';
import { CreateKindergartenCommand } from '../../../../../kindergartens/domain/commands/impl/create_kindergarten_command';
import waitForExpect from 'wait-for-expect';
import { NotificationRepository } from '../../../../../notifications/domain/repositories/notification_repository';
import { ChildRepository } from '../../../repositories/child_repository';
import { createParent } from '../../../../../test/helpers/app_mock';
import { getApp } from '../../../../../../setupTests';

describe('AnonymizeUserHandler', () => {
  beforeEach(async () => {
    await dbHandler.clearDatabase();
  });

  describe('when executed on parent without children', () => {
    let user: User;
    let anonymizedUser: User;

    beforeEach(async () => {
      user = await createParent({ mail: 'user1@user.com' });
      anonymizedUser = await anonymizeUser(user.id);
    });

    it('anonymize user', async () => {
      expect(user.mail).toBe('user1@user.com');
      expect(user.isDeleted()).toBe(false);

      expect(anonymizedUser.mail).toBe('');
      expect(anonymizedUser.isDeleted()).toBe(true);

      await waitForExpect(async () => {
        const fetchedUser = await getParentById(user.id);

        expect(fetchedUser.mail).toBe('');
        expect(fetchedUser.isDeleted()).toBe(true);
        expect(fetchedUser.children).toEqual([]);
      });
    });
  });

  describe('when executed on parent with children', () => {
    let user: User;
    let anonymizedUser: User;
    let fetchedUser: User;

    beforeEach(async () => {
      user = await createParent({ mail: 'user1@user.com' });
      const user2 = await createParent({ mail: 'user2@user.com' });
      await addChildCommandWith({}, user.id);
      await addChildCommandWith({}, user2.id);
    });

    it('anonymize user', async () => {
      anonymizedUser = await anonymizeUser(user.id);
      fetchedUser = await getParentById(user.id);

      expect(user.mail).toBe('user1@user.com');
      expect(user.isDeleted()).toBe(false);

      expect(anonymizedUser.mail).toBe('');
      expect(anonymizedUser.isDeleted()).toBe(true);

      expect(fetchedUser.mail).toBe('');
      expect(fetchedUser.isDeleted()).toBe(true);
      expect(fetchedUser.children.length).toBe(1);
    });

    it('anonymize children', async () => {
      expect((await getAllChildren()).length).toBe(2);

      anonymizedUser = await anonymizeUser(user.id);

      fetchedUser = await getParentById(user.id);

      await waitForExpect(async () => {
        expect((await getAllChildren()).length).toBe(1);

        const fetchedChildren = await getChildren(fetchedUser.children);

        expect(fetchedChildren.length).toBe(0);
      });
    });
  });

  async function getParentById(userId: string) {
    const parent = getApp()
      .get(GetUserHandler)
      .execute(new GetUserQuery(userId));

    return parent;
  }

  async function addChildCommandWith(options, parentId) {
    const validChildOptions = {
      birthYear: 2000,
      birthQuarter: 1,
      firstname: 'my-name',
      lastname: 'my-lastname',
      sex: 'male',
      kindergartenId: 'my-kindergartenId',
    };

    const kindergarten = await createKindergarten();

    const child = getApp()
      .resolve(AddChildHandler)
      .then(handler => {
        return handler.execute(
          new AddChildCommand(
            {
              ...validChildOptions,
              kindergartenId: kindergarten.id,
              ...options,
            },
            parentId,
          ),
        );
      });

    await waitForExpect(
      async () => {
        const [notification] = await getNotificationsForUser(parentId);

        expect(notification).toBeDefined();

        expect(notification.templateId).toBe('child_created');
        expect(notification.user).toBe(parentId);
      },
      9000,
      1000,
    );

    return child;
  }

  function getNotificationsForUser(user: string) {
    return getApp()
      .get(NotificationRepository)
      .getAll(user);
  }

  function getChildren(ids: string[]) {
    return getApp()
      .get(ChildRepository)
      .get(ids);
  }

  function getAllChildren() {
    return getApp()
      .get(ChildRepository)
      .getAll();
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

  async function anonymizeUser(id: string) {
    return await getApp()
      .get(AnonymizeUserHandler)
      .execute(new AnonymizeUserCommand(id));
  }
});
