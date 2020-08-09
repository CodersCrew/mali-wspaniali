import { gql, FetchResult, ApolloQueryResult } from '@apollo/client';

import { client } from '../apollo_client';
import { ReturnedStatus, UserInput, Me, User, ReturnedToken } from './types';

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

export function getUser(): Promise<ApolloQueryResult<{ me: Me }>> {
    return client.query({
        query: gql`
            {
                me {
                    date
                    mail
                    children {
                        _id
                        firstname
                        lastname
                        sex
                        birthYear
                        results {
                            _id
                            date
                            test
                            rootResultId
                        }
                        kindergarten {
                            _id
                            name
                            number
                        }
                    }
                    aggrements {
                        _id
                        date
                        text
                        isSigned
                    }
                    role
                    notifications {
                        _id
                        date
                        values
                        templateId
                        isRead
                    }
                }
            }
        `,
    });
}

export function getUserById(id: string): Promise<ApolloQueryResult<{ user: User }>> {
    return client.query({
        query: gql`
            {
                user(id: $id) {
                    date
                    mail
                    children {
                        _id
                        firstname
                        lastname
                        sex
                        birthYear
                        results {
                            _id
                            date
                            test
                            rootResultId
                        }
                        kindergarten {
                            _id
                            name
                            number
                        }
                    }
                    aggrements {
                        _id
                        date
                        text
                        isSigned
                    }
                    role
                }
            }
        `,
        variables: { id },
    });
}

export function getAllUsers(): Promise<ApolloQueryResult<{ users: User[] }>> {
    return client.query({
        query: gql`
            {
                users {
                    _id
                    date
                    mail
                    children {
                        _id
                        firstname
                        lastname
                        sex
                        birthYear
                        results {
                            _id
                            date
                            test
                            rootResultId
                        }
                        kindergarten {
                            _id
                            name
                            number
                        }
                    }
                    aggrements {
                        _id
                        date
                        text
                        isSigned
                    }
                    role
                }
            }
        `,
    });
}
