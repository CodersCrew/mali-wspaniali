import { useMutation } from '@apollo/client';
import { DELETE_KINDERGARTEN } from '../../../graphql/kindergartensRepository';

export const useDeleteKindergarten = () => {
    const [deleteKindergarten, { data }] = useMutation<{ id: string }>(DELETE_KINDERGARTEN);

    return { deleteKindergarten, deleted: data };
};
