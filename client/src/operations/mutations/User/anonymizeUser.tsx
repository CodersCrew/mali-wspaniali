import { gql, useMutation } from '@apollo/client';

const RESET_PASSWORD = gql`
    mutation AnonymizeUser($id: String!) {
        anonymizeUser(id: $id) {
            status
        }
    }
`;

export function useAnonymizeUser() {
    const [anonymize] = useMutation(RESET_PASSWORD);

    return {
        anonymizeUser: (id: string) => {
            anonymize({
                variables: {
                    id,
                },
            });
        },
    };
}
