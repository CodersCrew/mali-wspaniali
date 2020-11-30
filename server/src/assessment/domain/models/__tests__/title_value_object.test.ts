import { Result } from '../../../../shared/domain/result';
import { Title } from '../title_value_object';

describe('Title', () => {
  describe('when created', () => {
    it('returns Result instance', () => {
      expect(Title.create('')).toBeInstanceOf(Result);
    });
  });

  describe('when created with valid date', () => {
    it('returns Result instance', () => {
      const titleResult = Title.create('my-assessment-title');

      expect(titleResult.isSuccess).toEqual(true);
      expect(titleResult.getValue().value).toEqual('my-assessment-title');
    });
  });

  describe('when created with', () => {
    describe('too short title', () => {
      it('return invalid result', () => {
        const titleResult = Title.create('Test');

        expect(titleResult.isSuccess).toEqual(false);
        expect(titleResult.error).toEqual('Title must be valid');
      });
    });

    describe('too long title', () => {
      it('return invalid result', () => {
        const titleResult = Title.create(new Array(142).fill('').join());

        expect(titleResult.isSuccess).toEqual(false);
        expect(titleResult.error).toEqual('Title must be valid');
      });
    });
  });
});
