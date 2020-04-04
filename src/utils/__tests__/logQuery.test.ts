import { logQuery, DocumentSnapshot, QuerySnapshot } from '../logQuery';

describe('logQuery', () => {
    let logSpy: jasmine.Spy;

    beforeEach(() => {
        logSpy = spyOn(console, 'log');
    });

    describe('when invoked with DocumentSnapsot', () => {
        describe('with path', () => {
            beforeEach(() => {
                logQuery(createDocumentSnapshot({ cache: false }));
            });

            it('invokes message with path result', () => {
                expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Path: my-db-path'), expect.anything());
            });
        });

        describe('with cached document', () => {
            beforeEach(() => {
                logQuery(createDocumentSnapshot({ cache: true }));
            });

            it('invokes message with caching result', () => {
                expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Source: cache'), expect.anything());
            });
        });

        describe('without cached document', () => {
            beforeEach(() => {
                logQuery(createDocumentSnapshot({ cache: false }));
            });

            it('invokes message with caching result', () => {
                expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Source: server'), expect.anything());
            });
        });

        describe('with document', () => {
            beforeEach(() => {
                logQuery(createDocumentSnapshot({ exists: true }));
            });

            it('invokes message with count result', () => {
                expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Count: 1'), expect.anything());
            });
        });

        describe('without document', () => {
            beforeEach(() => {
                logQuery(createDocumentSnapshot({ exists: false }));
            });

            it('invokes message with count result', () => {
                expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Count: 0'), expect.anything());
            });
        });
    });

    describe('when invoked with QuerySnapshot', () => {
        describe('with path', () => {
            beforeEach(() => {
                logQuery(createQuerySnapshot());
            });

            it('invokes message with path result', () => {
                expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Path: my/db/path'), expect.anything());
            });
        });

        describe('with cached documents', () => {
            beforeEach(() => {
                logQuery(createQuerySnapshot({ cache: true }));
            });

            it('invokes message with caching result', () => {
                expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Source: cache'), expect.anything());
            });
        });

        describe('without cached documents', () => {
            beforeEach(() => {
                logQuery(createQuerySnapshot({ cache: false }));
            });

            it('invokes message with caching result', () => {
                expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Source: server'), expect.anything());
            });
        });

        describe('with documents', () => {
            beforeEach(() => {
                logQuery(createQuerySnapshot());
            });

            it('invokes message with count result', () => {
                expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Count: 5'), expect.anything());
            });
        });
    });

    describe('when invoked in production env', () => {
        beforeEach(() => {
            global.process = {
                ...global.process,
                env: {
                    NODE_ENV: 'production',
                },
            };

            logQuery(createDocumentSnapshot({ cache: false }));
        });

        it("doesn't invoke logger", () => {
            expect(logSpy).toHaveBeenCalledTimes(0);
        });
    });
});

function createDocumentSnapshot({ cache, exists }: { cache?: boolean; exists?: boolean }) {
    return {
        ref: {
            path: 'my-db-path',
        },
        metadata: {
            fromCache: cache,
        },
        exists,
    } as DocumentSnapshot;
}

function createQuerySnapshot({ cache }: { cache?: boolean } = {}) {
    return ({
        metadata: {
            fromCache: cache,
        },
        size: 5,
        query: {
            _query: {
                path: {
                    segments: ['my', 'db', 'path'],
                },
            },
        },
    } as unknown) as QuerySnapshot;
}
