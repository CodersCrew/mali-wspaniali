import { Kindergarten } from '../../../models/kindergarten_model';
import { CreateKindergartenHandler } from '../../../commands/handlers/create_kindergarten_handler';
import { CreateKindergartenCommand } from '../../../commands/impl/create_kindergarten_command';
import { GetKindergartensQuery } from '../../impl/get_kindergartens_query';
import { GetKindergartensHandler } from '../get_kindergartens_handler';
import { getApp } from '../../../../../../setupTests';
import { awaitForResponse } from '../../../../../test/helpers/app_mock';

describe('GetKindergartensHandler', () => {
  describe('when there is no kindergartens', () => {
    let kindergartens: Kindergarten[];

    beforeEach(async () => {
      kindergartens = await getKindergartens([]);
    });

    it('returns an empty array', async () => {
      expect(kindergartens).toEqual([]);
    });
  });

  describe('when there are some kindergartens', () => {
    let kindergartens: Kindergarten[];

    beforeEach(async () => {
      const kindergarten1 = await createKindergarten('my-kindergarten-1', 1);
      await createKindergarten('my-kindergarten-2', 2);
      const kindergarten3 = await createKindergarten('my-kindergarten-3', 3);

      kindergartens = await getKindergartens([
        kindergarten1.id,
        kindergarten3.id,
      ]);

      await awaitForResponse();
    });

    it('returns Kindergarten instances', async () => {
      expect(kindergartens.length).toEqual(2);
      expect(kindergartens[0]).toBeInstanceOf(Kindergarten);
      expect(kindergartens[1]).toBeInstanceOf(Kindergarten);

      expect(kindergartens[0].name).toEqual('my-kindergarten-1');
      expect(kindergartens[1].name).toEqual('my-kindergarten-3');
    });
  });

  describe('when some kindergartens does not exist', () => {
    let kindergartens: Kindergarten[];

    beforeEach(async () => {
      const kindergarten1 = await createKindergarten('my-kindergarten-1', 1);
      await createKindergarten('my-kindergarten-2', 2);
      await createKindergarten('my-kindergarten-3', 3);

      kindergartens = await getKindergartens([
        kindergarten1.id,
        '5f944c57ac3334f90c8baeb0',
      ]);

      await awaitForResponse();
    });

    it('returns only found kindergartens', async () => {
      expect(kindergartens.length).toEqual(1);
      expect(kindergartens[0]).toBeInstanceOf(Kindergarten);

      expect(kindergartens[0].name).toEqual('my-kindergarten-1');
    });
  });

  function createKindergarten(name: string, number: number) {
    return getApp()
      .get(CreateKindergartenHandler)
      .execute(
        new CreateKindergartenCommand({
          name,
          address: 'my-address',
          city: 'my-city',
          number,
        }),
      );
  }

  function getKindergartens(ids: string[]) {
    return getApp()
      .get(GetKindergartensHandler)
      .execute(new GetKindergartensQuery(ids));
  }
});
