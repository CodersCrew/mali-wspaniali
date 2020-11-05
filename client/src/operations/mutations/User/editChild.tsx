import { gql, useMutation } from '@apollo/client';
import { UpdatedChildInput } from '../../../graphql/types';

export interface EditChildResponse {
    status: boolean;
}

const EDIT_CHILD = gql`
    mutation editChild($child: UpdatedChildInput!) {
        editChild(child: $child) {
            status
        }
    }
`;

export function useEditChild() {
    const [editChild] = useMutation<EditChildResponse, { child: UpdatedChildInput }>(EDIT_CHILD);

    return {
        editChild: (update: UpdatedChildInput) => {
            editChild({
                variables: {
                    child: update,
                },
            });
        },
    };
}
