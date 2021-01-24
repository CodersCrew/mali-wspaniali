import { gql, useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import { openSnackbar } from '../../../components/Snackbar/openSnackbar';

export const DELETE_KINDERGARTEN = gql`
    mutation deleteKindergarten($id: String!) {
        deleteKindergarten(id: $id) {
            status
        }
    }
`;

export const useDeleteKindergarten = () => {
    const { t } = useTranslation();

    const [deleteKindergarten, { data }] = useMutation<{ id: string }>(DELETE_KINDERGARTEN);

    const handleDeleteKindergarten = async (id: string) => {
        try {
            await deleteKindergarten({
                variables: { id },
                update: (cache) => {
                    cache.modify({
                        fields: {
                            kindergartens(existingKindergartenRefs: { __ref: string }[], { readField }) {
                                return existingKindergartenRefs.filter(
                                    (kindergartenRef) => id !== readField('_id', kindergartenRef),
                                );
                            },
                        },
                    });
                },
            });
            openSnackbar({ text: t('test-results.delete-kindergarten-success') });
        } catch (error) {
            openSnackbar({ text: t('test-results.delete-kindergarten-fail'), severity: 'error' });
        }
    };

    return { deleteKindergarten: handleDeleteKindergarten, deleted: data };
};
