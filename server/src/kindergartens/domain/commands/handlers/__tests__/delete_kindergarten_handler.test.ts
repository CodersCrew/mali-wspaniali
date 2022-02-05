import MockDate from 'mockdate';
import {
  addChild,
  createKindergartenWith,
  createParent,
  getKindergarten,
} from '../../../../../test/helpers/app_mock';
import { Kindergarten } from '@kindergartens/domain/models';
import { DeleteKindergartenHandler } from '../delete_kindergarten_handler';
import { DeleteKindergartenCommand } from '../../impl';
import { getApp } from '../../../../../../setupTests';

describe('DeleteKindergartenHandler', () => {
  afterAll(async () => {
    MockDate.reset();
  });

  beforeEach(async () => {
    MockDate.set('2010-10-31');
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
    return getApp()
      .resolve(DeleteKindergartenHandler)
      .then(handler => {
        return handler.execute(new DeleteKindergartenCommand(kindergartenId));
      });
  }
});
