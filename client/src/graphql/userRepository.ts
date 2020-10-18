import { gql, FetchResult, ApolloQueryResult } from '@apollo/client';

import { client } from '../apollo_client';
import { ReturnedStatus, UserInput, Me, User, Child } from './types';

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

export const ADD_CHILD = gql`
    mutation addChild($child: ChildInput!) {
        addChild(child: $child) {
            status
        }
    }
`;

export const GET_ME = gql`
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
            agreements {
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
`;

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
                    agreements {
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
                user(id: "${id}") {
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
                    agreements {
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

export function getAllUsers(role?: string): Promise<ApolloQueryResult<{ users: User[] }>> {
    if (role) {
        return client.query({
            query: gql`
                {
                    users(role: "${role}") {
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
                        agreements {
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
                    agreements {
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
            }
        `,
    });
}
