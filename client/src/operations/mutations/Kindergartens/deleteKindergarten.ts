import { gql, useMutation } from '@apollo/client';

export const DELETE_KINDERGARTEN = gql`
    mutation deleteKindergarten($id: String!) {
        deleteKindergarten(id: $id) {
            status
        }
    }
`;

export const useDeleteKindergarten = () => {
    const [deleteKindergarten, { data }] = useMutation<{ id: string }>(DELETE_KINDERGARTEN);

    return { deleteKindergarten, deleted: data };
};
