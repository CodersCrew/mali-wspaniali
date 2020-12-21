import { Test, TestingModule } from '@nestjs/testing';
import * as dbHandler from '../../../../../db_handler';
import { KindergartenModule } from '../../../../kindergarten_module';
import { Kindergarten } from '../../../models/kindergarten_model';
import { CreateKindergartenHandler } from '../../../commands/handlers/create_kindergarten_handler';
import { CreateKindergartenCommand } from '../../../commands/impl/create_kindergarten_command';
import { GetKindergartensQuery } from '../../impl/get_kindergartens_query';
import { GetKindergartensHandler } from '../get_kindergartens_handler';

describe('GetKindergartensHandler', () => {
  let module: TestingModule;

  afterAll(async () => {
    await module.close();
  });

  beforeAll(async () => {
    module = await setup();
  });

  beforeEach(async () => {
    await dbHandler.clearDatabase();
  });

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
      const kindergarten2 = await createKindergarten('my-kindergarten-3', 3);

      kindergartens = await getKindergartens([
        kindergarten1.id.value,
        kindergarten2.id.value,
      ]);

      await awaitForResponse();
    });

    it('returns Kindergarten instances', async () => {
      expect(kindergartens.length).toEqual(2);
      expect(kindergartens[0]).toBeInstanceOf(Kindergarten);
      expect(kindergartens[1]).toBeInstanceOf(Kindergarten);

      expect(kindergartens[0].name.value).toEqual('my-kindergarten-1');
      expect(kindergartens[1].name.value).toEqual('my-kindergarten-3');
    });
  });

  describe('when some kindergartens does not exist', () => {
    let kindergartens: Kindergarten[];

    beforeEach(async () => {
      const kindergarten1 = await createKindergarten('my-kindergarten-1', 1);
      await createKindergarten('my-kindergarten-2', 2);
      await createKindergarten('my-kindergarten-3', 3);

      kindergartens = await getKindergartens([
        kindergarten1.id.value,
        '5f944c57ac3334f90c8baeb0',
      ]);

      await awaitForResponse();
    });

    it('returns only found kindergartens', async () => {
      expect(kindergartens.length).toEqual(1);
      expect(kindergartens[0]).toBeInstanceOf(Kindergarten);

      expect(kindergartens[0].name.value).toEqual('my-kindergarten-1');
    });
  });

  function createKindergarten(name: string, number: number) {
    return module.get(CreateKindergartenHandler).execute(
      new CreateKindergartenCommand({
        name,
        address: 'my-address',
        city: 'my-city',
        number,
      }),
    );
  }

  function getKindergartens(ids: string[]) {
    return module
      .get(GetKindergartensHandler)
      .execute(new GetKindergartensQuery(ids));
  }
});

async function setup() {
  const module = await Test.createTestingModule({
    imports: [dbHandler.rootMongooseTestModule(), KindergartenModule],
  }).compile();

  await module.init();

  return module;
}

function awaitForResponse(): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, 0));
}
