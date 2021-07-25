import { Assessment } from '../assessment_model';
import { AssessmentCreatedEvent } from '../../events/impl/assessment_created_event';
import { AssessmentMapper } from '../../mappers/assessment_mapper';

describe('Assessment model', () => {
  describe('when recreated', () => {
    let assessment: Assessment;

    beforeEach(() => {
      assessment = createAssessment();
    });

    it('does not create an event', () => {
      expect(assessment.getUncommittedEvents()).toEqual([]);
    });

    it('returns assessment', () => {
      expect(typeof assessment.id).toBe('string');
      expect(assessment.title).toEqual('my-title');
      expect(assessment.firstMeasurementStartDate).toEqual(
        new Date('2020-10-16'),
      );
      expect(assessment.firstMeasurementEndDate).toEqual(
        new Date('2020-10-20'),
      );
      expect(assessment.lastMeasurementStartDate).toEqual(
        new Date('2020-10-16'),
      );
      expect(assessment.lastMeasurementEndDate).toEqual(new Date('2020-10-20'));
    });

    describe('with start date greater than end date', () => {
      it('throws an error', () => {
        expect(() =>
          createAssessment({
            startDate: new Date('2020-10-20'),
            endDate: new Date('2020-10-15'),
          }),
        ).toThrowError('The start date cannot be greater than the end date');
      });
    });
  });

  describe('when created', () => {
    let assessment: Assessment;

    beforeEach(() => {
      assessment = createAssessment({ isNew: true });
    });

    it('does create an event', () => {
      expect(assessment.getUncommittedEvents().length).toEqual(1);
      expect(assessment.getUncommittedEvents()[0]).toBeInstanceOf(
        AssessmentCreatedEvent,
      );
    });
  });

  describe('when updated', () => {
    let assessment: Assessment;

    beforeEach(() => {
      assessment = createAssessment();

      const updatedTitle = 'updated-assessment';

      assessment.update({
        title: updatedTitle,
      });
    });

    it('returns updated assessment', () => {
      expect(typeof assessment.id).toBe('string');
      expect(assessment.title).toBe('updated-assessment');
    });
  });

  describe('when updated with new id', () => {
    let assessment: Assessment;

    beforeEach(() => {
      assessment = createAssessment();
    });

    it('throws an error', () => {
      expect(() =>
        assessment.update({
          _id: 'new-id',
        }),
      ).toThrowError('An id cannot be change');
    });
  });
});

function createAssessment(
  options: {
    isNew?: boolean;
    startDate?: Date;
    endDate?: Date;
  } = {},
) {
  const assessment = AssessmentMapper.toDomain(
    {
      title: 'my-title',
      isOutdated: false,
      isDeleted: false,
      firstMeasurementStartDate: options?.startDate || new Date('2020-10-16'),
      firstMeasurementEndDate: options?.endDate || new Date('2020-10-20'),
      lastMeasurementStartDate: options?.startDate || new Date('2020-10-16'),
      lastMeasurementEndDate: options?.endDate || new Date('2020-10-20'),
      firstMeasurementStatus: 'active',
      lastMeasurementStatus: 'active',
      kindergartens: [],
    },
    { isNew: options.isNew },
  );

  return assessment;
}
