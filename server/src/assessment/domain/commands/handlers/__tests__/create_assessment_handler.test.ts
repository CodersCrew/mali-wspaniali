import { CreateAssessmentCommand } from '../../impl/create_assessment_command';
import { CreateAssessmentHandler } from '../create_assessment_handler';
import { Assessment } from '../../../models/assessment_model';
import { getApp } from '../../../../../../setupTests';

describe('CreateAssessmentHandler', () => {
  let createdAssessment: Assessment;

  const validAssessmentOptions = {
    title: 'my-title',
    firstMeasurementStatus: 'active',
    lastMeasurementStatus: 'active',
    firstMeasurementStartDate: new Date(2020, 10, 16),
    firstMeasurementEndDate: new Date(2020, 10, 20),
    lastMeasurementStartDate: new Date(2020, 10, 16),
    lastMeasurementEndDate: new Date(2020, 10, 20),
    kindergartenIds: ['5f88ea2c6d80f367f66a1692'],
  };

  describe('when executed', () => {
    describe('with correct data', () => {
      beforeEach(async () => {
        createdAssessment = await createAssessmentWith();

        await awaitForResponse();
      });

      it('returns assessment instance', () => {
        expect(createdAssessment).toBeInstanceOf(Assessment);
        expect(createdAssessment.title).toBe('my-title');
        expect(createdAssessment.firstMeasurementStatus).toEqual('active');
        expect(createdAssessment.lastMeasurementStatus).toEqual('active');
        expect(createdAssessment.firstMeasurementStartDate).toEqual(
          new Date(2020, 10, 16),
        );
        expect(createdAssessment.firstMeasurementEndDate).toEqual(
          new Date(2020, 10, 20),
        );
        expect(createdAssessment.lastMeasurementStartDate).toEqual(
          new Date(2020, 10, 16),
        );
        expect(createdAssessment.lastMeasurementEndDate).toEqual(
          new Date(2020, 10, 20),
        );
        expect(createdAssessment.kindergartens[0].kindergartenId).toEqual(
          '5f88ea2c6d80f367f66a1692',
        );
      });
    });
  });

  function createAssessmentWith() {
    return getApp()
      .resolve(CreateAssessmentHandler)
      .then(handler => {
        return handler.execute(
          new CreateAssessmentCommand(validAssessmentOptions),
        );
      });
  }
});

function awaitForResponse(): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, 0));
}
