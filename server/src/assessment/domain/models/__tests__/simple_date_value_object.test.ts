import { SimpleDate } from '../simple_date_value_object';
import { Result } from '../../../../shared/domain/result';

describe('SimpleDate', () => {
  describe('when created', () => {
    it('returns Result instance', () => {
      expect(SimpleDate.create('')).toBeInstanceOf(Result);
    });
  });

  describe('when created with valid date', () => {
    it('returns Result instance', () => {
      const resultDate = SimpleDate.create('2020-10-16');

      expect(resultDate.isSuccess).toEqual(true);
      expect(resultDate.getValue().value).toEqual('2020-10-16');
    });
  });

  describe('when created with invalid date', () => {
    it('returns invalid result', () => {
      const resultDate = SimpleDate.create('abc');

      expect(resultDate.isSuccess).toEqual(false);
      expect(resultDate.error).toEqual('SimpleDate must be valid');
    });
  });
});
