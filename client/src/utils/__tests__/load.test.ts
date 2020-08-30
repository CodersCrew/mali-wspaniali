import { load, getActiveLoadersCounter } from '../load';
import * as Loader from '../../components/Loader';

describe('load', () => {
    let loaderSpy: jasmine.Spy;

    beforeEach(() => {
        loaderSpy = spyOn(Loader, 'Loader').and.callThrough();
    });

    describe('when invoked', () => {
        it('attaches loader', () => {
            expect(getActiveLoadersCounter()).toEqual(0);

            load(Promise.resolve()).then(() => {
                expect(getActiveLoadersCounter()).toEqual(0);
            });

            expect(getActiveLoadersCounter()).toEqual(1);

            expect(loaderSpy).toHaveBeenCalledTimes(1);
        });
    });

    describe('when invoked rejected promise', () => {
        it('attaches loader', () => {
            expect(getActiveLoadersCounter()).toEqual(0);

            load(Promise.reject()).then(() => {
                expect(getActiveLoadersCounter()).toEqual(0);
            });

            expect(getActiveLoadersCounter()).toEqual(1);

            expect(loaderSpy).toHaveBeenCalledTimes(1);
        });
    });

    describe('when invoked multiple at once', () => {
        it('attaches one loader', () => {
            expect(getActiveLoadersCounter()).toEqual(0);

            Promise.all([
                load(Promise.resolve()),
                load(Promise.resolve()),
            ]).then(() => {
                expect(getActiveLoadersCounter()).toEqual(0);
            });

            expect(getActiveLoadersCounter()).toEqual(2);

            expect(loaderSpy).toHaveBeenCalledTimes(1);
        });
    });
});
