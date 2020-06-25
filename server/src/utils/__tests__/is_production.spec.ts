import { isProduction } from '../is_production';

describe('isProduction', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  describe('when production state is set', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'production';
    });
    it('detects state', () => {
      expect(isProduction()).toEqual(true);
    });
  });

  describe('when development state is set', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'development';
    });
    it('detects state', () => {
      expect(isProduction()).toEqual(false);
    });
  });

  describe('when no state is set', () => {
    beforeEach(() => {
      process.env.NODE_ENV = undefined;
    });
    it('detects state', () => {
      expect(isProduction()).toEqual(false);
    });
  });
});
