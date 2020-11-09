import { gql, useQuery } from '@apollo/client';
import { User, Role } from '../../../graphql/types';

interface UsersListReponse {
    users: User[];
}

export const USERS_BY_ROLE = gql`
    query Users($role: String!) {
        users(role: $role) {
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
`;

export function useUsersByRole(role: Role) {
    const { data, loading } = useQuery<UsersListReponse>(USERS_BY_ROLE, { variables: { role } });

    return {
        usersList: data?.users || [],
        isUsersListLoading: loading,
    };
}
