import { isValidEmail } from '../isValidEmail';

describe('isValidEmail', () => {
    describe('when valid email is passed', () => {
        it('returns true', () => {
            const email = 'test@test.pl';

            expect(isValidEmail(email)).toEqual(true);
        });
    });

    describe('when invalid email is passed', () => {
        describe('and contains empty value', () => {
            it('returns false', () => {
                const email = '';

                expect(isValidEmail(email)).toEqual(false);
            });
        });

        describe('and contains only domain', () => {
            it('returns false', () => {
                const email = 'test.pl';
                const email2 = '@test.pl';
                const email3 = 'test.';
                const email4 = 'test@test';

                expect(isValidEmail(email)).toEqual(false);
                expect(isValidEmail(email2)).toEqual(false);
                expect(isValidEmail(email3)).toEqual(false);
                expect(isValidEmail(email4)).toEqual(false);
            });
        });
    });
});
