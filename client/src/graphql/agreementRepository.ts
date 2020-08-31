import { gql } from '@apollo/client';

import { client } from '../apollo_client';
import { Agreement, GraphQLResponse } from './types';

export function getAgreements(): GraphQLResponse<{ agreements: Agreement[] }> {
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
