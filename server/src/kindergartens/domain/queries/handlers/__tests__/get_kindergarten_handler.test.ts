import { Test, TestingModule } from '@nestjs/testing';
import * as dbHandler from '../../../../../db_handler';
import { KindergartenModule } from '../../../../kindergarten_module';
import { Kindergarten } from '../../../models/kindergarten_model';
import { CreateKindergartenHandler } from '../../../commands/handlers/create_kindergarten_handler';
import { CreateKindergartenCommand } from '../../../commands/impl/create_kindergarten_command';
import { GetKindergartenHandler } from '../get_kindergarten_handler';
import { GetKindergartenQuery } from '../../impl';

describe('GetKindergartenHandler', () => {
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
    let kindergarten: Kindergarten | null;

    beforeEach(async () => {
      kindergarten = await getKindergarten('5f944c57ac3334f90c8baeb0');
    });

    it('returns null', async () => {
      expect(kindergarten).toEqual(null);
    });
  });

  describe('when there is kindergarten', () => {
    let createdKindergarten: Kindergarten | null;
    let foundKindergarten: Kindergarten | null;

    beforeEach(async () => {
      createdKindergarten = await createKindergarten('my-kindergarten-1', 1);

      foundKindergarten = await getKindergarten(createdKindergarten.id.value);

      await awaitForResponse();
    });

    it('returns Kindergarten instances', async () => {
      expect(foundKindergarten).toBeInstanceOf(Kindergarten);

      expect(foundKindergarten.name.value).toEqual('my-kindergarten-1');
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

  function getKindergarten(id: string) {
    return module
      .get(GetKindergartenHandler)
      .execute(new GetKindergartenQuery(id));
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
