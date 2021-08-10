import { gql, useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { openSnackbar } from '../../../components/Snackbar/openSnackbar';

import { UpdatedUserInput } from '../../../graphql/types';
import { useGetMe } from './useGetMe';

export const UPDATE_USER = gql`
    mutation updateUser($updatedUser: UpdatedUserInput!) {
        updateUser(updatedUser: $updatedUser) {
            firstname
            lastname
        }
    }
`;

export const useUpdateUser = () => {
    const [mutate, { error }] = useMutation<{ updateUser: UpdatedUserInput }>(UPDATE_USER);
    const { refetch } = useGetMe();
    const { t } = useTranslation();

    return {
        updateUser: (props: UpdatedUserInput) => {
            mutate({
                variables: {
                    updatedUser: props,
                },
            })
                .then(refetch)
                .then(() => {
                    openSnackbar({ text: t('general.updated-profile') });
                });
        },
        error,
    };
};
