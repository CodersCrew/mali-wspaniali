import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import MockDate from 'mockdate';

import * as dbHandler from '@app/db_handler';
import { KeyCodesModule } from '../../../../../key_codes/key_codes_module';
import { UsersModule } from '../../../../users_module';
import { CreateKeyCodeHandler } from '../../../../../key_codes/domain/commands/handlers/create_key_code_handler';
import { User } from '../../../models/user_model';
import { AgreementsModule } from '../../../../../agreements/agreements_module';
import { KindergartenModule } from '../../../../../kindergartens/kindergarten_module';
import { CreateUserHandler } from '../../../commands/handlers/create_user_handler';
import waitForExpect from 'wait-for-expect';
import { GetChildrenFromKindergartenHandler } from '../get_children_from_kindergarten_handler';
import {
  createParent,
  anonymizeUser,
  addChild,
  createKindergartenWith,
} from '../../../../../test/helpers/app_mock';
import { GetChildrenFromKindergartenQuery } from '../../impl';
import { Child, ChildProps } from '../../../models/child_model';
import { Kindergarten } from '../../../../../kindergartens/domain/models/kindergarten_model';

describe('GetChildrenFromKindergartenHandler', () => {
  let app: TestingModule;

  afterAll(async () => {
    await app.close();
    MockDate.reset();
  });

  beforeAll(async () => {
    app = await setup();
    MockDate.set('2010-10-31');
  });

  beforeEach(async () => {
    await dbHandler.clearDatabase();
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
          kindergartenId: kindergarten1.id.toString(),
          birthYear: 2004,
        },
        parent1.id,
      );
      await addChild(
        {
          firstname: 'child2',
          kindergartenId: kindergarten1.id.toString(),
          birthYear: 2004,
        },
        parent1.id,
      );
      await addChild(
        {
          firstname: 'child3',
          kindergartenId: kindergarten2.id.toString(),
          birthYear: 2005,
        },
        parent2.id,
      );
      await addChild(
        {
          firstname: 'child4',
          kindergartenId: kindergarten2.id.toString(),
          birthYear: 2005,
        },
        parent2.id,
      );
    });

    it('returns children from kindergartens', async () => {
      childrenFromKindergarten1 = await getChildrenFromKindergarten(
        kindergarten1.id.toString(),
      );
      childrenFromKindergarten2 = await getChildrenFromKindergarten(
        kindergarten2.id.toString(),
      );

      expect(
        childrenFromKindergarten1.map(child => child.firstname.value),
      ).toEqual(['child1', 'child2']);

      expect(
        childrenFromKindergarten2.map(child => child.firstname.value),
      ).toEqual(['child3', 'child4']);
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
          kindergartenId: kindergarten2.id.toString(),
          birthYear: 2000,
        },
        parent2.id,
      );

      await addChild(
        {
          firstname: 'child6',
          kindergartenId: kindergarten2.id.toString(),
          birthYear: 2001,
        },
        parent2.id,
      );

      childrenFromKindergarten2 = await getChildrenFromKindergarten(
        kindergarten2.id.toString(),
      );

      expect(
        childrenFromKindergarten2.map(child => child.firstname.value),
      ).toEqual(['child3', 'child4']);
    });

    it('returns not deleted children', async () => {
      await anonymizeUser(parent2.id);

      await waitForExpect(async () => {
        const children = await getChildrenFromKindergarten(
          kindergarten2.id.toString(),
        );

        expect(children.length).toBe(0);
      });
    });
  });

  function getChildrenFromKindergarten(id: string) {
    return app.resolve(GetChildrenFromKindergartenHandler).then(handler => {
      return handler.execute(new GetChildrenFromKindergartenQuery(id));
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
