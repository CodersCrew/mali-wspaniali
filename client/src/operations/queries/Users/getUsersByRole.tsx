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

export const INSTRUCTORS = gql`
    query Users {
        users(role: "instructor") {
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
    query Users {
        users(role: "admin") {
            _id
            createdAt
            mail
            role
        }
    }
`;

export const PARENTS = gql`
    query Users {
        users(role: "parent") {
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

export function useInstructors(): UseInstructorsReturnType {
    const { data, loading } = useQuery<UsersListReponse>(INSTRUCTORS);

    return {
        instructors: data?.users || [],
        isInstructorsListLoading: loading,
    };
}

export function useAdmins(): UseAdminsReturnType {
    const { data, loading } = useQuery<UsersListReponse>(ADMINS);

    return {
        admins: data?.users || [],
        isAdminsListLoading: loading,
    };
}

export function useParents(): UseParentsReturnType {
    const { data, loading } = useQuery<ParentsListResponse>(PARENTS);

    return {
        parents: data?.users || [],
        isParentsListLoading: loading,
    };
}

export function useUsers(role: string): UseUsersReturnType {
    const { data, loading, refetch } = useQuery<ParentsListResponse>(role === 'parent' ? PARENTS : INSTRUCTORS);

    return {
        users: data?.users.map(normalizeUser) || [],
        isUserListLoading: loading,
        refetch,
    };
}

function normalizeUser(user: User) {
    return { ...user, children: user.children || [] };
}
