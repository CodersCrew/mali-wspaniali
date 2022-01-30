// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import { isTranslationOf, translationOf } from './utils/testing/isTranslationOf';
import { client } from './apollo_client';
import { server } from './mocks/server';

expect.extend({
    toBeTranslationOf(translatedText: string, localizeString: string) {
        const isTranslation = isTranslationOf(localizeString, translatedText);

        if (!isTranslation) {
            return {
                pass: false,
                message: () =>
                    `Error: "${translatedText}" is not the translation of "${localizeString}" key ("${translationOf(
                        localizeString,
                    )}")`,
            };
        }

        return {
            pass: true,
            message: () => 'Success',
        };
    },
});

export {};

beforeAll(() => {
    // Enable the mocking in tests.
    const OLD_ENV = process.env;
    process.env = { ...OLD_ENV, VITE_APP_GRAPHQL_SERVER: 'http://localhost:3005/graphql' };

    server.listen();
});

beforeEach(() => {
    // Ensure Apollo cache is cleared between tests.
    // https://www.apollographql.com/docs/react/api/core/ApolloClient/#ApolloClient.clearStore
    return client.clearStore();
});

afterEach(() => {
    // Reset any runtime handlers tests may use.
    server.resetHandlers();
});

afterAll(() => {
    // Clean up once the tests are done.
    server.close();
});
