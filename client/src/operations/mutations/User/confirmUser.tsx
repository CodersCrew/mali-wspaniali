import { gql, useMutation } from '@apollo/client';

const RESET_PASSWORD = gql`
    mutation ConfirmUser($jwt: String!) {
        confirmUser(jwt: $jwt) {
            status
        }
    }
`;

export function useConfirmUser(onSuccess: () => void, onError: (error: Error) => void) {
    const [confirmUser] = useMutation(RESET_PASSWORD);

    return {
        confirmUser: (jwt: string) => {
            confirmUser({
                variables: {
                    jwt,
                },
            })
                .then(onSuccess)
                .catch(onError);
        },
    };
}
