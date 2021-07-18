import { gql, useMutation } from '@apollo/client';
import { UpdatedUserInput } from '../../../graphql/types';
import { useGetMe } from './useGetMe';

/*
interface UpdateUserReturn {
    firstname: string | undefined;
    lastname: string | undefined;
}
*/

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
    const { user, refetch } = useGetMe();

    return {
        updateUser: (props: UpdatedUserInput) => {
            mutate({
                variables: {
                    me: {
                        ...user,
                        ...props,
                    },
                },
            }).then(() => {
                refetch();
            });
        },
        error,
    };
};
