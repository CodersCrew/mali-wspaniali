import { gql, useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { AddKindergartenInput } from '../../../graphql/kindergartensRepository';
import { openSnackbar } from '../../../components/Snackbar/openSnackbar';

export const UPDATE_KINDERGARTEN = gql`
    mutation updateKindergarten($id: String!, $kindergarten: EditKindergartenInput!) {
        updateKindergarten(id: $id, kindergarten: $kindergarten) {
            _id
            name
            number
            address
            city
        }
    }
`;

export const useUpdateKindergarten = () => {
    const { t } = useTranslation();

    const [updateKindergarten, { data }] = useMutation<AddKindergartenInput>(UPDATE_KINDERGARTEN);

    const handleUpdateKindergarten = async (id: string, kindergarten: AddKindergartenInput) => {
        try {
            await updateKindergarten({
                variables: {
                    id,
                    kindergarten,
                },
            });
            openSnackbar({ text: t('test-results.update-kindergarten-success') });
        } catch (error) {
            openSnackbar({ text: error.message, severity: 'error' });
        }
    };

    return { updateKindergarten: handleUpdateKindergarten, updated: data };
};
