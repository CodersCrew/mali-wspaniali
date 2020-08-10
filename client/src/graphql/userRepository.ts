import { gql, FetchResult } from 'apollo-boost';

import { client } from '../apollo_client';
import { ReturnedStatus, UserInput, ReturnedToken } from './types';

export interface LoginInput {
    mail: string;
    password: string;
}

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

export function loginUser(user: LoginInput): Promise<FetchResult<ReturnedToken>> {
    return client.mutate({
        mutation: gql`
            mutation login($user: LoginInput!) {
                login(user: $user) {
                    token
                }
            }
        `,
        variables: { user },
    });
}
