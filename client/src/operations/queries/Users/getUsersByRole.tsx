import { gql, useQuery } from '@apollo/client';
import { PrivilegedUser, User } from '../../../graphql/types';

interface UsersListReponse {
    users: PrivilegedUser[];
}
interface ParentsListResponse {
    users: User[];
}

interface UseInstructorsReturnType {
    instructors: PrivilegedUser[];
    isInstructorsListLoading: boolean;
}

interface UseAdminsReturnType {
    admins: PrivilegedUser[];
    isAdminsListLoading: boolean;
}

interface UseParentsReturnType {
    parents: User[];
    isParentsListLoading: boolean;
}

interface UseUsersReturnType {
    users: User[];
    isUserListLoading: boolean;
    refetch: () => void;
}

interface PaginatedUserOptions {
    role: string;
    page?: string;
    search?: string;
}

export const INSTRUCTORS = gql`
    query Users($options: UserPagination!) {
        users(options: $options) {
            _id
            createdAt
            mail
            firstname
            lastname
            role
        }
    }
`;

export const ADMINS = gql`
    query Users($options: UserPagination!) {
        users(options: $options) {
            _id
            createdAt
            mail
            role
        }
    }
`;

export const PARENTS = gql`
    query Users($options: UserPagination!) {
        users(options: $options) {
            _id
            createdAt
            mail
            role
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
                    createdAt
                    number
                    name
                    city
                    address
                }
            }
            agreements {
                _id
                createdAt
                text
                isSigned
            }
        }
    }
`;

export function useInstructors(options: PaginatedUserOptions = { role: 'instructor' }): UseInstructorsReturnType {
    const { data, loading } = useQuery<UsersListReponse>(INSTRUCTORS, { variables: { options } });

    return {
        instructors: data?.users || [],
        isInstructorsListLoading: loading,
    };
}

export function useAdmins(options: PaginatedUserOptions = { role: 'admin' }): UseAdminsReturnType {
    const { data, loading } = useQuery<UsersListReponse>(ADMINS, { variables: { options } });

    return {
        admins: data?.users || [],
        isAdminsListLoading: loading,
    };
}

export function useParents(options: PaginatedUserOptions = { role: 'parent' }): UseParentsReturnType {
    const { data, loading } = useQuery<ParentsListResponse>(PARENTS, { variables: { options } });

    return {
        parents: data?.users || [],
        isParentsListLoading: loading,
    };
}

export function useUsers(options: PaginatedUserOptions): UseUsersReturnType {
    const { data, loading, refetch } = useQuery<ParentsListResponse>(
        options.role === 'parent' ? PARENTS : INSTRUCTORS,
        {
            variables: { options },
        },
    );

    return {
        users: data?.users.map(normalizeUser) || [],
        isUserListLoading: loading,
        refetch,
    };
}

function normalizeUser(user: User) {
    return { ...user, children: user.children || [] };
}
