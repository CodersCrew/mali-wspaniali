import { ApolloClient, ApolloLink, concat, InMemoryCache, HttpLink, makeVar } from '@apollo/client';

const link = new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_SERVER,
    credentials: 'include',
});

const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext({
        headers: {
            authorization: localStorage.getItem('token') || null,
        },
    });

    return forward(operation);
});

export const activePage = makeVar<string[]>([]);

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                activePage: {
                    read() {
                        return activePage();
                    },
                },
            },
        },
    },
});

export const client = new ApolloClient({
    cache,
    link: concat(authMiddleware, link),
});
