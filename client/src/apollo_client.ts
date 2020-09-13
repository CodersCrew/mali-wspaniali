import { ApolloClient, ApolloLink, concat, InMemoryCache, HttpLink, makeVar } from '@apollo/client';
import { AgreementTypeFilter, AgreementTypeFilters } from './models/AgreementTypeFilters';
import { AgreementStatusFilters, AgreementStatusFilter } from './models/AgreementStatusFilter';
import { AgreementKindergartenFilter, AgreementKindergartenFilters } from './models/AgreementKindergartenFilters';

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
export const agreementTypeFilterVar = makeVar<AgreementTypeFilter>(AgreementTypeFilters.SHOW_ALL);
export const agreementStatusFilterVar = makeVar<AgreementStatusFilter>(AgreementStatusFilters.SHOW_ALL);
export const agreementKindergartenFilterVar = makeVar<AgreementKindergartenFilter[]>([
    AgreementKindergartenFilters.SHOW_ALL,
]);

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                activePage: {
                    read() {
                        return activePage();
                    },
                },
                agreementsTypeFilter: {
                    read() {
                        return agreementTypeFilterVar();
                    },
                },
                agreementsStatusFilter: {
                    read() {
                        return agreementStatusFilterVar();
                    },
                },
                agreementsKindergartenFilter: {
                    read() {
                        return agreementKindergartenFilterVar();
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
