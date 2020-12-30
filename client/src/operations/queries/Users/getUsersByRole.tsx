import { gql, useQuery } from '@apollo/client';
import { PrivilegedUser } from '../../../graphql/types';

interface UsersListReponse {
    users: PrivilegedUser[];
}

interface UseInstructorsReturnType {
    instructors: PrivilegedUser[];
    isInstructorsListLoading: boolean;
}

interface UseAdminsReturnType {
    admins: PrivilegedUser[];
    isAdminsListLoading: boolean;
}

export const INSTRUCTORS = gql`
    query Users {
        users(role: "instructor") {
            _id
            date
            mail
            role
        }
    }
`;

export const ADMINS = gql`
    query Users {
        users(role: "admin") {
            _id
            date
            mail
            role
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
