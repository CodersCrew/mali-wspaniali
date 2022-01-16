import { gql, useMutation } from '@apollo/client';
import { NewsletterInput } from '@app/graphql/types';

export interface CreateNewsletterResponse {
    createNewsletter: { status: boolean };
}

export const CREATE_NEWSLETTER = gql`
    mutation createNewsletter($newsletter: NewsletterInput!) {
        createNewsletter(newsletter: $newsletter) {
            status
        }
    }
`;

export function useCreateNewsletter() {
    const [createNewsletter, { data, loading, called }] = useMutation<CreateNewsletterResponse>(CREATE_NEWSLETTER);

    const handleCreateNewsletter = async (newsletter: NewsletterInput) => {
        await createNewsletter({ variables: { newsletter } });
    };

    return { createNewsletter: handleCreateNewsletter, result: data, createNewsletterPending: loading || called };
}
