import { gql, FetchResult } from 'apollo-boost';

import { client } from '../apollo_client';
import { ReturnedStatus, UserInput } from './types';
import { LoginInput } from '../commands/userCommand';

export function createUser(user: UserInput): Promise<FetchResult<ReturnedStatus>> {
    return client.mutate({
        mutation: gql`
            mutation createUser($user: UserInput!) {
                createUser(user: $user) {
                    status
                }
            }
        `,
        variables: { user },
    });
}

export function loginUser(user: LoginInput): Promise<FetchResult<ReturnedStatus>> {
    return client.mutate({
        mutation: gql`
            mutation login($user: LoginInput!) {
                login(user: $user) {
                    status
                }
            }
        `,
        variables: { user },
    });
}
