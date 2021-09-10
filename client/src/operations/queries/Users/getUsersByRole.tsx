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
    refetchUser: () => void;
}

interface PaginatedUserOptions {
    role: string;
    page?: string;
    search?: string;
}

const INSTRUCTORS = gql`
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

const ADMINS = gql`
    query Users($options: UserPagination!) {
        users(options: $options) {
            _id
            createdAt
            mail
            role
        }
    }
`;

const PARENTS = gql`
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
                kindergarten {
                    _id
                    createdAt
                    number
                    name
                    city
                    address
                }
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
        refetchUser: refetch,
    };
}

function normalizeUser(user: User) {
    return { ...user, children: user.children || [] };
}
