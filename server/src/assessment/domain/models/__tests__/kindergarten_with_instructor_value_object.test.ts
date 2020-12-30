import { Result } from '../../../../shared/domain/result';
import { Title } from '../title_value_object';
import { KindergartenWithInstructor } from '../kindergarten_with_instructor_value_object';
import { ObjectId } from '../../../../users/domain/models/object_id_value_object';

describe('Title', () => {
  describe('when created', () => {
    it('returns Result instance', () => {
      const kindergartenId = ObjectId.create();

      expect(
        KindergartenWithInstructor.create({
          kindergartenId: kindergartenId.getValue(),
          instructorId: null,
        }),
      ).toBeInstanceOf(Result);
    });
  });

  describe('when created with', () => {
    describe('defined kindergartenId and undefined instructorId', () => {
      it('returns Result instance', () => {
        const kindergartenId = ObjectId.create();
        const kindergartenWithInstructorResult = KindergartenWithInstructor.create(
          {
            kindergartenId: kindergartenId.getValue(),
            instructorId: null,
          },
        );

        expect(kindergartenWithInstructorResult.isSuccess).toEqual(true);
        expect(
          kindergartenWithInstructorResult.getValue().value.kindergartenId,
        ).toBeInstanceOf(ObjectId);
        expect(
          kindergartenWithInstructorResult.getValue().value.instructorId,
        ).toEqual(null);
      });
    });

    describe('defined kindergartenId and defined instructorId', () => {
      it('returns Result instance', () => {
        const objectId = ObjectId.create();
        const kindergartenWithInstructorResult = KindergartenWithInstructor.create(
          {
            kindergartenId: objectId.getValue(),
            instructorId: objectId.getValue(),
          },
        );

        expect(kindergartenWithInstructorResult.isSuccess).toEqual(true);
        expect(
          kindergartenWithInstructorResult.getValue().value.kindergartenId,
        ).toBeInstanceOf(ObjectId);
        expect(
          kindergartenWithInstructorResult.getValue().value.instructorId,
        ).toBeInstanceOf(ObjectId);
      });
    });

    describe('undefined kindergartenId', () => {
      it('returns Result instance', () => {
        const kindergartenWithInstructorResult = KindergartenWithInstructor.create(
          {
            kindergartenId: null,
            instructorId: null,
          },
        );

        expect(kindergartenWithInstructorResult.isSuccess).toEqual(false);
        expect(kindergartenWithInstructorResult.error).toEqual(
          'kindergartenId is null or undefined',
        );
      });
    });
  });
});
