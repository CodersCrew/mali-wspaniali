import * as dbHandler from '@app/db_handler';
import { User } from '../../../models/user_model';
import { GetAllUsersHandler } from '../get_all_users_handler';
import { GetAllUsersQuery } from '../../impl/get_all_users_query';
import { getApp } from '../../../../../../setupTests';
import {
  anonymizeUser,
  createParent,
} from '../../../../../test/helpers/app_mock';

describe('GetAllUsersHandler', () => {
  beforeEach(async () => {
    await dbHandler.clearDatabase();
  });

  describe('when executed', () => {
    let fetchedUsers: User[];

    beforeEach(async () => {
      await createParent({ mail: 'user1@user.com' });
      await createParent({ mail: 'user2@user.com' });
      fetchedUsers = await getAllUsers();
    });

    it('returns users', async () => {
      expect(fetchedUsers.length).toBe(2);
      expect(fetchedUsers[0].mail).toBe('user1@user.com');
      expect(fetchedUsers[0].isDeleted()).toBe(false);
      expect(fetchedUsers[1].mail).toBe('user2@user.com');
      expect(fetchedUsers[1].isDeleted()).toBe(false);
    });
  });

  describe('when executed and some users are anonymized', () => {
    let fetchedUsers: User[];

    beforeEach(async () => {
      await createParent({ mail: 'user1@user.com' });

      const userToBeAnonymized = await createParent({ mail: 'user2@user.com' });

      await anonymizeUser(userToBeAnonymized.id);

      await createParent({ mail: 'user3@user.com' });
      fetchedUsers = await getAllUsers();
    });

    it('returns valid users', async () => {
      expect(fetchedUsers.length).toBe(2);
      expect(fetchedUsers[0].mail).toBe('user1@user.com');
      expect(fetchedUsers[0].isDeleted()).toBe(false);
      expect(fetchedUsers[1].mail).toBe('user3@user.com');
      expect(fetchedUsers[1].isDeleted()).toBe(false);
    });
  });

  function getAllUsers() {
    return getApp()
      .get(GetAllUsersHandler)
      .execute(new GetAllUsersQuery({}));
  }
});
