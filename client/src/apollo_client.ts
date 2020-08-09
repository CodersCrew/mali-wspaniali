import { ApolloClient, ApolloLink, concat, InMemoryCache, HttpLink } from '@apollo/client';

const link = new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_SERVER,
    credentials: 'include',
});
export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: concat(authMiddleware, link),
});
