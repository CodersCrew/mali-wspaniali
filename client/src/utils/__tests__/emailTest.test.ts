import { emailTest } from '../emailTest';

describe('emailTest', () => {
    describe('when valid email is passed', () => {
        it('returns true', () => {
            const email = 'test@test.pl';

            expect(emailTest(email)).toEqual(true);
        });
    });

    describe('when invalid email is passed', () => {
        describe('and contains empty value', () => {
            it('returns false', () => {
                const email = '';

                expect(emailTest(email)).toEqual(false);
            });
        });

        describe('and contains only domain', () => {
            it('returns false', () => {
                const email = 'test.pl';
                const email2 = '@test.pl';
                const email3 = 'test.';
                const email4 = 'test@test';
                const email5 = 'test@test.p';

                expect(emailTest(email)).toEqual(false);
                expect(emailTest(email2)).toEqual(false);
                expect(emailTest(email3)).toEqual(false);
                expect(emailTest(email4)).toEqual(false);
                expect(emailTest(email5)).toEqual(false);
            });
        });
    });
});
