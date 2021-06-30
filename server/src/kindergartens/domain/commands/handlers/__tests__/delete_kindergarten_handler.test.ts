import { Test, TestingModule } from '@nestjs/testing';
import MockDate from 'mockdate';
import {
  addChild,
  createKindergartenWith,
  createParent,
  getKindergarten,
} from '../../../../../test/helpers/app_mock';
import { Kindergarten } from '@kindergartens/domain/models';
import * as dbHandler from '@app/db_handler';
import { KindergartenModule } from '@kindergartens/kindergarten_module';
import { DeleteKindergartenHandler } from '../delete_kindergarten_handler';
import { DeleteKindergartenCommand } from '../../impl';

describe('DeleteKindergartenHandler', () => {
  let app: TestingModule;

  afterAll(async () => {
    await app.close();
    MockDate.reset();
  });

  beforeEach(async () => {
    app = await setup();
    MockDate.set('2010-10-31');

    await dbHandler.clearDatabase();
  });

  describe('if executed', () => {
    let kindergarten: Kindergarten;

    beforeEach(async () => {
      kindergarten = await createKindergartenWith({});
    });

    it('returns anonymized kindergarten', async () => {
      expect(kindergarten.isDeleted).toBe(false);

      await anonymizeKindergarten(kindergarten.id);
      const anonymizedKindergarten = await getKindergarten(kindergarten.id);

      expect(anonymizedKindergarten).toBeNull();
    });
  });

  describe('if executed and children are available', () => {
    let kindergarten: Kindergarten;

    beforeEach(async () => {
      kindergarten = await createKindergartenWith({});
      const parent = await createParent();

      await addChild(
        {
          firstname: 'name-1',
          kindergartenId: kindergarten.id,
          birthYear: 2004,
        },
        parent.id,
      );
      await addChild(
        {
          firstname: 'name-2',
          kindergartenId: kindergarten.id,
          birthYear: 2004,
        },
        parent.id,
      );
    });

    it('throws an error', async () => {
      await expect(async () => {
        await anonymizeKindergarten(kindergarten.id);
      }).rejects.toThrow('KINDERGARTEN_NOT_EMPTY');
    });
  });

  function anonymizeKindergarten(kindergartenId: string) {
    return app.resolve(DeleteKindergartenHandler).then(handler => {
      return handler.execute(new DeleteKindergartenCommand(kindergartenId));
    });
  }

  async function setup() {
    const module = await Test.createTestingModule({
      imports: [dbHandler.rootMongooseTestModule(), KindergartenModule],
    }).compile();

    await module.init();

    return module;
  }
});
