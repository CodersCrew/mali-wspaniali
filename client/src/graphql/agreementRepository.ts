import { gql, ApolloQueryResult } from '@apollo/client';

import { client } from '../apollo_client';

import { Agreement } from './types';

export function getAgreements(): Promise<ApolloQueryResult<{ agreements: Agreement[] }>> {
    return client.query({
        query: gql`
            {
                agreements {
                    _id
                    date
                    text
                }
            }
        `,
    });
}
