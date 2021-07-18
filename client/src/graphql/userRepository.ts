import { gql, FetchResult, ApolloQueryResult } from '@apollo/client';

import { client } from '../apollo_client';
import { ReturnedStatus, UserInput, User, Child } from './types';

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

export function getUserById(id: string): Promise<ApolloQueryResult<{ user: User }>> {
    return client.query({
        query: gql`
            {
                user(id: "${id}") {
                    createdAt
                    mail
                    children {
                        _id
                        firstname
                        lastname
                        sex
                        birthYear
                        birthQuarter
                        results {
                            _id
                            createdAt
                            modifiedAt
                            childId
                            kindergartenId
                            assessmentId
                            assessment {
                                _id
                                title
                            }
                        }
                        kindergarten {
                            _id
                            name
                            number
                        }
                    }
                    agreements {
                        _id
                        createdAt
                        text
                        isSigned
                    }
                    role
                }
            }
        `,
    });
}

export function getAllUsers(role?: string): Promise<ApolloQueryResult<{ users: User[] }>> {
    if (role) {
        return client.query({
            query: gql`
                {
                    users(role: "${role}") {
                        _id
                        createdAt
                        mail
                        children {
                            _id
                            firstname
                            lastname
                            sex
                            birthYear
                            birthQuarter
                            results {
                                _id
                                createdAt
                                modifiedAt
                                childId
                                kindergartenId
                                assessmentId
                                assessment {
                                    _id
                                    title
                                }
                            }
                            kindergarten {
                                _id
                                name
                                number
                            }
                        }
                        agreements {
                            _id
                            createdAt
                            text
                            isSigned
                        }
                        role
                    }
                }
            `,
        });
    }

    return client.query({
        query: gql`
            {
                users {
                    _id
                    createdAt
                    mail
                    children {
                        _id
                        firstname
                        lastname
                        sex
                        birthYear
                        birthQuarter
                        results {
                            _id
                            createdAt
                            modifiedAt
                            childId
                            kindergartenId
                            assessmentId
                            assessment {
                                _id
                                title
                            }
                        }
                        kindergarten {
                            _id
                            name
                            number
                        }
                    }
                    agreements {
                        _id
                        createdAt
                        text
                        isSigned
                    }
                    role
                }
            }
        `,
    });
}

export function getAllChildren(): Promise<ApolloQueryResult<{ allChildren: Child[] }>> {
    return client.query({
        query: gql`
            {
                allChildren {
                    _id
                    firstname
                    lastname
                    sex
                    birthYear
                    birthQuarter
                    results {
                        _id
                        createdAt
                        modifiedAt
                        childId
                        kindergartenId
                        assessmentId
                        assessment {
                            _id
                            title
                        }
                    }
                    kindergarten {
                        _id
                        name
                        number
                    }
                }
            }
        `,
    });
}
