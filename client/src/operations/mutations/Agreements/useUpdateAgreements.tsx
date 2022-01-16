import { gql, useMutation } from '@apollo/client';

import { Agreement } from '@app/graphql/types';

const AGREEMENTS_MUTATION = gql`
    mutation signAgreement($agreementId: String!) {
        signAgreement(agreementId: $agreementId) {
            _id
            createdAt
            text
            isSigned
        }
    }
`;

interface Props {
    agreementId: string;
}

export function useUpdateAgreements() {
    const [mutate, { error }] = useMutation<Agreement>(AGREEMENTS_MUTATION);

    return {
        updateAgreements: ({ agreementId }: Props) => {
            mutate({
                variables: {
                    agreementId,
                },
            });
        },
        error,
    };
}
