import MockDate from 'mockdate';
import waitForExpect from 'wait-for-expect';

import { User } from '../../../models/user_model';
import { GetChildrenFromKindergartenHandler } from '../get_children_from_kindergarten_handler';
import {
  createParent,
  anonymizeUser,
  addChild,
  createKindergartenWith,
} from '../../../../../test/helpers/app_mock';
import { GetChildrenFromKindergartenQuery } from '../../impl';
import { Child } from '../../../models/child_model';
import { Kindergarten } from '../../../../../kindergartens/domain/models/kindergarten_model';
import { getApp } from '../../../../../../setupTests';

describe('GetChildrenFromKindergartenHandler', () => {
  afterAll(async () => {
    MockDate.reset();
  });

  beforeAll(async () => {
    MockDate.set('2010-10-31');
  });

  describe('when executed', () => {
    let parent1: User;
    let parent2: User;

    let childrenFromKindergarten1: Child[];
    let childrenFromKindergarten2: Child[];

    let kindergarten1: Kindergarten;
    let kindergarten2: Kindergarten;

    beforeEach(async () => {
      parent1 = await createParent({ mail: 'user1@user.com' });
      parent2 = await createParent({ mail: 'user2@user.com' });

      kindergarten1 = await createKindergartenWith({
        name: 'kindergarten1',
      });

      kindergarten2 = await createKindergartenWith({
        name: 'kindergarten2',
      });

      await addChild(
        {
          firstname: 'child1',
          kindergartenId: kindergarten1.id,
          birthYear: 2004,
        },
        parent1.id,
      );
      await addChild(
        {
          firstname: 'child2',
          kindergartenId: kindergarten1.id,
          birthYear: 2004,
        },
        parent1.id,
      );
      await addChild(
        {
          firstname: 'child3',
          kindergartenId: kindergarten2.id,
          birthYear: 2005,
        },
        parent2.id,
      );
      await addChild(
        {
          firstname: 'child4',
          kindergartenId: kindergarten2.id,
          birthYear: 2005,
        },
        parent2.id,
      );
    });

    it('returns children from kindergartens', async () => {
      childrenFromKindergarten1 = await getChildrenFromKindergarten(
        kindergarten1.id,
      );
      childrenFromKindergarten2 = await getChildrenFromKindergarten(
        kindergarten2.id,
      );

      expect(childrenFromKindergarten1.map(child => child.firstname)).toEqual([
        'child1',
        'child2',
      ]);

      expect(childrenFromKindergarten2.map(child => child.firstname)).toEqual([
        'child3',
        'child4',
      ]);
      expect(childrenFromKindergarten2.map(child => child.isDeleted)).toEqual([
        false,
        false,
      ]);
      expect(
        childrenFromKindergarten1.map(child => child.kindergarten),
      ).toEqual([kindergarten1.id, kindergarten1.id]);
      expect(
        childrenFromKindergarten2.map(child => child.kindergarten),
      ).toEqual([kindergarten2.id, kindergarten2.id]);
    });

    it('returns children with a valid age', async () => {
      await addChild(
        {
          firstname: 'child5',
          kindergartenId: kindergarten2.id,
          birthYear: 2000,
        },
        parent2.id,
      );

      await addChild(
        {
          firstname: 'child6',
          kindergartenId: kindergarten2.id,
          birthYear: 2001,
        },
        parent2.id,
      );

      childrenFromKindergarten2 = await getChildrenFromKindergarten(
        kindergarten2.id,
      );

      expect(childrenFromKindergarten2.map(child => child.firstname)).toEqual([
        'child3',
        'child4',
      ]);
    });

    it('returns not deleted children', async () => {
      await anonymizeUser(parent2.id);

      await waitForExpect(async () => {
        const children = await getChildrenFromKindergarten(kindergarten2.id);

        expect(children.length).toBe(0);
      });
    });
  });

  function getChildrenFromKindergarten(id: string) {
    return getApp()
      .resolve(GetChildrenFromKindergartenHandler)
      .then(handler => {
        return handler.execute(new GetChildrenFromKindergartenQuery(id));
      });
  }
});
