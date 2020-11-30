import { Title } from '../title_value_object';
import { Assessment } from '../assessment_model';
import { ObjectId } from '../../../../users/domain/models/object_id_value_object';
import { SimpleDate } from '../simple_date_value_object';
import { AssessmentCreatedEvent } from '../../events/impl/assessment_created_event';

describe('Assessment model', () => {
  describe('when recreated', () => {
    let assessment: Assessment;

    beforeEach(() => {
      assessment = createAssessment();
    });

    it('does not create an event', () => {
      expect(assessment.getUncommittedEvents()).toEqual([]);
    });

    it('returns assessment with correct id', () => {
      expect(assessment.id).toBeInstanceOf(ObjectId);
      expect(assessment.id.value).toEqual('id');
    });

    it('returns assessment with correct title', () => {
      expect(assessment.title).toBeInstanceOf(Title);
      expect(assessment.title.value).toEqual('my-title');
    });

    it('returns assessment with correct start date', () => {
      expect(assessment.startDate).toBeInstanceOf(SimpleDate);
      expect(assessment.startDate.value).toEqual('2020-10-16');
    });

    it('returns assessment with correct end date', () => {
      expect(assessment.endDate).toBeInstanceOf(SimpleDate);
      expect(assessment.endDate.value).toEqual('2020-10-20');
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

      const updatedTitle = Title.create('updated-assessment');
      const updatedStartDate = SimpleDate.create('2020-10-17');
      const updatedEndDate = SimpleDate.create('2020-10-21');

      assessment.update({
        title: updatedTitle.getValue(),
        startDate: updatedStartDate.getValue(),
        endDate: updatedEndDate.getValue(),
      });
    });

    it('returns updated assessment', () => {
      expect(assessment.id.toString()).toEqual('id');
      expect(assessment.title.value).toEqual('updated-assessment');
      expect(assessment.startDate.value).toEqual('2020-10-17');
      expect(assessment.endDate.value).toEqual('2020-10-21');
    });
  });

  describe('when updated with new id', () => {
    let assessment: Assessment;

    beforeEach(() => {
      assessment = createAssessment();
    });

    it('throws an error', () => {
      const updatedId = ObjectId.create('new-id');

      expect(() =>
        assessment.update({
          _id: updatedId.getValue(),
        }),
      ).toThrowError('An id cannot be change');
    });
  });
});

function createAssessment(options?: { isNew: boolean }) {
  const _id = ObjectId.create('id');
  const title = Title.create('my-title');
  const startDate = SimpleDate.create('2020-10-16');
  const endDate = SimpleDate.create('2020-10-20');

  const create = options?.isNew ? Assessment.create : Assessment.recreate;

  const assessment = create({
    _id: _id.getValue(),
    title: title.getValue(),
    startDate: startDate.getValue(),
    endDate: endDate.getValue(),
    kindergartens: [],
  });

  return assessment;
}
