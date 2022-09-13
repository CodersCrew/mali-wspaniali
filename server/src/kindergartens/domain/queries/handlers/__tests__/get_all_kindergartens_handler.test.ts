import { GetAllKindergartensHandler } from '../get_all_kindergartens_handler';
import { Kindergarten } from '../../../models/kindergarten_model';
import { CreateKindergartenHandler } from '../../../commands/handlers/create_kindergarten_handler';
import { CreateKindergartenCommand } from '../../../commands/impl/create_kindergarten_command';
import { getApp } from '../../../../../../setupTests';
import { awaitForResponse } from '../../../../../test/helpers/app_mock';

describe('GetAllKindergartensHandler', () => {
  describe('when there is no kindergartens', () => {
    let kindergartens: Kindergarten[];

    beforeEach(async () => {
      kindergartens = await getAllKindergartens();
    });

    it('returns an empty array', async () => {
      expect(kindergartens).toEqual([]);
    });
  });

  describe('when there are some kindergartens', () => {
    let kindergartens: Kindergarten[];

    beforeEach(async () => {
      await createKindergarten('my-kindergarten-1', 1);
      await createKindergarten('my-kindergarten-2', 2);
      await createKindergarten('my-kindergarten-3', 3);
      await createKindergarten('my-kindergarten-4', 4);

      kindergartens = await getAllKindergartens();

      await awaitForResponse();
    });

    it('returns Kindergarten instances', async () => {
      expect(kindergartens.length).toEqual(4);
      expect(kindergartens[0]).toBeInstanceOf(Kindergarten);
      expect(kindergartens[1]).toBeInstanceOf(Kindergarten);
      expect(kindergartens[2]).toBeInstanceOf(Kindergarten);
      expect(kindergartens[3]).toBeInstanceOf(Kindergarten);

      expect(kindergartens[0].name).toEqual('my-kindergarten-1');
      expect(kindergartens[1].name).toEqual('my-kindergarten-2');
      expect(kindergartens[2].name).toEqual('my-kindergarten-3');
      expect(kindergartens[3].name).toEqual('my-kindergarten-4');
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

  function getAllKindergartens() {
    return getApp()
      .get(GetAllKindergartensHandler)
      .execute();
  }
});
