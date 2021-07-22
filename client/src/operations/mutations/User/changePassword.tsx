import { gql, useMutation } from '@apollo/client';

const CHANGE_PASSWORD = gql`
    mutation ChangePassword($password: String!, $jwt: String!) {
        changePassword(password: $password, jwt: $jwt) {
            status
        }
    }
`;

export function useChangePassword(onSuccess: () => void, onError: (error: Error) => void) {
    const [changePassword] = useMutation(CHANGE_PASSWORD);

    return {
        changePassword: (password: string, jwt: string) => {
            changePassword({
                variables: {
                    password,
                    jwt,
                },
            })
                .then(onSuccess)
                .catch(onError);
        },
    };
}
