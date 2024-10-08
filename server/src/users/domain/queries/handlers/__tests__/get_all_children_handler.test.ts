import { User } from '@app/users/domain/models';
import {
  GetAllChildrenHandler,
  ChildWithKindergarten,
} from '@app/users/domain/queries/handlers/get_all_children_handler';
import waitForExpect from 'wait-for-expect';
import { getApp } from '../../../../../../setupTests';
import {
  createParent,
  anonymizeUser,
  addChild,
  createKindergartenWith,
} from '../../../../../test/helpers/app_mock';

describe('GetAllChildrenHandler', () => {
  describe('when executed', () => {
    let parent1: User;
    let parent2: User;

    let children: ChildWithKindergarten[];

    beforeEach(async () => {
      parent1 = await createParent({ mail: 'user1@user.com' });
      parent2 = await createParent({ mail: 'user2@user.com' });

      const kindergarten = await createKindergartenWith({
        name: 'kindergarten1',
      });

      await addChild(
        { firstname: 'child1', kindergartenId: kindergarten.id },
        parent1.id,
      );
      await addChild(
        { firstname: 'child2', kindergartenId: kindergarten.id },
        parent1.id,
      );
      await addChild(
        { firstname: 'child3', kindergartenId: kindergarten.id },
        parent2.id,
      );
      await addChild(
        { firstname: 'child4', kindergartenId: kindergarten.id },
        parent2.id,
      );

      children = await getAllChildren();
    });

    it('returns children with kindergartens', async () => {
      expect(children.map(child => child.child.firstname)).toEqual([
        'child1',
        'child2',
        'child3',
        'child4',
      ]);
      expect(children.map(child => child.child.isDeleted)).toEqual([
        false,
        false,
        false,
        false,
      ]);
      expect(children.map(child => child.kindergarten.name)).toEqual([
        'kindergarten1',
        'kindergarten1',
        'kindergarten1',
        'kindergarten1',
      ]);
    });
  });

  describe('when executed and user is anonymized', () => {
    let parent1: User;
    let parent2: User;

    let children: ChildWithKindergarten[];

    beforeEach(async () => {
      parent1 = await createParent({ mail: 'user1@user.com' });
      parent2 = await createParent({ mail: 'user2@user.com' });

      const kindergarten = await createKindergartenWith({
        name: 'kindergarten1',
      });

      await addChild(
        { firstname: 'child1', kindergartenId: kindergarten.id },
        parent1.id,
      );
      await addChild(
        { firstname: 'child2', kindergartenId: kindergarten.id },
        parent1.id,
      );
      await addChild(
        { firstname: 'child3', kindergartenId: kindergarten.id },
        parent2.id,
      );
      await addChild(
        { firstname: 'child4', kindergartenId: kindergarten.id },
        parent2.id,
      );

      await anonymizeUser(parent1.id);

      children = await getAllChildren();
    });

    it('returns children with kindergartens', async () => {
      await waitForExpect(async () => {
        children = await getAllChildren();

        expect(children.map(child => child.child.firstname)).toEqual([
          'child3',
          'child4',
        ]);

        expect(children.map(child => child.kindergarten.name)).toEqual([
          'kindergarten1',
          'kindergarten1',
        ]);

        return expect(children.map(child => child.child.isDeleted)).toEqual([
          false,
          false,
        ]);
      });
    });
  });

  function getAllChildren() {
    return getApp()
      .resolve(GetAllChildrenHandler)
      .then(handler => {
        return handler.execute();
      });
  }
});
