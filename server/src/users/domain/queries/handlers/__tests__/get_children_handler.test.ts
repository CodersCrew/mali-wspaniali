import waitForExpect from 'wait-for-expect';
import {
  getAllChildren,
  addChild,
  createKindergartenWith,
  createParent,
  anonymizeUser,
} from '../../../../../test/helpers/app_mock';
import { GetChildrenQuery } from '@app/users/domain/queries/impl';
import { GetChildrenHandler } from '@app/users/domain/queries/handlers';
import { Child, User } from '@app/users/domain/models';
import { getApp } from '../../../../../../setupTests';

describe('GetChildrenHandler', () => {
  describe('when executed', () => {
    let parent2: User;
    let child1: Child;
    let child3: Child;

    beforeEach(async () => {
      const parent = await createParent({ mail: 'mail-1@mail.com' });
      parent2 = await createParent({ mail: 'mail-2@mail.com' });
      const kindergarten = await createKindergartenWith();

      child1 = await addChild(
        { firstname: 'child-1', kindergartenId: kindergarten.id },
        parent.id,
      );
      await addChild(
        { firstname: 'child-2', kindergartenId: kindergarten.id },
        parent.id,
      );
      child3 = await addChild(
        { firstname: 'child-3', kindergartenId: kindergarten.id },
        parent2.id,
      );
    });

    it('returns specific children', async () => {
      await waitForExpect(async () => {
        const children = await getAllChildren();

        expect(children.length).toBe(3);

        const fetchedChildren = await getChildren([child1.id, child3.id]);

        expect(fetchedChildren.length).toBe(2);
        expect(fetchedChildren.map(child => child.firstname)).toEqual([
          'child-1',
          'child-3',
        ]);
      });
    });

    it('returns specific children without deleted', async () => {
      await anonymizeUser(parent2.id);

      await waitForExpect(async () => {
        const children = await getAllChildren();

        expect(children.length).toBe(2);
      });

      const potentiallyAnonymizedChildren = await getChildren([
        child1.id,
        child3.id,
      ]);

      expect(potentiallyAnonymizedChildren.length).toBe(1);
    });
  });

  function getChildren(ids: string[]) {
    return getApp()
      .resolve(GetChildrenHandler)
      .then(handler => {
        return handler.execute(new GetChildrenQuery(ids));
      });
  }
});
