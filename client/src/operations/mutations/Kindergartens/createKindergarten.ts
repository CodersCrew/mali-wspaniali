import { gql, useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { AddKindergartenInput } from '../../../graphql/types';
import { openSnackbar } from '../../../components/Snackbar/openSnackbar';

export const CREATE_KINDERGARTEN = gql`
    mutation createKindergarten($kindergarten: KindergartenInput!) {
        createKindergarten(kindergarten: $kindergarten) {
            name
        }
    }
`;

export const useCreateKindergarten = () => {
    const { t } = useTranslation();

    const [createKindergarten, { data }] = useMutation<AddKindergartenInput>(CREATE_KINDERGARTEN, {
        update(cache, { data: newKindergarten }) {
            cache.modify({
                fields: {
                    kindergartens(existingKindergartens = []) {
                        return [...existingKindergartens, { ...newKindergarten, __typename: 'KindergartenDTO' }];
                    },
                },
            });
        },
    });

    const handleCreateKindergarten = async (kindergarten: AddKindergartenInput) => {
        try {
            await createKindergarten({ variables: { kindergarten } });
            openSnackbar({ text: t('test-results.add-kindergarten-success') });
        } catch (error) {
            openSnackbar({ text: error.message, severity: 'error' });
        }
    };

    return { createKindergarten: handleCreateKindergarten, created: data };
};
