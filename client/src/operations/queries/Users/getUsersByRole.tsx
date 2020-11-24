import { gql, useQuery } from '@apollo/client';
import { PrivilegedUser } from '../../../graphql/types';

interface UsersListReponse {
    users: PrivilegedUser[];
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

export function useInstructors() {
    const { data, loading } = useQuery<UsersListReponse>(INSTRUCTORS);

    return {
        instructors: data?.users || [],
        isInstructorsListLoading: loading,
    };
}

export function useAdmins() {
    const { data, loading } = useQuery<UsersListReponse>(ADMINS);

    return {
        admins: data?.users || [],
        isAdminsListLoading: loading,
    };
}
