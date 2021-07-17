/*
import {gql, useMutation} from '@apollo/client';
import {Me} from "../../../graphql/types";
import {useGetMe} from "./useGetMe";
*/

/*
interface UpdateUserReturn {
    firstname: string | undefined;
    lastname: string | undefined;
}
*/

/*
export const UPDATE_USER = gql`
mutation updateUser($updateUser: {firstname: string, lastname: string}!) {
    updateUser(updateUser: $updateUser) {
        firstname
        lastname
    }
}
`;
*/

export const useUpdateUser = () => {
    /*
    const [mutate, {error}] = useMutation<{updateUser: Me}>(UPDATE_USER)
    const {refetch} = useGetMe()

    return {
        updateUser: (props: {firstname: string, lastname: string}) => {
            mutate({
updateUser:
            }).then(() => {
                refetch()
            })
        },
        error
    }
*/
};
