import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import waitForExpect from 'wait-for-expect';
import {
  getAllChildren,
  addChild,
  createKindergartenWith,
  createParent,
  anonymizeUser,
} from '../../../../../test/helpers/app_mock';
import * as dbHandler from '../../../../../db_handler';
import { KeyCodesModule } from '@keyCodes/key_codes_module';
import { CreateKeyCodeHandler } from '@keyCodes/domain/commands/handlers';
import { AgreementsModule } from '../../../../../agreements/agreements_module';
import { KindergartenModule } from '@kindergartens/kindergarten_module';
import { UsersModule } from '@users/users_module';
import { CreateUserHandler } from '@users/domain/commands/handlers';
import { GetChildrenQuery } from '@users/domain/queries/impl';
import { GetChildrenHandler } from '@users/domain/queries/handlers';
import { Child, User } from '@users/domain/models';

describe('GetChildrenHandler', () => {
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
    let parent2: User;
    let child1: Child;
    let child3: Child;

    beforeEach(async () => {
      const parent = await createParent({ mail: 'mail-1@mail.com' });
      parent2 = await createParent({ mail: 'mail-2@mail.com' });
      const kindergarten = await createKindergartenWith();

      child1 = await addChild(
        { firstname: 'child-1', kindergartenId: kindergarten.id.toString() },
        parent.id,
      );
      await addChild(
        { firstname: 'child-2', kindergartenId: kindergarten.id.toString() },
        parent.id,
      );
      child3 = await addChild(
        { firstname: 'child-3', kindergartenId: kindergarten.id.toString() },
        parent2.id,
      );
    });

    it('returns specific children', async () => {
      await waitForExpect(async () => {
        const children = await getAllChildren();

        expect(children.length).toBe(3);

        const fetchedChildren = await getChildren([
          child1.id.toString(),
          child3.id.toString(),
        ]);

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
        child1.id.toString(),
        child3.id.toString(),
      ]);

      expect(potentiallyAnonymizedChildren.length).toBe(1);
    });
  });

  function getChildren(ids: string[]) {
    return app.resolve(GetChildrenHandler).then(handler => {
      return handler.execute(new GetChildrenQuery(ids));
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
