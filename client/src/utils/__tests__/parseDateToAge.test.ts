import { getQuarter, parseDateToAge, parseToDetailedAge } from '../parseDateToAge';

describe('ParseDateToAge', () => {
    describe('#parseDateToAge', () => {
        it('parses a date', () => {
            expect(parseDateToAge(2010, 0, new Date(2015, 1, 1))).toBe(5);
            expect(parseDateToAge(2010, 0, new Date(2015, 5, 1))).toBe(5);
        });
    });

    describe('#parseToDetailedAge', () => {
        it('parses a date', () => {
            expect(parseToDetailedAge(2010, 0, new Date(2015, 1, 1))).toEqual([5, 0]);
            expect(parseToDetailedAge(2010, 0, new Date(2015, 5, 1))).toEqual([5, 1]);
        });
    });

    describe('#getQuarter', () => {
        it("returns date's quarter", () => {
            expect(getQuarter(new Date(2015, 1, 1))).toBe(0);
            expect(getQuarter(new Date(2015, 5, 1))).toBe(1);
        });
    });
});
