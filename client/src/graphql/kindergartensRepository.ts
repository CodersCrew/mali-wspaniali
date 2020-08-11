import { gql, ApolloQueryResult } from '@apollo/client';

import { client } from '../apollo_client';
import { Kindergarten } from './types';

export function getKindergartens(): Promise<ApolloQueryResult<{ kindergartens: Kindergarten[] }>> {
    return client.query({
        query: gql`
            {
                kindergartens {
                    _id
                    name
                    number
                }
            }
        `,
    });
}
