import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';

import * as dbHandler from '@app/db_handler';
import { KeyCodesModule } from '@keyCodes/key_codes_module';
import { CreateKeyCodeHandler } from '@keyCodes/domain/commands/handlers';
import { AgreementsModule } from '../../../../../agreements/agreements_module';
import { KindergartenModule } from '@kindergartens/kindergarten_module';
import { User } from '@users/domain/models';
import { UsersModule } from '@users/users_module';
import { CreateUserHandler } from '@users/domain/commands/handlers';
import {
  GetAllChildrenHandler,
  ChildWithKindergarten,
} from '@users/domain/queries/handlers/get_all_children_handler';
import waitForExpect from 'wait-for-expect';
import {
  createParent,
  anonymizeUser,
  addChild,
  createKindergartenWith,
} from '../../../../../test/helpers/app_mock';

describe('GetAllChildrenHandler', () => {
  let app: TestingModule;

  afterAll(async () => {
    await app.close();
  });

  beforeAll(async () => {
    app = await setup();
  });

  beforeEach(async () => {
    await dbHandler.clearDatabase();
  });

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
        { firstname: 'child1', kindergartenId: kindergarten.id.toString() },
        parent1.id,
      );
      await addChild(
        { firstname: 'child2', kindergartenId: kindergarten.id.toString() },
        parent1.id,
      );
      await addChild(
        { firstname: 'child3', kindergartenId: kindergarten.id.toString() },
        parent2.id,
      );
      await addChild(
        { firstname: 'child4', kindergartenId: kindergarten.id.toString() },
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
        { firstname: 'child1', kindergartenId: kindergarten.id.toString() },
        parent1.id,
      );
      await addChild(
        { firstname: 'child2', kindergartenId: kindergarten.id.toString() },
        parent1.id,
      );
      await addChild(
        { firstname: 'child3', kindergartenId: kindergarten.id.toString() },
        parent2.id,
      );
      await addChild(
        { firstname: 'child4', kindergartenId: kindergarten.id.toString() },
        parent2.id,
      );

      await anonymizeUser(parent1.id);

      children = await getAllChildren();
    });

    it('returns children with kindergartens', async () => {
      await waitForExpect(async () => {
        const children = await getAllChildren();

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
    return app.resolve(GetAllChildrenHandler).then(handler => {
      return handler.execute();
    });
  }

  async function setup() {
    const module = await Test.createTestingModule({
      imports: [
        dbHandler.rootMongooseTestModule(),
        CqrsModule,
        UsersModule,
        AgreementsModule,
        KeyCodesModule,
        KindergartenModule,
      ],
      providers: [CreateKeyCodeHandler, CreateUserHandler],
    }).compile();

    await module.init();

    return module;
  }
});
