import { gql, useMutation, useQuery } from '@apollo/client';
import { GET_ME } from '../../../graphql/userRepository';
import { Me } from '../../../graphql/types';

export interface LoginInput {
    mail: string;
    password: string;
}

export const AUTHORIZE_USER = gql`
    mutation login($user: LoginInput!) {
        login(user: $user) {
            token
        }
    }
`;

export function useAuthorizeMe(onAuthorized: (user: Me) => void, onError: (error: Error) => void) {
    const [authorizeUser] = useMutation(AUTHORIZE_USER);
    const { refetch } = useQuery(GET_ME);

    return {
        authorizeMe: (email: string, password: string) => {
            authorizeUser({
                variables: { user: { mail: email, password } },
                update: (cache, { data: { login } }) => {
                    localStorage.setItem('token', login.token);

                    refetch()
                        .then(({ data }) => {
                            if (data) {
                                onAuthorized(data.me);
                            }
                        })
                        .catch(error => onError(error));
                },
            });
        },
    };
}
