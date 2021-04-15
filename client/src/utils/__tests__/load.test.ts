import { load, getActiveLoadersCounter } from '../load';

describe('load', () => {
    describe('when invoked', () => {
        it('attaches loader', () => {
            expect(getActiveLoadersCounter()).toEqual(0);

            load(Promise.resolve()).then(() => {
                expect(getActiveLoadersCounter()).toEqual(0);
            });

            expect(getActiveLoadersCounter()).toEqual(1);
        });
    });

    describe('when invoked rejected promise', () => {
        it('attaches loader', () => {
            expect(getActiveLoadersCounter()).toEqual(0);

            load(Promise.reject()).then(() => {
                expect(getActiveLoadersCounter()).toEqual(0);
            });

            expect(getActiveLoadersCounter()).toEqual(1);
        });
    });

    describe('when invoked multiple at once', () => {
        it('attaches one loader', () => {
            expect(getActiveLoadersCounter()).toEqual(0);

            Promise.all([load(Promise.resolve()), load(Promise.resolve())]).then(() => {
                expect(getActiveLoadersCounter()).toEqual(0);
            });

            expect(getActiveLoadersCounter()).toEqual(2);
        });
    });
});
