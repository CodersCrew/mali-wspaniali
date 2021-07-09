import { ChildAssessmentResult } from '../../users/domain/models/child_assessment_result_model';

export function countResults(
  results: ChildAssessmentResult[],
  measurement: string,
) {
  let measurements = 0;

  results.forEach(result => {
    const props = result.getProps();

    if (measurement === 'first') {
      if (props.firstMeasurementJumpDate) ++measurements;
      if (props.firstMeasurementRunDate) ++measurements;
      if (props.firstMeasurementPendelumRunDate) ++measurements;
      if (props.firstMeasurementThrowDate) ++measurements;
    } else {
      if (props.lastMeasurementJumpDate) ++measurements;
      if (props.lastMeasurementRunDate) ++measurements;
      if (props.lastMeasurementPendelumRunDate) ++measurements;
      if (props.lastMeasurementThrowDate) ++measurements;
    }
  });

  return measurements;
}
