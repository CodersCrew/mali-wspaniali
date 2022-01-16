import { gql, useMutation } from '@apollo/client';

import { ReturnedStatus } from '@app/graphql/types';

export interface ReadNotificationResponse {
    readNotification: ReturnedStatus;
}

export const READ_NOTIFICATION = gql`
    mutation ReadNotification($id: String!) {
        readNotification(id: $id) {
            _id
            createdAt
            values
            templateId
            isRead
        }
    }
`;

export function useReadNotification() {
    const [mutate] = useMutation<ReadNotificationResponse>(READ_NOTIFICATION);

    return {
        readNotification: (id: string) => {
            mutate({
                variables: {
                    id,
                },
            });
        },
    };
}
