import { gql, FetchResult } from 'apollo-boost';

import { client } from '../apollo_client';
import { ReturnedStatus, UserInput } from './types';

export function createUser(user: UserInput): Promise<FetchResult<ReturnedStatus>> {
    return client.mutate({
        mutation: gql`
            mutation createUser($user: UserInput!) {
                createUser(user: $user) {
                    status
                }
            }
    `,
        variables: {user},
    });
}
