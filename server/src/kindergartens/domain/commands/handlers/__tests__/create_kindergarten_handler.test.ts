import { Test, TestingModule } from '@nestjs/testing';
import { CreateKindergartenCommand } from '../../impl';
import { CreateKindergartenHandler } from '../create_kindergarten_handler';
import { KindergartenModule } from '../../../../kindergarten_module';
import * as dbHandler from '../../../../../db_handler';
import { Kindergarten } from '../../../models/kindergarten_model';
import { ObjectId } from '../../../../../users/domain/models/object_id_value_object';
import { KindergartenTitle } from '../../../models/kindergarten_title_value_object';
import { IsDeleted } from '../../../models/is_deleted_value_object';

afterAll(async () => {
  await dbHandler.closeInMongodConnection();
});

beforeAll(async () => {
  await dbHandler.connect();
});

describe('CreatKindergartenHandler', () => {
  let module: TestingModule;

  const validKindergartenOptions = {
    number: 1,
    name: 'my-name',
    address: 'my-address',
    city: 'my-city',
  };

  let createdKindergarten: Kindergarten;

  beforeEach(async () => {
    await dbHandler.clearDatabase();

    module = await setup();
  });

  describe('when executed with correct data', () => {
    beforeEach(async () => {
      createdKindergarten = await createKindergartenWith(
        validKindergartenOptions,
      );
    });

    it('returns Kindergarten instance', () => {
      expect(createdKindergarten).toBeInstanceOf(Kindergarten);
      expect(createdKindergarten.id).toBeInstanceOf(ObjectId);
      expect(createdKindergarten.name).toBeInstanceOf(KindergartenTitle);
      expect(createdKindergarten.name.value).toEqual('my-name');
      expect(createdKindergarten.number).toEqual(1);
      expect(createdKindergarten.address).toEqual('my-address');
      expect(createdKindergarten.city).toEqual('my-city');
      expect(createdKindergarten.isDeleted).toBeInstanceOf(IsDeleted);
      expect(createdKindergarten.isDeleted.value).toEqual(false);
    });
  });

  describe('when executed with incorrect', () => {
    describe('name', () => {
      it('throws an error', async () => {
        await expect(
          createKindergartenWith({ name: 'my' }),
        ).rejects.toThrowError('KindergartenTitle must be valid');
      });
    });
  });

  describe('when the kindergarten with the same data already exists', () => {
    it.todo('throws an error');
  });

  function createKindergartenWith(options) {
    return module.get(CreateKindergartenHandler).execute(
      new CreateKindergartenCommand({
        ...validKindergartenOptions,
        ...options,
      }),
    );
  }
});

async function setup() {
  return await Test.createTestingModule({
    imports: [dbHandler.rootMongooseTestModule(), KindergartenModule],
  }).compile();
}
