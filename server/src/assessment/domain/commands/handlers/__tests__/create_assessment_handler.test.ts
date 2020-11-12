import { Test, TestingModule } from '@nestjs/testing';
import * as dbHandler from '../../../../../db_handler';
import { AssessmentModule } from '../../../../assessment_module';
import { CreateAssessmentCommand } from '../../impl/create_assessment_command';
import { CreateAssessmentHandler } from '../create_assessment_handler';
import { Assessment } from '../../../models/assessment_model';
import { ObjectId } from '../../../../../users/domain/models/object_id_value_object';

let app: TestingModule;

afterAll(async () => {
  await dbHandler.closeInMongodConnection();
  await app.close();
});

beforeAll(async () => {
  await dbHandler.connect();
});

describe('CreateAssessmentHandler', () => {
  let createdAssessment: Assessment;

  const validAssessmentOptions = {
    title: 'my-title',
    startDate: '2020-10-16',
    endDate: '2020-10-20',
    kindergartenIds: ['5f88ea2c6d80f367f66a1692'],
  };

  beforeEach(async () => {
    app = await setup();

    await dbHandler.clearDatabase();
  });

  describe('when executed', () => {
    describe('with correct data', () => {
      beforeEach(async () => {
        createdAssessment = await createAssessmentWith({});
      });

      it('returns assessment instance', () => {
        expect(createdAssessment).toBeInstanceOf(Assessment);
        expect(createdAssessment.title.value).toEqual('my-title');
        expect(createdAssessment.startDate.value).toEqual('2020-10-16');
        expect(createdAssessment.endDate.value).toEqual('2020-10-20');

        expect(
          createdAssessment.kindergartens[0].kindergartenId,
        ).toBeInstanceOf(ObjectId);
        expect(
          createdAssessment.kindergartens[0].kindergartenId.toString(),
        ).toEqual('5f88ea2c6d80f367f66a1692');
      });
    });
  });

  function createAssessmentWith(options) {
    return app.resolve(CreateAssessmentHandler).then(handler => {
      return handler.execute(
        new CreateAssessmentCommand({ ...validAssessmentOptions, ...options }),
      );
    });
  }
});

async function setup() {
  const module = await Test.createTestingModule({
    imports: [dbHandler.rootMongooseTestModule(), AssessmentModule],
  }).compile();

  await module.init();

  return module;
}
