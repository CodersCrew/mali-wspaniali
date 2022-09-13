import MockDate from 'mockdate';

import { parseDateToAge } from '../parse_date_to_age';

describe('ParseDateToAge', () => {
  afterAll(async () => {
    MockDate.reset();
  });

  beforeEach(async () => {
    MockDate.set('2010-10-31');
  });

  it('parses a date based on the current date', () => {
    expect(parseDateToAge(2005, 3)).toBe(5);
    expect(parseDateToAge(2004, 3)).toBe(6);
  });

  it('parses a date based on compared date', () => {
    expect(parseDateToAge(2005, 3, new Date(2010, 10, 31))).toBe(5);
    expect(parseDateToAge(2004, 3, new Date(2010, 10, 31))).toBe(6);

    expect(parseDateToAge(2005, 3, new Date(2011, 10, 31))).toBe(6);
    expect(parseDateToAge(2004, 3, new Date(2011, 10, 31))).toBe(7);
  });
});
