import { gql, useMutation } from '@apollo/client';
import { Me } from '../../../graphql/types';
import { useGetMe } from './useGetMe';

export interface LoginInput {
    mail: string;
    password: string;
}

const AUTHORIZE_USER = gql`
    mutation login($user: LoginInput!) {
        login(user: $user) {
            token
        }
    }
`;

export function useAuthorizeMe(onAuthorized: (user: Me) => void, onError: (error: Error) => void) {
    const [authorizeUser] = useMutation(AUTHORIZE_USER);
    const { refetch } = useGetMe();

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
            }).catch(error => onError(error));
        },
    };
}
