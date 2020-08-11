import { gql, ApolloQueryResult } from '@apollo/client';

import { client } from '../apollo_client';
import { Aggrement } from './types';

export function getAggrements(): Promise<ApolloQueryResult<{ aggrements: Aggrement[] }>> {
    return client.query({
        query: gql`
            {
                aggrements {
                    _id
                    date
                    text
                }
            }
        `,
    });
}
