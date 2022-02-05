import * as dbHandler from '@app/db_handler';

import { Assessment } from '../../../models/assessment_model';
import { createAssessment, getAssessment } from '@app/test/helpers/app_mock';
import { UpdateAssessmentHandler } from '../update_assessment_handler';
import { UpdateAssessmentCommand } from '../../impl';
import { UpdatedAssessmentInput } from '../../../../inputs/assessment_input';
import { getApp } from '../../../../../../setupTests';

describe('CreateAssessmentHandler', () => {
  let assessment: Assessment;

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

  beforeEach(async () => {
    await dbHandler.clearDatabase();

    assessment = await createAssessment(validAssessmentOptions);
  });

  it('updated assessment', async () => {
    expect(assessment.title).toBe('my-title');
    expect(assessment.groups).toEqual([]);

    await updateAssessmentWith(assessment.id, { title: 'my-new-title' });

    expect((await getAssessment(assessment.id)).title).toBe('my-new-title');

    await updateAssessmentWith(assessment.id, {
      groups: [{ kindergartenId: 'some-kindergarten', group: 'my-name' }],
    });

    expect((await getAssessment(assessment.id)).groups).toEqual([
      { kindergartenId: 'some-kindergarten', group: 'my-name' },
    ]);
  });

  function updateAssessmentWith(
    id: string,
    assessment: UpdatedAssessmentInput,
  ) {
    return getApp()
      .resolve(UpdateAssessmentHandler)
      .then(handler => {
        return handler.execute(new UpdateAssessmentCommand(id, assessment));
      });
  }
});
