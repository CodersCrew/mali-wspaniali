import { gql } from '@apollo/client';

import { client } from '../apollo_client';
import { Kindergarten, GraphQLResponse } from './types';

export function getKindergartens(): GraphQLResponse<{
    kindergartens: Kindergarten[];
}> {
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
