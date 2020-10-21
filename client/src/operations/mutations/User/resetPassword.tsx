import { gql, useMutation } from '@apollo/client';

const RESET_PASSWORD = gql`
    mutation ResetPassword($mail: String!) {
        resetPassword(mail: $mail) {
            status
        }
    }
`;

export function useResetPassword(onSuccess: () => void, onError: (error: Error) => void) {
    const [resetPassword] = useMutation(RESET_PASSWORD);

    return {
        resetPassword: (mail: string) => {
            resetPassword({
                variables: {
                    mail,
                },
            })
                .then(onSuccess)
                .catch(onError);
        },
    };
}
